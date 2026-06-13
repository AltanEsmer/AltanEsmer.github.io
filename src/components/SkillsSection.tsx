import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML & CSS'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Python', 'C# / .NET', 'REST APIs', 'PostgreSQL'],
  },
  {
    group: 'Mobile & Cross-platform',
    items: ['Kotlin / KMP', 'Jetpack Compose', 'React Native', 'Swift (basics)'],
  },
  {
    group: 'DevOps & Tooling',
    items: ['Git', 'GitHub Actions', 'Docker', 'Vite', 'CI/CD'],
  },
];

export default function SkillsSection() {
  return (
    <section
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div className="wrap" style={{ padding: '56px 28px' }}>
        <Reveal>
          <Kicker>Capabilities</Kicker>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(26px, 3vw, 34px)',
              margin: '10px 0 0',
              color: 'var(--ink)',
            }}
          >
            Skills &amp; tools
          </h2>
        </Reveal>

        <Reveal
          style={{
            display: 'grid',
            gap: '32px 28px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            marginTop: 32,
          }}
        >
          {SKILLS.map(({ group, items }) => (
            <div key={group}>
              <h3
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  margin: '0 0 14px',
                  paddingBottom: 10,
                  borderBottom: '2px solid var(--divider)',
                }}
              >
                {group}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: 13.5,
                      color: 'var(--prose)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border-light)',
                      padding: '6px 12px',
                      borderRadius: 8,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
