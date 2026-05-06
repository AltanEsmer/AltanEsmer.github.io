import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ContentItem } from '@/lib/content';

type ProjectCardProps = Pick<ContentItem, 'slug' | 'frontmatter'>;

export default function ProjectCard({ slug, frontmatter }: ProjectCardProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'group block rounded-xl border border-neutral-200 bg-white p-6',
        'transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md',
        'dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600',
      )}
    >
      <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
        {frontmatter.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {frontmatter.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          {formattedDate}
        </span>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
