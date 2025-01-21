export type NavItem = {
  title: string
  href: string
  icon?: string
  requireAuth?: boolean
  adminOnly?: boolean
}

export type NavItemGroup = {
  title: string
  items: NavItem[]
}
