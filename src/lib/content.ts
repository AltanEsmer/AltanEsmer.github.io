import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
};

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
