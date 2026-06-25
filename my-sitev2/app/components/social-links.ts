type SocialLink = {
  href: string
  label: string
  navLabel?: string
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://linkedin.com/in/pattersongrant',
    label: 'linkedin',
  },
  {
    href: 'https://github.com/pattersongrant',
    label: 'github',
  },
  {
    href: 'mailto:grantpa@umich.edu',
    label: 'grantpa@umich.edu',
    navLabel: 'email',
  },
]
