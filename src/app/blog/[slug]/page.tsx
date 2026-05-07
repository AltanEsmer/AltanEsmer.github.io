import { notFound } from 'next/navigation';
import { getAllSlugs, getContentBySlug } from '@/lib/content';

export function generateStaticParams() {
  return getAllSlugs('posts').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const item = getContentBySlug('posts', params.slug);
  if (!item) return {};
  return {
    title: `${item.frontmatter.title} — Altan Esmer`,
    description: item.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getContentBySlug('posts', params.slug);
  if (!item) notFound();

  const { default: MDXContent } = await import(
    `../../../../content/posts/${params.slug}.mdx`
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
    <article className="prose-mdx">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {item.frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {new Date(item.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      <MDXContent />
    </article>
    </div>
  );
}
