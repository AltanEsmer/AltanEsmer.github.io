import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  /** Project category — drives the Work index filter. */
  category?: 'Web' | 'Mobile' | 'Desktop' | 'Tools' | string;
  /** Short role descriptor, e.g. "Solo project", "Bachelor project". */
  role?: string;
  /** Optional preview/cover image path (relative to public/), e.g. "/projects/foo.svg". */
  cover?: string;
  /** Optional minutes-to-read label for blog posts, e.g. "4 min read". */
  readingTime?: string;
};

/** Four-digit year derived from a frontmatter ISO date. */
export function getYear(date: string): string {
  return String(new Date(date).getFullYear());
}

export type ContentItem = {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
};

export function getAllContent(type: 'projects' | 'posts'): ContentItem[] {
  const dir = path.join(process.cwd(), 'content', type);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const items: ContentItem[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as Frontmatter,
      body: content,
    };
  });

  // Sort by date descending
  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export function getContentBySlug(
  type: 'projects' | 'posts',
  slug: string,
): ContentItem | null {
  const filePath = path.join(process.cwd(), 'content', type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as Frontmatter,
    body: content,
  };
}

export function getAllSlugs(type: 'projects' | 'posts'): string[] {
  const dir = path.join(process.cwd(), 'content', type);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getAdjacentContent(
  type: 'projects' | 'posts',
  slug: string,
): { prev: ContentItem | null; next: ContentItem | null } {
  const items = getAllContent(type); // already date-desc
  const idx = items.findIndex((x) => x.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // prev = older entry → comes after in date-desc array
  // next = newer entry → comes before in date-desc array
  const prev = idx < items.length - 1 ? items[idx + 1] : null;
  const next = idx > 0 ? items[idx - 1] : null;
  return { prev, next };
}
