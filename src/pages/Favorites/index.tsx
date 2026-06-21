import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Bookmark, MapPoint, Calendar } from '@solar-icons/react'
import { cn } from '@/lib/utils'

interface SavedDestination {
  id: string
  title: string
  location: string
  image: string
  price: string
}

interface CustomTripPlan {
  id: string
  destination: string
  dateRange: string
  hotel: string
  image: string
  duration: string
  activities: string
}

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [activeSubTab, setActiveSubTab] = useState<'destinations' | 'plans'>('destinations')
  const [savedDestinations, setSavedDestinations] = useState<SavedDestination[]>([])
  const [customPlans, setCustomPlans] = useState<CustomTripPlan[]>([])

  useEffect(() => {
    // Load saved destinations (init with default if empty)
    const saved = localStorage.getItem('grandcru_saved_destinations')
    if (saved) {
      setSavedDestinations(JSON.parse(saved))
    } else {
      const defaults: SavedDestination[] = [
        {
          id: 'dest-1',
          title: 'Private Villa in Toscana',
          location: 'Italy • Exclusive Retreat',
          image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
          price: '€2,450'
        },
        {
          id: 'dest-2',
          title: 'AlUla Oasis Exploration',
          location: 'Saudi Arabia • Luxury Tour',
          image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
          price: '€1,950'
        }
      ]
      localStorage.setItem('grandcru_saved_destinations', JSON.stringify(defaults))
      setSavedDestinations(defaults)
    }

    // Load custom trip plans
    const plans = localStorage.getItem('grandcru_custom_trips')
    if (plans) {
      setCustomPlans(JSON.parse(plans))
    } else {
      const defaults: CustomTripPlan[] = [
        {
          id: 'custom-1',
          destination: 'Kyoto Sanctuary & Gardens',
          dateRange: 'Nov 02 - Nov 12, 2026',
          hotel: 'Hoshinoya Luxury Ryokan',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
          duration: '10 Days',
          activities: 'Day 1: Arrival & Check-in\nDay 2-9: Tea ceremony, private garden tours, and zen meditation.\nDay 10: Checkout & flight back.'
        }
      ]
      localStorage.setItem('grandcru_custom_trips', JSON.stringify(defaults))
      setCustomPlans(defaults)
    }
  }, [])

  const removeDestination = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = savedDestinations.filter(d => d.id !== id)
    setSavedDestinations(updated)
    localStorage.setItem('grandcru_saved_destinations', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans pb-16">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-8 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif text-brand-secondary-light font-bold leading-tight">Favorites</h1>
            <p className="text-xs text-neutral-surface/60">Your handpicked destinations and bespoke plans.</p>
          </div>
          {activeSubTab === 'plans' && (
            <button
              onClick={() => navigate('/create-trip-plan')}
              className="h-9 w-9 rounded-full bg-brand-secondary text-brand-primary-dark flex items-center justify-center hover:bg-brand-secondary-dark transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {/* Sub-tab selectors */}
        <div className="flex border-b border-brand-primary-surf/20 gap-6">
          <button
            onClick={() => setActiveSubTab('destinations')}
            className={cn(
              "pb-2 text-xs font-semibold tracking-wider uppercase relative cursor-pointer",
              activeSubTab === 'destinations' ? "text-brand-secondary" : "text-neutral-surface/50"
            )}
          >
            Saved Destinations
            {activeSubTab === 'destinations' && (
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-secondary" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('plans')}
            className={cn(
              "pb-2 text-xs font-semibold tracking-wider uppercase relative cursor-pointer",
              activeSubTab === 'plans' ? "text-brand-secondary" : "text-neutral-surface/50"
            )}
          >
            My Custom Plans
            {activeSubTab === 'plans' && (
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-secondary" />
            )}
          </button>
        </div>

        {/* Content displays */}
        <div className="space-y-4">
          {activeSubTab === 'destinations' ? (
            <div className="grid grid-cols-1 gap-4">
              {savedDestinations.map(dest => (
                <div
                  key={dest.id}
                  onClick={() => navigate('/booking', { state: { trip: dest } })}
                  className="bg-black/30 border border-brand-primary-surf/20 rounded-2xl overflow-hidden flex cursor-pointer hover:border-brand-secondary/40 transition-colors"
                >
                  <div className="w-24 h-24 shrink-0 relative">
                    <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-serif text-sm font-bold text-neutral-bg leading-tight line-clamp-1">{dest.title}</h3>
                      <button
                        onClick={(e) => removeDestination(dest.id, e)}
                        className="text-brand-secondary hover:text-brand-secondary-dark shrink-0 cursor-pointer"
                      >
                        <Bookmark className="h-4 w-4 fill-brand-secondary" />
                      </button>
                    </div>
                    <span className="text-[10px] text-neutral-surface/60 flex items-center gap-1">
                      <MapPoint className="h-3.5 w-3.5 text-brand-secondary" />
                      {dest.location}
                    </span>
                    <span className="text-xs font-bold text-brand-secondary mt-1">{dest.price}</span>
                  </div>
                </div>
              ))}
              {savedDestinations.length === 0 && (
                <div className="py-12 text-center text-xs text-neutral-surface/40">
                  No saved destinations yet.
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {customPlans.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => navigate('/trip-plan-detail', { state: { plan } })}
                  className="bg-black/30 border border-brand-primary-surf/20 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-secondary/40 transition-colors text-left"
                >
                  <div className="h-28 w-full relative">
                    <img src={plan.image} alt={plan.destination} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-serif font-bold text-brand-secondary-light">{plan.destination}</span>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-neutral-surface/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-brand-secondary" /> {plan.dateRange}
                      </span>
                      <span className="font-semibold text-brand-secondary">{plan.duration}</span>
                    </div>
                    <span className="text-[10px] text-neutral-surface/50 block line-clamp-1">📍 Stay: {plan.hotel}</span>
                  </div>
                </div>
              ))}
              {customPlans.length === 0 && (
                <div className="py-12 text-center text-xs text-neutral-surface/40">
                  No custom journey plans yet. Click the + button to create one.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
