import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

interface CountryInterest {
  name: string
  image: string
  count: string
}

interface StorySlide {
  image: string
  title: string
  description: string
}

const COUNTRIES: CountryInterest[] = [
  {
    name: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80',
    count: '12 Places'
  },
  {
    name: 'Spain',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=150&q=80',
    count: '8 Places'
  },
  {
    name: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=150&q=80',
    count: '15 Places'
  },
  {
    name: 'Egypt',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=150&q=80',
    count: '6 Places'
  },
  {
    name: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&q=80',
    count: '10 Places'
  },
  {
    name: 'Italy',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=150&q=80',
    count: '18 Places'
  },
  {
    name: 'Greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=150&q=80',
    count: '9 Places'
  },
  {
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=150&q=80',
    count: '7 Places'
  }
]

const DESTINATION_STORIES: Record<string, StorySlide[]> = {
  France: [
    {
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      title: 'Eiffel & Seine Privé',
      description: 'Exclusive private yacht cruise along the Seine during twilight champagne hours.'
    },
    {
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
      title: 'Côte d\'Azur Charter',
      description: 'Chartering luxury yachts off Cannes beach shores with personal skippers.'
    },
    {
      image: 'https://images.unsplash.com/photo-1520608421441-19c6633766a5?auto=format&fit=crop&w=800&q=80',
      title: 'Provence Lavender Fields',
      description: 'Bespoke vintage sports car tours through blooming lavender valleys.'
    }
  ],
  Spain: [
    {
      image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
      title: 'Ibiza Secluded Coves',
      description: 'Private catamaran anchorage at Secret beach coves for deep-sea swimming.'
    },
    {
      image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=800&q=80',
      title: 'Barcelona Architecture VIP',
      description: 'Exclusive after-hours access to historical landmarks with personal curators.'
    }
  ],
  Indonesia: [
    {
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      title: 'Uluwatu Sunset Dinners',
      description: 'Spectacular private dining set on Bali\'s southern ocean cliff tops.'
    },
    {
      image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=800&q=80',
      title: 'Komodo Phinisi Yachting',
      description: 'Sailing custom luxury phinisi yachts to volcanic hills and pink beaches.'
    }
  ],
  Egypt: [
    {
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      title: 'Giza Necropolis Dawn',
      description: 'Private sunrise horseback tours directly adjacent to historical Pyramids.'
    }
  ],
  Japan: [
    {
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      title: 'Kyoto Zen Bamboo Sanctuaries',
      description: 'Morning walks through silent Arashiyama groves with personal masters.'
    }
  ]
}

