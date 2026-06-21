import { useNavigate } from 'react-router-dom'
import { Bookmark } from '@solar-icons/react'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

interface Recommendation {
  id: string
  title: string
  location: string
  image: string
  price: string
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Tuscany Villa',
    location: 'Italy • Retreat',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=250&q=80',
    price: 'From €2,450'
  },
  {
    id: 'rec-2',
    title: 'Amalfi Sanctuary',
    location: 'Italy • Escape',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=250&q=80',
    price: 'From €3,100'
  },
  {
    id: 'rec-3',
    title: 'Kyoto Sanctuary',
    location: 'Japan • Ryokan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=250&q=80',
    price: 'From €1,850'
  },
  {
    id: 'rec-4',
    title: 'Santorini Sunset',
    location: 'Greece • Luxury Stay',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=250&q=80',
    price: 'From €2,900'
  }
]

export default function RecommendationDestination() {
  const navigate = useNavigate()

  return (
    <div className="space-y-3 text-left">
      <div className="flex justify-between items-center text-xs px-1">
        <span className="font-serif font-bold uppercase tracking-wider text-brand-secondary-light">Populer destination</span>
        <span className="text-[10px] text-brand-secondary hover:underline cursor-pointer">View All</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {RECOMMENDATIONS.map((item) => (
          <Card
            key={item.id}
            className="bg-black/40 border-brand-primary-surf/30 cursor-pointer overflow-hidden rounded-2xl flex flex-col justify-between"
            onClick={() => navigate('/destination-detail', { state: { trip: item } })}
          >
            <CardImage
              src={item.image}
              alt={item.title}
              aspect="video"
              className="h-24 w-full object-cover"
            />
            <CardContent className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <CardTitle className="text-xs font-serif text-brand-secondary-light font-bold line-clamp-1">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-[9px] text-neutral-surface/60 line-clamp-1 pt-0.5">
                  {item.location}
                </CardDescription>
              </div>
              <CardFooter className="mt-2 pt-2 border-t border-brand-primary-surf/15 flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-secondary">{item.price}</span>
                <Bookmark className="h-4 w-4 text-brand-secondary cursor-pointer hover:fill-brand-secondary transition-all" />
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
