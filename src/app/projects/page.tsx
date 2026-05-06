import MotionSection from '@/components/MotionSection';
import ProjectCard from '@/components/ProjectCard';
import { getAllContent } from '@/lib/content';

export const metadata = {
  title: 'Projects — Altan Esmer',
  description: 'A collection of projects I have built or contributed to.',
};

export default function ProjectsPage() {
  const projects = getAllContent('projects');

  return (
    <MotionSection>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Projects
      </h1>
      {projects.length > 0 ? (
        <div className="flex flex-col gap-4">
          {projects.map((item) => (
            <ProjectCard
              key={item.slug}
              slug={item.slug}
              frontmatter={item.frontmatter}
            />
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 dark:text-neutral-400">
          No projects yet. Check back soon.
        </p>
      )}
    </MotionSection>
  );
}
