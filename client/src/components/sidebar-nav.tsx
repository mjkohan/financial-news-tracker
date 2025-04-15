'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Newspaper, BookMarked, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    title: "Latest News",
    href: "/latest-news",
    icon: Newspaper
  },
  {
    title: "Watchlist",
    href: "/watchlist",
    icon: BookMarked
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4 pt-20">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}