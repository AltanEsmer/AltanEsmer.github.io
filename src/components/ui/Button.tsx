import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: 'md' | 'sm';
};

/**
 * Link styled as a button. Internal hrefs use next/link; external/mailto
 * use a plain anchor.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  className,
  size = 'md',
}: ButtonProps) {
  const classes = cn(
    'btn',
    size === 'sm' && 'btn-sm',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    className,
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
