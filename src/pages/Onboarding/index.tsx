import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'

interface OnboardingSlide {
  image: string
  tag: string
  title: string
  description: string
}

const SLIDES: OnboardingSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    tag: 'Step 1 • Discover Escapes',
    title: 'Explore Curated Destinations',
    description: 'Browse handpicked luxury destinations, curated vineyard tours, and bespoke packages directly on your dashboard.'
  },
  {
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    tag: 'Step 2 • Custom Planning',
    title: 'Craft Bespoke Itineraries',
    description: 'Build your own custom day-by-day plans, choose private villas, log round-trip flight details, and save them to your Favorites tab.'
  },
  {
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    tag: 'Step 3 • Confirm Curation',
    title: 'Direct Concierge Handling',
    description: 'Submit your curated itinerary with one tap. Your dedicated Grand Cru chef concierge handles VIP check-ins and upgrades.'
  }
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Automatic slide progress effect
  useEffect(() => {
    setProgress(0)
    const duration = 5000 // 5 seconds per slide
    const intervalTime = 50
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setProgress((currentStep / steps) * 100)

      if (currentStep >= steps) {
        clearInterval(timer)
        if (currentIndex < SLIDES.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else {
          setCurrentIndex(0) // loop back to first slide
        }
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [currentIndex])

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Exclude buttons from tap control
    const target = e.target as HTMLElement
    if (target.closest('button')) return

    const width = window.innerWidth
    const x = e.clientX

    if (x < width * 0.35) {
      // Tap Left: Previous slide
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
      } else {
        setCurrentIndex(SLIDES.length - 1)
      }
    } else {
      // Tap Right: Next slide
      if (currentIndex < SLIDES.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        navigate('/login')
      }
    }
  }

  return (
    <div 
      onClick={handleTap}
      className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans relative overflow-hidden select-none cursor-pointer"
    >
      {/* Fullscreen Slide Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={SLIDES[currentIndex].image}
            alt={SLIDES[currentIndex].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/95 via-transparent to-black/60" />
      </div>

      {/* Top Segmented Instagram Story Progress Bars */}
      <div className="relative z-10 px-4 pt-6 flex gap-1.5 w-full">
        {SLIDES.map((_, index) => (
          <div key={index} className="flex-1 h-[2px] bg-neutral-surface/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-secondary transition-all"
              style={{
                width: index === currentIndex 
                  ? `${progress}%` 
                  : index < currentIndex 
                    ? '100%' 
                    : '0%',
                transitionDuration: index === currentIndex ? '50ms' : '0.2s'
              }}
            />
          </div>
        ))}
      </div>

      {/* Skip Button Top Right */}
      <div className="relative z-10 flex justify-end px-4 pt-3">
        <button 
          onClick={() => navigate('/login')}
          className="text-[10px] uppercase font-bold tracking-widest text-neutral-surface/60 hover:text-neutral-bg transition-colors py-1 px-3.5 bg-black/30 border border-brand-primary-surf/25 rounded-full cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-6 pb-12 space-y-6 text-left max-w-md mx-auto w-full mt-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-3.5"
          >
            <span className="text-[10px] text-brand-secondary font-mono tracking-widest uppercase font-bold">
              {SLIDES[currentIndex].tag}
            </span>
            <h1 className="text-3xl font-serif text-brand-secondary-light font-bold leading-tight">
              {SLIDES[currentIndex].title}
            </h1>
            <p className="text-xs text-neutral-surface/80 leading-relaxed font-light">
              {SLIDES[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action button at the bottom */}
        <div className="pt-4 flex gap-4 items-center">
          <Button 
            onClick={() => navigate('/login')}
            variant="secondary"
            className="w-full h-11 text-xs uppercase tracking-widest font-serif font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full shadow-lg shadow-brand-secondary/15 transition-all cursor-pointer"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
