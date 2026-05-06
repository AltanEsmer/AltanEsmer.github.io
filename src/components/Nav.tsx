import Link from 'next/link';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          Altan Esmer
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
