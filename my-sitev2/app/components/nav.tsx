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
  'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2 m-1'

const socialLinkClassName =
  'transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2 m-1'

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-10 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full relative px-0 pb-0 fade md:relative"
          id="nav"
        >
          <div className="flex flex-row flex-wrap items-center">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link key={path} href={path} className={navLinkClassName}>
                {name}
              </Link>
            ))}
          </div>
          <div className="flex flex-row flex-wrap items-center sm:justify-end">
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
