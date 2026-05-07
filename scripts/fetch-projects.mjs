#!/usr/bin/env node
// scripts/fetch-projects.mjs
//
// Pulls non-fork, non-archived repos from github.com/AltanEsmer (user) and
// github.com/AlesSystems (org) via the `gh` CLI, applies a small filter,
// and writes the result to src/lib/projects.generated.json.
//
// Run manually before commit; the resulting JSON is committed so the
// GitHub Pages build stays offline-clean.
//
//   $ node scripts/fetch-projects.mjs
//
// Requirements: `gh auth login` (read scope is enough).

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '..', 'src', 'lib', 'projects.generated.json');

// Repos we never want to surface as "projects":
//   - profile readmes
//   - the portfolio site itself
//   - private docs / scaffolding
//   - throwaway demos
const EXCLUDE = new Set([
  'AltanEsmer/AltanEsmer',
  'AltanEsmer/AltanEsmer.github.io',
  'AlesSystems/.github',
  'AlesSystems/AlesDocs',
  'AlesSystems/demo-animation-repo',
]);

const FIELDS = [
  'name',
  'description',
  'primaryLanguage',
  'repositoryTopics',
  'stargazerCount',
  'url',
  'pushedAt',
  'createdAt',
  'isFork',
  'isArchived',
  'isPrivate',
  'homepageUrl',
].join(',');

function ghList(owner) {
  const out = execFileSync(
    'gh',
    [
      'repo',
      'list',
      owner,
      '--limit',
      '100',
      '--no-archived',
      '--source', // exclude forks
      '--json',
      FIELDS,
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
  );
  const repos = JSON.parse(out);
  return repos.map((r) => ({ ...r, owner }));
}

function normalize(r) {
  const fullName = `${r.owner}/${r.name}`;
  return {
    owner: r.owner,
    name: r.name,
    fullName,
    description: r.description ?? '',
    language: r.primaryLanguage?.name ?? null,
    topics: (r.repositoryTopics ?? []).map((t) => t.name),
    stars: r.stargazerCount ?? 0,
    url: r.url,
    homepageUrl: r.homepageUrl || null,
    pushedAt: r.pushedAt,
    createdAt: r.createdAt,
  };
}

const altan = ghList('AltanEsmer');
const ales = ghList('AlesSystems');

const all = [...altan, ...ales]
  .filter((r) => !r.isFork && !r.isArchived && !r.isPrivate)
  .filter((r) => !EXCLUDE.has(`${r.owner}/${r.name}`))
  .filter((r) => (r.description ?? '').trim() !== '') // skip empty repos
  .map(normalize)
  .sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return new Date(b.pushedAt).valueOf() - new Date(a.pushedAt).valueOf();
  });

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(
  OUTPUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sources: ['AltanEsmer', 'AlesSystems'],
      count: all.length,
      repos: all,
    },
    null,
    2,
  ) + '\n',
);

console.log(`✓ wrote ${all.length} repos → ${OUTPUT}`);
