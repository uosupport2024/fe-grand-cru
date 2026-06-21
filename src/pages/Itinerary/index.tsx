import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Compass, MapPoint } from '@solar-icons/react'
import { cn } from '@/lib/utils'

interface ItineraryItem {
  id: string
  destination: string
  dateRange: string
  hotel: string
  image: string
  status: 'Active' | 'Upcoming' | 'Completed'
}

const ITINERARIES: ItineraryItem[] = [
  {
    id: 'itin-active-1',
    destination: 'AlUla Oasis Exploration',
    dateRange: 'Jun 18 - Jun 23, 2026',
    hotel: 'Habitas Luxury Eco-Resort',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=350&q=80',
    status: 'Active'
  },
  {
    id: 'itin-up-1',
    destination: 'Toscana Villa Retreat',
    dateRange: 'Oct 14 - Oct 20, 2026',
    hotel: 'Il Borgo Exclusive Estate',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=350&q=80',
    status: 'Upcoming'
  },
  {
    id: 'itin-up-2',
    destination: 'Kyoto Sanctuary Tour',
    dateRange: 'Nov 02 - Nov 08, 2026',
    hotel: 'Hoshinoya Luxury Ryokan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=350&q=80',
    status: 'Upcoming'
  },
  {
    id: 'itin-completed-1',
    destination: 'Santorini Sunset Escapade',
    dateRange: 'Sep 12 - Sep 18, 2025',
    hotel: 'Katikies Luxury Suites',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=350&q=80',
    status: 'Completed'
  },
  {
    id: 'itin-completed-2',
    destination: 'Amalfi Coast Retreat',
    dateRange: 'Jul 05 - Jul 12, 2025',
    hotel: 'Belmond Hotel Caruso',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=350&q=80',
    status: 'Completed'
  }
]

type TabType = 'Active' | 'Upcoming' | 'Completed'

export default function ItineraryPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('Upcoming')

  const filteredItineraries = ITINERARIES.filter(item => item.status === activeTab)

  const tabs: { label: string; value: TabType }[] = [
    { label: 'Current', value: 'Active' },
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'History', value: 'Completed' }
  ]

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans">
      <div className="flex-1 pt-8 px-6 space-y-6 overflow-y-auto">
        
        {/* Page Header */}
        <div className="space-y-1 text-left">
          <h2 className="font-serif text-3xl text-brand-secondary-light font-bold leading-tight font-bold">My Journeys</h2>
          <p className="text-xs text-neutral-surface/80">Track and manage your luxury journey timelines.</p>
        </div>

        {/* Tab Segment Selector */}
        <div className="p-1 rounded-full bg-black/40 border border-brand-primary-surf/20 flex w-full relative">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative flex-1 py-2 text-xs font-medium rounded-full cursor-pointer focus:outline-none transition-colors",
                activeTab === tab.value ? "text-neutral-text-prim font-semibold" : "text-neutral-surface/60 hover:text-neutral-bg"
              )}
            >
              {activeTab === tab.value && (
                <motion.div
                  layoutId="active-itinerary-tab"
                  className="absolute inset-0 bg-brand-secondary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Itinerary List */}
        <div className="space-y-4 text-left pb-6">
          <AnimatePresence mode="popLayout">
            {filteredItineraries.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                key={item.id}
                layout
                className="bg-black/40 border border-brand-primary-surf/25 rounded-3xl overflow-hidden cursor-pointer hover:border-brand-secondary/40 transition-colors"
                onClick={() => navigate('/booking', { state: { trip: { title: item.destination, location: item.hotel, image: item.image, price: 'Curated' } } })}
              >
                <div className="h-32 w-full relative">
                  <img src={item.image} alt={item.destination} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  <span className={cn(
                    "absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm",
                    item.status === 'Active' && "bg-green-600 text-white",
                    item.status === 'Upcoming' && "bg-brand-secondary text-neutral-text-prim",
                    item.status === 'Completed' && "bg-neutral-bg/25 text-neutral-bg border border-neutral-bg/30"
                  )}>
                    {item.status}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-serif text-base text-brand-secondary-light font-semibold">
                      {item.destination}
                    </h3>
                    <span className="text-[10px] text-neutral-surface/60 flex items-center gap-1.5 mt-1">
                      <MapPoint className="h-3.5 w-3.5 text-brand-secondary" />
                      {item.hotel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-brand-primary-surf/20 text-[10px] text-neutral-bg/70">
                    <Calendar className="h-4 w-4 text-brand-secondary/80" />
                    <span>{item.dateRange}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItineraries.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center space-y-3"
            >
              <Compass className="h-10 w-10 text-brand-secondary/40 mx-auto animate-pulse" />
              <p className="text-xs text-neutral-surface/60">No journeys in this category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
