import Link from 'next/link';
import Tag from './Tag';

export type ProjectCardData = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  role?: string;
  year?: string;
  tags?: string[];
};

type ProjectCardProps = {
  project: ProjectCardData;
  /** Projects index shows "year · role"; home shows just the year. */
  showRole?: boolean;
};

/** Quiet bordered project card used on the home grid and the Work index. */
export default function ProjectCard({ project, showRole = false }: ProjectCardProps) {
  const meta =
    showRole && project.role
      ? `${project.year ?? ''}${project.year ? ' · ' : ''}${project.role}`
      : project.year ?? '';

  return (
    <Link href={`/projects/${project.slug}`} className="proj-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {project.category ?? 'Project'}
        </span>
        {meta && (
          <span style={{ fontSize: 12.5, color: 'var(--faint)' }}>{meta}</span>
        )}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 1.2,
          margin: 0,
          color: 'var(--ink)',
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: 'var(--secondary)',
          margin: 0,
          flex: 1,
        }}
      >
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)' }}>
        Read case study →
      </span>
    </Link>
  );
}
