'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { UserNav } from './user-nav'

export const Header: FC = () => {
  const { data: session } = useSession()

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href='/' className='text-2xl font-bold'>
          Islamic Center
        </Link>
        <nav className='space-x-6'>
          <Link href='/events'>Events</Link>
          <Link href='/posts'>Posts</Link>
          <Link href='/donate'>Donate</Link>
          {session ? (
            <UserNav user={session.user} />
          ) : (
            <Link href='/login' className='btn-primary'>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { Menu, X } from 'lucide-react'

// import { navigationConfig } from '@/config/nav'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false)
//   const pathname = usePathname()
//   const { data: session, status } = useSession()

//   const isAdmin = session?.user?.role === 'ADMIN'
//   const isAuthenticated = status === 'authenticated'

//   const mainNavItems = navigationConfig[0].items
//   const userNavItems = navigationConfig[1].items
//   const adminNavItems = navigationConfig[2].items

//   return (
//     <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
//       <div className='container flex h-14 items-center'>
//         <div className='mr-4 hidden md:flex'>
//           <Link href='/' className='mr-6 flex items-center space-x-2'>
//             <span className='hidden font-bold sm:inline-block'>Your Logo</span>
//           </Link>
//           <nav className='flex items-center space-x-6 text-sm font-medium'>
//             {mainNavItems.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.href}
//                 className={cn(
//                   'transition-colors hover:text-foreground/80',
//                   pathname === item.href
//                     ? 'text-foreground'
//                     : 'text-foreground/60'
//                 )}
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button
//               variant='ghost'
//               className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
//             >
//               <Menu className='h-6 w-6' />
//               <span className='sr-only'>Toggle Menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side='left' className='pr-0'>
//             <MobileNav
//               isAdmin={isAdmin}
//               isAuthenticated={isAuthenticated}
//               onNavClick={() => setIsOpen(false)}
//             />
//           </SheetContent>
//         </Sheet>

//         <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
//           <div className='w-full flex-1 md:w-auto md:flex-none'>
//             {/* Add search functionality if needed */}
//           </div>
//           <nav className='flex items-center'>
//             {isAuthenticated ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant='ghost'
//                     className='relative h-8 w-8 rounded-full'
//                   >
//                     <Avatar className='h-8 w-8'>
//                       <AvatarImage
//                         src={session.user.image || ''}
//                         alt={session.user.name || ''}
//                       />
//                       <AvatarFallback>
//                         {session.user.name?.[0]?.toUpperCase() || 'U'}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align='end'>
//                   <div className='flex items-center justify-start gap-2 p-2'>
//                     <div className='flex flex-col space-y-1 leading-none'>
//                       {session.user.name && (
//                         <p className='font-medium'>{session.user.name}</p>
//                       )}
//                       {session.user.email && (
//                         <p className='w-[200px] truncate text-sm text-muted-foreground'>
//                           {session.user.email}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <DropdownMenuSeparator />
//                   {userNavItems.map((item, index) => (
//                     <DropdownMenuItem key={index} asChild>
//                       <Link href={item.href}>{item.title}</Link>
//                     </DropdownMenuItem>
//                   ))}
//                   {isAdmin && (
//                     <>
//                       <DropdownMenuSeparator />
//                       {adminNavItems.map((item, index) => (
//                         <DropdownMenuItem key={index} asChild>
//                           <Link href={item.href}>{item.title}</Link>
//                         </DropdownMenuItem>
//                       ))}
//                     </>
//                   )}
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link href='/api/auth/signout'>Sign Out</Link>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link href='/api/auth/signin'>
//                 <Button variant='secondary'>Sign In</Button>
//               </Link>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }

// function MobileNav({
//   isAdmin,
//   isAuthenticated,
//   onNavClick,
// }: {
//   isAdmin: boolean
//   isAuthenticated: boolean
//   onNavClick: () => void
// }) {
//   const mainNavItems = navigationConfig[0].items
//   const userNavItems = navigationConfig[1].items
//   const adminNavItems = navigationConfig[2].items

//   return (
//     <div className='flex flex-col space-y-4 py-4'>
//       <Link
//         href='/'
//         className='flex items-center space-x-2'
//         onClick={onNavClick}
//       >
//         <span className='font-bold'>Your Logo</span>
//       </Link>
//       <div className='flex flex-col space-y-3'>
//         {mainNavItems.map((item, index) => (
//           <MobileNavLink key={index} href={item.href} onNavClick={onNavClick}>
//             {item.title}
//           </MobileNavLink>
//         ))}
//         {isAuthenticated && (
//           <>
//             <div className='my-2 h-px bg-border' />
//             {userNavItems.map((item, index) => (
//               <MobileNavLink
//                 key={index}
//                 href={item.href}
//                 onNavClick={onNavClick}
//               >
//                 {item.title}
//               </MobileNavLink>
//             ))}
//           </>
//         )}
//         {isAdmin && (
//           <>
//             <div className='my-2 h-px bg-border' />
//             {adminNavItems.map((item, index) => (
//               <MobileNavLink
//                 key={index}
//                 href={item.href}
//                 onNavClick={onNavClick}
//               >
//                 {item.title}
//               </MobileNavLink>
//             ))}
//           </>
//         )}
//         <div className='my-2 h-px bg-border' />
//         <MobileNavLink
//           href={isAuthenticated ? '/api/auth/signout' : '/api/auth/signin'}
//           onNavClick={onNavClick}
//         >
//           {isAuthenticated ? 'Sign Out' : 'Sign In'}
//         </MobileNavLink>
//       </div>
//     </div>
//   )
// }

// function MobileNavLink({
//   href,
//   onNavClick,
//   children,
// }: {
//   href: string
//   onNavClick: () => void
//   children: React.ReactNode
// }) {
//   const pathname = usePathname()
//   const isActive = pathname === href

//   return (
//     <Link
//       href={href}
//       className={cn(
//         'text-foreground/60 transition-colors hover:text-foreground',
//         isActive && 'text-foreground'
//       )}
//       onClick={onNavClick}
//     >
//       {children}
//     </Link>
//   )
// }
