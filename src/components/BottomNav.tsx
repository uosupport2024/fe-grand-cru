import { useLocation, useNavigate } from 'react-router-dom'
import { Smartphone, Map, Heart, User, Letter } from '@solar-icons/react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    {
      name: 'Home',
      path: '/home',
      icon: Smartphone,
    },
    {
      name: 'Journeys',
      path: '/itinerary',
      icon: Map,
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: Heart,
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: Letter,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 inset-x-0 h-16 bg-brand-primary-dark border-t border-brand-primary-surf/20 flex items-center justify-around px-2 z-20">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = location.pathname === tab.path

        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={cn(
              "flex flex-col items-center justify-center w-12 h-12 transition-all cursor-pointer",
              isActive ? "text-brand-secondary font-bold" : "text-neutral-surface/60 hover:text-brand-secondary/80"
            )}
          >
            <Icon className={cn("h-5 w-5 transition-transform duration-200", isActive && "scale-110")} />
            <span className="text-[9px] mt-0.5 tracking-wider">{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}
