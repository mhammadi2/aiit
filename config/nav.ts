export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const navigationConfig: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Events",
        href: "/events",
      },
      {
        title: "Blog",
        href: "/posts",
      },
      {
        title: "AI Assistant",
        href: "/chat",
      },
      {
        title: "Donate",
        href: "/donate",
      },
    ],
  },
  {
    title: 'User',
    items: [
      {
        title: 'Profile',
        href: '/profile',
        requireAuth: true,
      },
      {
        title: 'My Donations',
        href: '/my-donations',
        requireAuth: true,
      },
      {
        title: 'My Events',
        href: '/my-events',
        requireAuth: true,
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Dashboard',
        href: '/admin',
        adminOnly: true,
      },
      {
        title: 'Manage Users',
        href: '/admin/users',
        adminOnly: true,
      },
      {
        title: 'Manage Donations',
        href: '/admin/donations',
        adminOnly: true,
      },
      {
        title: 'Manage Events',
        href: '/admin/events',
        adminOnly: true,
      },
      {
        title: 'Manage Posts',
        href: '/admin/posts',
        adminOnly: true,
      },
    ],
  },
]
