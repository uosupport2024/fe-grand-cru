import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface PackageItem {
  id: string
  title: string
  duration: string
  inclusions: string
  price: string
  image: string
}

const PACKAGES: PackageItem[] = [
  {
    id: 'pack-1',
    title: 'Kyoto Sanctuary & Ryokan Experience',
    duration: '7 Days / 6 Nights',
    inclusions: 'Hoshinoya Stay • VIP Dining • Private Tea Ceremony',
    price: '€6,200',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=350&q=80'
  },
  {
    id: 'pack-2',
    title: 'AlUla Oasis & Desert Stargazing',
    duration: '5 Days / 4 Nights',
    inclusions: 'Habitas AlUla • Luxury Transfers • Guided Dunes Tour',
    price: '€4,800',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=350&q=80'
  }
]

export default function TravelPackages() {
  const navigate = useNavigate()

  return (
    <div className="space-y-3 text-left">
      <div className="flex justify-between items-center text-xs px-1">
        <span className="font-serif font-bold uppercase tracking-wider text-brand-secondary-light">Package</span>
        <span className="text-[10px] text-brand-secondary hover:underline cursor-pointer">View All</span>
      </div>

      <div className="overflow-x-auto scrollbar-none py-1">
        <div className="flex gap-4 w-max px-1">
          {PACKAGES.map((pack) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={pack.id}
              className="w-[260px] bg-black/40 border border-brand-primary-surf/20 rounded-3xl overflow-hidden shrink-0 flex flex-col justify-between cursor-pointer"
              onClick={() => navigate('/package-detail', { state: { package: pack } })}
            >
              <div className="h-32 w-full relative">
                <img src={pack.image} alt={pack.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-transparent to-transparent"></div>
              </div>
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] bg-brand-secondary/20 text-brand-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Signature Package
                  </span>
                  <h4 className="font-serif text-sm font-bold text-neutral-bg leading-snug pt-1">
                    {pack.title}
                  </h4>
                  <p className="text-[10px] text-neutral-surface/60 italic leading-normal">
                    {pack.inclusions}
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-primary-surf/15 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-bg/40">Total price</span>
                    <span className="text-xs font-bold text-brand-secondary">{pack.price}</span>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation()
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
                    }}
                    variant="secondary" 
                    className="px-3.5 py-1.5 h-8 text-[10px] uppercase font-bold tracking-widest bg-brand-secondary hover:bg-brand-secondary-dark rounded-full"
                  >
                    Inquire Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
