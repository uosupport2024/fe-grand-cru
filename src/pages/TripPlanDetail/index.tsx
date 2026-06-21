import { useLocation, useNavigate } from 'react-router-dom'
import { MapPoint, Calendar, Ticket } from '@solar-icons/react'

interface CustomTripPlan {
  id: string
  destination: string
  dateRange: string
  hotel: string
  image: string
  duration: string
  activities: string
}

export default function TripPlanDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const defaultPlan: CustomTripPlan = {
    id: 'default',
    destination: 'Kyoto Sanctuary & Gardens',
    dateRange: 'Nov 02 - Nov 12, 2026',
    hotel: 'Hoshinoya Luxury Ryokan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    duration: '10 Days',
    activities: 'Day 1: Outbound Flight CDG to DPS\nDay 2: Check-in Welcoming\nDay 10: In-villa checkout & Return Flight'
  }

  const plan: CustomTripPlan = location.state?.plan || defaultPlan

  // Split activities into lines for detailed timeline list
  const activityLines = plan.activities.split('\n').filter(line => line.trim().length > 0)

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg font-sans pb-8">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={plan.image} 
          alt={plan.destination} 
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/35 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          ← Back
        </button>
        <div className="absolute bottom-4 left-6 text-left">
          <h1 className="text-2xl font-serif text-brand-secondary-light font-bold leading-tight">{plan.destination}</h1>
        </div>
      </div>

      {/* Main detail parameters */}
      <div className="p-6 space-y-6 text-left max-w-md mx-auto">
        <div className="bg-gradient-to-br from-black/50 to-brand-primary-dark/80 backdrop-blur-md rounded-3xl p-5 text-neutral-bg border border-brand-secondary/20 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center pb-4 border-b border-brand-primary-surf/20">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-secondary font-semibold">Resort stay</span>
              <p className="text-sm font-serif font-bold text-neutral-bg mt-1 flex items-center gap-1.5">
                <MapPoint className="h-4 w-4 text-brand-secondary" /> {plan.hotel}
              </p>
            </div>
            <span className="text-[9px] bg-brand-secondary/20 text-brand-secondary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {plan.duration}
            </span>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs text-brand-secondary-light font-medium">
            <Calendar className="h-4 w-4 text-brand-secondary" />
            <span>Journey Dates: <strong>{plan.dateRange}</strong></span>
          </div>
        </div>

        {/* Timeline block */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-brand-primary-surf/15 pb-2">
            <h3 className="font-serif text-base text-brand-secondary-light font-bold">Chronological Schedule</h3>
            <span className="text-[9px] text-neutral-surface/60">Daily Curation Breakdown</span>
          </div>

          <div className="space-y-4 font-sans pl-1 border-l border-brand-secondary/30 ml-1.5 pt-1">
            {activityLines.map((act, index) => {
              // Parse 'Day X: Y' or generic string
              const parts = act.split(':')
              const dayTitle = parts[0] || `Step ${index + 1}`
              const dayContent = parts.slice(1).join(':').trim() || act

              // Check if returning/boarding flight text
              const isFlight = act.toLowerCase().includes('flight') || act.toLowerCase().includes('ticket')

              return (
                <div key={index} className="relative pl-4 space-y-1.5">
                  <div className="absolute left-[-6.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-secondary"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">{dayTitle}</span>
                    {isFlight && (
                      <span className="text-[8px] bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                        <Ticket className="h-3 w-3" /> Ticket
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-bg font-bold leading-relaxed">{dayContent}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
