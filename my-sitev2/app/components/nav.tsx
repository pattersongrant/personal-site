import Link from 'next/link'
import { socialLinks } from './social-links'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/portfolio': {
    name: 'portfolio',
  },
}

const navLinkClassName =
  'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1.5 pr-1.5 sm:pr-4 last:pr-0'

const socialLinkClassName =
  'transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 py-1.5 whitespace-nowrap'

export function Navbar() {
  return (
    <aside className="mb-8 md:mb-10 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 sm:gap-x-4 w-full"
          id="nav"
        >
          <div className="flex flex-row items-center min-w-0">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link key={path} href={path} className={navLinkClassName}>
                {name}
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center gap-1.5 sm:gap-4">
            {socialLinks.map(({ href, label, navLabel }) => (
              <a
                key={href}
                href={href}
                className={socialLinkClassName}
                {...(href.startsWith('http') && {
                  rel: 'noopener noreferrer',
                  target: '_blank',
                })}
              >
                {navLabel ?? label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}
