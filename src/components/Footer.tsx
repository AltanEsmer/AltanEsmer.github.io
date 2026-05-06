const socialLinks = [
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <ul className="flex items-center gap-5">
          {socialLinks.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="underline-offset-4 hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p>© 2026 Altan Esmer · All rights reserved.</p>
      </div>
    </footer>
  );
}
