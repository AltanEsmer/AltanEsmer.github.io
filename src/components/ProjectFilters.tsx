'use client';

export type Filter = 'all' | 'fe' | 'be' | 'ds' | 'oss';

const FILTER_LABELS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'all' },
  { value: 'fe', label: 'frontend' },
  { value: 'be', label: 'backend' },
  { value: 'ds', label: 'design' },
  { value: 'oss', label: 'open-source' },
];

export default function ProjectFilters({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '6px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        flexWrap: 'wrap',
      }}
    >
      {FILTER_LABELS.map(({ value: fVal, label }) => {
        const isOn = value === fVal;
        return (
          <button
            key={fVal}
            onClick={() => onChange(fVal)}
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              border: `1px solid ${isOn ? 'rgba(236,72,153,.4)' : 'var(--line)'}`,
              background: isOn ? 'rgba(236,72,153,.15)' : 'rgba(255,255,255,.02)',
              color: isOn ? 'var(--text)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'all .2s',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!isOn) {
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--text)';
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(255,255,255,.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isOn) {
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--muted)';
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--line)';
              }
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
