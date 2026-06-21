import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import brandLogo from '@/assets/logotipo_grandcrutravelers_transparente-01.webp'

export default function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-brand-primary-dark flex items-center justify-center p-4">
      <div className="text-center space-y-4 animate-pulse">
        <img 
          src={brandLogo} 
          alt="Grand Cru Travelers" 
          className="h-16 w-auto object-contain mx-auto" 
        />
        <p className="text-xs text-brand-secondary tracking-widest uppercase font-serif">Luxury Itinerary Concierge</p>
      </div>
    </div>
  )
}
