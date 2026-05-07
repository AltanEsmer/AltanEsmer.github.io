import Link from 'next/link';
import MotionSection from '@/components/MotionSection';
import { getAllContent } from '@/lib/content';

export const metadata = {
  title: 'Blog — Altan Esmer',
  description: 'Writing on software engineering, web performance, and things I am building.',
};

export default function BlogPage() {
  const posts = getAllContent('posts');

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
    <MotionSection>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Blog
      </h1>
      {posts.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <h2 className="text-lg font-semibold text-neutral-900 underline-offset-4 group-hover:underline dark:text-neutral-100">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {post.frontmatter.description}
                </p>
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral-500 dark:text-neutral-400">
          No posts yet. Check back soon.
        </p>
      )}
    </MotionSection>
    </div>
  );
}
