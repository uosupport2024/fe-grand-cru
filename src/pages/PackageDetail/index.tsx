import { useLocation, useNavigate } from 'react-router-dom'
import { Calendar, Star } from '@solar-icons/react'
import { Button } from '@/components/ui/button'

interface PackageItem {
  id: string
  title: string
  duration: string
  inclusions: string
  price: string
  image: string
  description?: string
  highlights?: string[]
}

export default function PackageDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const defaultPackage: PackageItem = {
    id: 'default',
    title: 'Kyoto Sanctuary & Ryokan Experience',
    duration: '7 Days / 6 Nights',
    inclusions: 'Hoshinoya Stay • VIP Dining • Private Tea Ceremony',
    price: '€6,200',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    description: 'Immerse yourself in ancient traditions and modern luxury. This exclusive package features premium ryokan stays, private zen garden tours, guided historic walks, and traditional multi-course Kaiseki dinners curated by award-winning chefs.',
    highlights: [
      '6 Nights stay at Hoshinoya Luxury Ryokan',
      'Michelin-starred dining reservations included',
      'Private traditional Japanese tea ceremonies',
      'Dedicated personal interpreter and historian guide',
      'VIP private car transfers throughout the journey'
    ]
  }

  const pack: PackageItem = location.state?.package || defaultPackage

  // Parse inclusions list
  const inclusionBadges = (pack.inclusions || defaultPackage.inclusions)
    .split('•')
    .map(inc => inc.trim())

  const highlights = pack.highlights || defaultPackage.highlights || []
  const description = pack.description || defaultPackage.description

  const handleBookNow = () => {
    // Navigate to the inquiry page passing package details as the trip state
    navigate('/inquiry', {
      state: {
        trip: {
          title: pack.title,
          location: `${pack.duration} • Exclusive Package`,
          image: pack.image,
          price: pack.price
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg font-sans pb-8 text-left relative overflow-hidden">
      {/* Immersive Header Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={pack.image} 
          alt={pack.title} 
          className="absolute inset-0 object-cover w-full h-full filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/30 to-transparent" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          ← Back
        </button>
        
        <div className="absolute bottom-4 left-6 right-6 space-y-1">
          <span className="text-[9px] bg-brand-secondary/20 text-brand-secondary px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold">
            Signature Curation
          </span>
          <h1 className="text-2xl font-serif text-brand-secondary-light font-bold leading-tight pt-1">
            {pack.title}
          </h1>
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="p-6 space-y-6 max-w-md mx-auto relative z-10">
        
        {/* Core Parameters Card */}
        <div className="bg-gradient-to-br from-black/50 to-brand-primary-dark/80 backdrop-blur-md rounded-3xl p-5 text-neutral-bg border border-brand-secondary/20 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center pb-4 border-b border-brand-primary-surf/20">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-secondary font-semibold">Duration duration</span>
              <p className="text-sm font-serif font-bold text-neutral-bg mt-1 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-secondary" /> {pack.duration}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-widest text-neutral-surface/40">Exclusive Price</span>
              <p className="text-sm font-serif font-bold text-brand-secondary mt-1">{pack.price}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-2">
            {inclusionBadges.map((badge, idx) => (
              <span 
                key={idx} 
                className="text-[8px] bg-brand-primary-surf/35 border border-brand-primary-surf/15 px-2.5 py-1 rounded text-neutral-bg font-medium uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative / Overview */}
        <div className="space-y-2">
          <h3 className="font-serif text-base text-brand-secondary-light font-bold">Package Overview</h3>
          <p className="text-xs text-neutral-surface/80 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Package Highlights */}
        <div className="space-y-3">
          <h3 className="font-serif text-base text-brand-secondary-light font-bold">What's Included</h3>
          <div className="space-y-2.5">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-black/20 p-3 rounded-xl border border-brand-primary-surf/10">
                <div className="h-5 w-5 rounded-full bg-brand-secondary/15 flex items-center justify-center shrink-0 border border-brand-secondary/30 mt-0.5">
                  <Star className="h-3 w-3 text-brand-secondary" />
                </div>
                <p className="text-xs text-neutral-bg/95 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card Button */}
        <Button 
          onClick={handleBookNow}
          variant="secondary"
          className="w-full h-11 text-xs uppercase tracking-widest font-serif font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full shadow-lg shadow-brand-secondary/15 transition-all mt-4 flex items-center justify-center gap-2"
        >
          Inquire Package Reservation
        </Button>
      </div>
    </div>
  )
}
