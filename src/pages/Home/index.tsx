import { useNavigate } from 'react-router-dom'
import { Magnifier, Tuning } from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import brandLogo from '@/assets/logotipo_grandcrutravelers_transparente-01.webp'
import InterestByDestination from '@/features/destination/components/InterestByDestination'
import RecommendationDestination from '@/features/destination/components/RecommendationDestination'
import TravelPackages from '@/features/destination/components/TravelPackages'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans">
      <div className="flex-1 pt-8 px-6 overflow-y-auto space-y-6 pb-20">
        {/* App Header */}
        <div className="flex justify-between items-center">
          <img src={brandLogo} alt="GrandCru" className="h-6 w-auto object-contain" />
          <Button variant="ghost" size="sm" className="px-2 py-1 text-brand-secondary hover:bg-neutral-bg/10">
            <Tuning className="h-5 w-5" />
          </Button>
        </div>

        {/* Welcome block */}
        <div className="space-y-1 text-left">
          <h2 className="font-serif text-3xl text-brand-secondary-light font-bold leading-tight">Hello, Andrea</h2>
          <p className="text-xs text-neutral-surface/80">Where would you like to travel?</p>
        </div>

        {/* Smart Search Bar Container - Simple Read-Only Redirect */}
        <div 
          onClick={() => navigate('/search')}
          className="relative z-30 cursor-pointer"
        >
          <Input 
            readOnly
            placeholder="Search destinations, experiences..." 
            icon={<Magnifier className="h-4 w-4 text-brand-secondary" />}
            className="bg-black/35 border-brand-primary-surf/50 text-neutral-bg placeholder:text-neutral-bg/40 focus:ring-brand-secondary focus:border-brand-secondary cursor-pointer"
          />
        </div>

        {/* Interest By Destination Section */}
        <InterestByDestination />

        {/* Travel Packages Section */}
        <TravelPackages />

        {/* Recommendation Destination Section */}
        <RecommendationDestination />
      </div>
    </div>
  )
}
