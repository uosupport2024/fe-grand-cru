import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, User, Letter, UsersGroupTwoRounded, Tuning } from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InquiryPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const defaultTrip = {
    title: 'Eiffel & Seine Privé',
    location: 'France • Luxury Highlight',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    price: 'Curated'
  }

  const trip = location.state?.trip || defaultTrip

  // Form States
  const [fullName, setFullName] = useState('Andrea Del Villar')
  const [email, setEmail] = useState('andrea@grandcrutravelers.com')
  const [dateRange, setDateRange] = useState('')
  const [guests, setGuests] = useState(2)
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission animation
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg font-sans pb-8 text-left relative overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="absolute inset-0 object-cover w-full h-full filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/35 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          ← Back
        </button>
        <div className="absolute bottom-4 left-6 right-6">
          <span className="text-[9px] uppercase tracking-widest text-brand-secondary font-bold font-mono">Inquiry Curation</span>
          <h1 className="text-2xl font-serif text-brand-secondary-light font-bold leading-tight mt-1">{trip.title}</h1>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-md mx-auto relative z-10">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold block mb-1">Selected Destination / Package</label>
          <div className="relative overflow-hidden rounded-2xl border border-brand-secondary/30 bg-black/40 shadow-xl flex items-center p-3.5 gap-4 group">
            {/* Image Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-brand-primary-surf/20">
              <img 
                src={trip.image} 
                alt={trip.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Details */}
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-serif text-sm font-bold text-brand-secondary-light truncate leading-snug">
                {trip.title}
              </h4>
              <p className="text-[10px] text-neutral-surface/65 truncate">
                {trip.location}
              </p>
              <span className="inline-block text-[9px] font-bold text-brand-secondary uppercase font-mono tracking-wider">
                {trip.price}
              </span>
            </div>

            {/* Premium Gold Accent Seal */}
            <div className="absolute right-3 top-3.5 h-5 w-5 rounded-full bg-brand-secondary/15 border border-brand-secondary/40 flex items-center justify-center pointer-events-none">
              <span className="text-[8px] text-brand-secondary">⚜</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Full Name</label>
          <Input 
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            icon={<User className="h-4 w-4 text-brand-secondary/80" />}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">VIP Email Address</label>
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            icon={<Letter className="h-4 w-4 text-brand-secondary/80" />}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Preferred Travel Dates</label>
          <Input 
            type="text"
            placeholder="e.g. Sep 15 - Sep 22, 2026"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            icon={<Calendar className="h-4 w-4 text-brand-secondary/80" />}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Number of Guests</label>
            <div className="flex items-center bg-black/35 border border-brand-primary-surf/30 rounded-lg px-3 h-10 gap-2">
              <UsersGroupTwoRounded className="h-4 w-4 text-brand-secondary/80 shrink-0" />
              <input
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-full bg-transparent focus:outline-none text-xs text-neutral-bg"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Service Class</label>
            <div className="flex items-center bg-black/35 border border-brand-primary-surf/30 rounded-lg px-3 h-10 gap-2">
              <Tuning className="h-4 w-4 text-brand-secondary/80 shrink-0" />
              <select className="w-full bg-transparent focus:outline-none text-xs text-neutral-bg cursor-pointer">
                <option value="first" className="bg-brand-primary-dark">First Class</option>
                <option value="private" className="bg-brand-primary-dark">Private Jet Charter</option>
                <option value="business" className="bg-brand-primary-dark">Business Class</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Special Concierge Requests</label>
          <textarea
            rows={4}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g. Private yacht arrangements, specific dietary requirements, late checkouts, VIP room amenities..."
            className="w-full text-xs p-3 rounded-lg bg-black/35 border border-brand-primary-surf/30 text-neutral-bg focus:outline-none focus:border-brand-secondary transition-colors"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          variant="secondary"
          className="w-full h-11 text-xs uppercase tracking-widest font-serif font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full shadow-lg shadow-brand-secondary/15 transition-all mt-4 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-brand-primary-dark border-t-transparent rounded-full animate-spin" />
          ) : (
            'Submit Bespoke Inquiry'
          )}
        </Button>
      </form>

      {/* Inquiry Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-brand-primary-dark border border-brand-secondary/35 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-pulse-subtle"
            >
              <div className="h-16 w-16 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center mx-auto">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-brand-secondary text-2xl font-serif"
                >
                  ⚜
                </motion.span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-brand-secondary-light font-bold">Inquiry Successfully Sent</h3>
                <p className="text-xs text-neutral-surface/80 leading-relaxed font-light">
                  Your custom curation request has been received. A Grand Cru Chef Concierge will review your special requests and contact you with a customized proposal within 15 minutes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false)
                  navigate('/home')
                }}
                className="w-full py-3 bg-brand-secondary hover:bg-brand-secondary-dark text-brand-primary-dark text-xs uppercase font-serif font-bold tracking-widest rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