export default function InterestByDestination() {
  const navigate = useNavigate()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  // Instagram Story Overlay States
  const [activeStoryCountry, setActiveStoryCountry] = useState<string | null>(null)
  const [activeStorySlides, setActiveStorySlides] = useState<StorySlide[]>([])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [storyProgress, setStoryProgress] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  // Auto-progress timer for Instagram Story slides
  useEffect(() => {
    if (!activeStoryCountry || activeStorySlides.length === 0) return

    setStoryProgress(0)
    const slideDuration = 4500 // 4.5 seconds per slide
    const intervalTime = 50
    const steps = slideDuration / intervalTime
    let stepCount = 0

    const timer = setInterval(() => {
      stepCount++
      setStoryProgress((stepCount / steps) * 100)

      if (stepCount >= steps) {
        clearInterval(timer)
        if (currentSlideIndex < activeStorySlides.length - 1) {
          setCurrentSlideIndex(prev => prev + 1)
        } else {
          // Finished all slides: close modal
          handleCloseStory()
        }
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [activeStoryCountry, currentSlideIndex, activeStorySlides])

  const handleOpenStory = (countryName: string) => {
    const slides = DESTINATION_STORIES[countryName] || [
      {
        image: COUNTRIES.find(c => c.name === countryName)?.image || '',
        title: `${countryName} Escape`,
        description: 'Explore the absolute peak of bespoke retreats and luxury hotel sanctuaries.'
      }
    ]
    setActiveStoryCountry(countryName)
    setActiveStorySlides(slides)
    setCurrentSlideIndex(0)
    setStoryProgress(0)
  }

  const handleCloseStory = () => {
    setActiveStoryCountry(null)
    setActiveStorySlides([])
    setCurrentSlideIndex(0)
    setStoryProgress(0)
  }

  const handleInquire = () => {
    if (activeStoryCountry && activeStorySlides[currentSlideIndex]) {
      const slide = activeStorySlides[currentSlideIndex]
      navigate('/inquiry', {
        state: {
          trip: {
            title: slide.title,
            location: `${activeStoryCountry} • Luxury Highlight`,
            image: slide.image,
            price: 'Curated'
          }
        }
      })
    }
  }

  const handleStoryTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent close button or interactive inquire button tapping from triggering next slide
    const target = e.target as HTMLElement
    if (target.closest('.close-btn') || target.closest('.inquire-area')) return

    const screenWidth = window.innerWidth
    const x = e.clientX

    if (x < screenWidth * 0.35) {
      // Tap Left: Previous slide
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex(prev => prev - 1)
      } else {
        setCurrentSlideIndex(0)
      }
    } else {
      // Tap Right: Next slide
      if (currentSlideIndex < activeStorySlides.length - 1) {
        setCurrentSlideIndex(prev => prev + 1)
      } else {
        handleCloseStory()
      }
    }
  }

  return (
    <div className="space-y-3 text-left">
      <div className="flex justify-between items-center text-xs px-1">
        <span className="font-serif font-bold uppercase tracking-wider text-brand-secondary-light">Highlight</span>
      </div>

      <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing w-full">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
          className="flex gap-4 w-max px-1 py-1"
        >
          {COUNTRIES.map((country) => (
            <motion.div
              whileHover={{ y: -3 }}
              key={country.name}
              onClick={() => handleOpenStory(country.name)}
              className="flex flex-col items-center space-y-1.5 cursor-pointer shrink-0"
            >
              <div className="relative h-16 w-16 rounded-full overflow-hidden border border-brand-primary-surf/40 bg-black/30 group pointer-events-none">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-primary-dark/30 hover:bg-transparent transition-colors"></div>
              </div>
              <div className="text-center pointer-events-none">
                <p className="text-[11px] font-medium text-neutral-bg">{country.name}</p>
                <p className="text-[8px] text-neutral-surface/60">{country.count}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Instagram Story Fullscreen Modal Overlay */}
      <AnimatePresence>
        {activeStoryCountry && activeStorySlides.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleStoryTap}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between font-sans overflow-hidden select-none cursor-pointer"
          >
            {/* Story Slide Background Image */}
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlideIndex}
                  src={activeStorySlides[currentSlideIndex].image}
                  alt={activeStorySlides[currentSlideIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/95 via-transparent to-black/60" />
            </div>

            {/* Top Segmented Progress Indicators */}
            <div className="relative z-10 px-4 pt-6 flex gap-1.5 w-full">
              {activeStorySlides.map((_, idx) => (
                <div key={idx} className="flex-1 h-[2px] bg-neutral-surface/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-secondary transition-all"
                    style={{
                      width: idx === currentSlideIndex
                        ? `${storyProgress}%`
                        : idx < currentSlideIndex
                          ? '100%'
                          : '0%',
                      transitionDuration: idx === currentSlideIndex ? '50ms' : '0.2s'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Navigation Header (Title and Close Button) */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-3 close-btn">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-brand-secondary text-brand-primary-dark font-bold font-serif text-[10px] flex items-center justify-center">
                  {activeStoryCountry[0]}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-bg font-mono">
                  {activeStoryCountry} • Highlight Details
                </span>
              </div>

              <button
                onClick={handleCloseStory}
                className="h-7 w-7 rounded-full bg-black/45 hover:bg-black/65 border border-brand-primary-surf/25 text-neutral-bg flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 pb-4 space-y-3 text-left max-w-md mx-auto w-full mt-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3.5"
                >
                  <span className="text-[10px] text-brand-secondary font-mono tracking-widest uppercase font-bold">
                    EXPLORE PLACE {currentSlideIndex + 1} OF {activeStorySlides.length}
                  </span>
                  <h2 className="text-2xl font-serif text-brand-secondary-light font-bold leading-tight">
                    {activeStorySlides[currentSlideIndex].title}
                  </h2>
                  <p className="text-xs text-neutral-surface/85 leading-relaxed font-light">
                    {activeStorySlides[currentSlideIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Full-width Inquire Now Button at the bottom */}
            <div className="relative z-20 px-6 pb-8 w-full max-w-md mx-auto inquire-area">
              <motion.button
                onClick={handleInquire}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-brand-secondary to-[#E7D2BC] text-brand-primary-dark text-xs uppercase font-serif font-bold tracking-widest hover:opacity-95 shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer z-30 flex items-center justify-center gap-2"
              >
                Inquire Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
