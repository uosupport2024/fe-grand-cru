import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BottomNav from '@/components/BottomNav'

export default function DestinationDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const defaultTrip = {
    title: 'Private Villa in Tuscany',
    location: 'Italy • Exclusive Retreat',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
    price: 'From €2,450'
  }

  const trip = location.state?.trip || defaultTrip

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans pb-16">
      <div className="flex-1 pb-10">
        {/* Banner image */}
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={trip.image || defaultTrip.image} 
            alt={trip.title} 
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/20 to-transparent"></div>
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
          >
            ← Back
          </button>
        </div>

        {/* Details */}
        <div className="p-6 space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest">{trip.location}</span>
            <h1 className="text-3xl font-serif text-brand-secondary-light font-bold leading-tight">{trip.title}</h1>
            <p className="text-xs text-neutral-surface/80">Experience custom tailored signature travel experiences curated for the refined traveler.</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-black/20 border border-brand-primary-surf/20">
              <span className="text-[10px] text-neutral-surface/60 block">Price</span>
              <span className="text-xs font-bold text-brand-secondary">{trip.price}</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/20 border border-brand-primary-surf/20">
              <span className="text-[10px] text-neutral-surface/60 block">Rating</span>
              <span className="text-xs font-bold text-brand-secondary">4.96 ★</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/20 border border-brand-primary-surf/20">
              <span className="text-[10px] text-neutral-surface/60 block">Status</span>
              <span className="text-xs font-bold text-brand-secondary">Available</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg text-brand-secondary-light">Exclusive Inclusions</h3>
            <ul className="text-xs text-neutral-bg/70 space-y-1.5 list-disc list-inside">
              <li>Premium lodging stays curated by local specialists</li>
              <li>Dedicated sommelier and tasting tour</li>
              <li>Daily gourmet chef breakfast</li>
              <li>24/7 VIP Concierge availability</li>
            </ul>
          </div>

          <Button 
            onClick={() => navigate('/inquiry', { state: { trip } })}
            variant="secondary"
            className="w-full py-3 text-sm font-semibold rounded-full bg-brand-secondary text-neutral-text-prim hover:bg-brand-secondary-dark transition-all mt-4"
          >
            Reserve Your Stay
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
