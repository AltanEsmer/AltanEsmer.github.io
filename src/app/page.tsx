import Link from 'next/link';
import MotionSection from '@/components/MotionSection';
import ProjectCard from '@/components/ProjectCard';
import { getAllContent } from '@/lib/content';

export default function HomePage() {
  const featuredProjects = getAllContent('projects')
    .filter((item) => item.frontmatter.featured)
    .slice(0, 3);

  return (
    <>
      <MotionSection className="py-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          Altan Esmer
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Software engineer · I build performant, thoughtful web experiences.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            View projects
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
          >
            Read the blog
          </Link>
        </div>
      </MotionSection>

      {featuredProjects.length > 0 && (
        <MotionSection delay={0.1} className="pb-16">
          <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Featured projects
          </h2>
          <div className="flex flex-col gap-4">
            {featuredProjects.map((item) => (
              <ProjectCard
                key={item.slug}
                slug={item.slug}
                frontmatter={item.frontmatter}
              />
            ))}
          </div>
        </MotionSection>
      )}
    </>
  );
}
