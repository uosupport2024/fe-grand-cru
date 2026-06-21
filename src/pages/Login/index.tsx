import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import brandLogo from '@/assets/logotipo_grandcrutravelers_transparente-01.webp'
import LoginForm from '@/features/auth/components/LoginForm'

// Custom Logo component
const GrandCruLogo = ({ className = "h-8" }: { className?: string }) => (
  <img
    src={brandLogo}
    alt="Grand Cru Travelers"
    className={className}
  />
)

const RECOMMENDED_DESTINATIONS = [
  {
    id: 1,
    title: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'Kyoto Sanctuary',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    title: 'Cappadocia',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    title: 'St. Moritz',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80',
  }
]

export default function LoginPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-neutral-text-prim flex items-center justify-center sm:p-4 relative overflow-hidden font-sans selection:bg-brand-secondary/40">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-brand-secondary/15 blur-[120px] pointer-events-none"></div>

      {/* Main Container mimicking a mobile screen on desktop, full screen on mobile */}
      {/* Set overflow-y-auto to allow scrolling of the form and destinations list */}
      <div className="w-full h-screen sm:h-[720px] sm:max-w-[400px] sm:aspect-[9/19] sm:rounded-[40px] sm:border-[8px] sm:border-brand-primary bg-brand-primary-dark sm:shadow-2xl overflow-y-auto relative z-10 scrollbar-none flex flex-col">

        {/* Notch & Status Bar - hidden on mobile views */}
        <div className="hidden sm:flex h-6 w-full justify-between items-center px-6 text-[10px] text-neutral-bg/60 font-sans absolute top-2 left-0 z-30 pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="h-2 w-3.5 border border-neutral-bg/30 rounded-sm bg-neutral-bg/70"></span>
          </div>
        </div>

        {/* Top Header Section with Logo at the top - 32% height */}
        <div className="relative h-[220px] w-full overflow-hidden shrink-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0.85 }}
            animate={{ scale: 1.02, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="/dunes.png"
            alt="Travel background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          {/* Brand Overlay Gradient */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-6 pt-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(55,12,8,0.4) 0%, rgba(55,12,8,0.75) 60%, rgba(55,12,8,1) 100%)'
            }}
          >
            {/* Logo positioned at the top of the header area */}
            <div className="w-full flex justify-start">
              <GrandCruLogo className="h-10 w-auto object-contain block" />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-brand-secondary-light font-serif tracking-widest uppercase opacity-85">
                Luxury Itinerary Concierge
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Fields Section */}
        <div className="px-6 py-4 flex flex-col justify-start bg-brand-primary-dark shrink-0">
          <LoginForm />
        </div>

        {/* Recommended Destinations Carousel Section */}
        <div className="px-6 pb-8 pt-2 bg-brand-primary-dark flex flex-col shrink-0 text-left">
          <h4 className="text-xs uppercase tracking-widest font-serif font-bold text-brand-secondary-light mb-3">
            Signature Destinations
          </h4>
          <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing w-full">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              whileTap={{ cursor: 'grabbing' }}
              className="flex gap-3 w-max"
            >
              {RECOMMENDED_DESTINATIONS.map((destination) => (
                <motion.div
                  key={destination.id}
                  className="w-[130px] h-[210px] rounded-2xl overflow-hidden relative border border-brand-primary-surf/20 bg-black/40 group shrink-0"
                >
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-brand-primary-dark/20 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[8px] text-brand-secondary-light/85 uppercase font-bold tracking-wider pointer-events-none">
                      {destination.country}
                    </span>
                    <h5 className="font-serif text-[11px] text-white font-medium leading-tight pointer-events-none">
                      {destination.title}
                    </h5>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mini branding footer to anchor the layout and fill remaining space */}
        <div className="w-full py-4 text-center mt-auto bg-brand-primary-dark border-t border-brand-primary-surf/10 shrink-0">
          <p className="text-[8px] text-neutral-bg/30 uppercase tracking-widest">
            Grand Cru Travelers • Membre D'Elite
          </p>
        </div>
      </div>

    </div>
  )
}
