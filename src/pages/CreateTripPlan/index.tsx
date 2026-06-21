import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
]

interface DayItem {
  day: string
  activity: string
}

export default function CreateTripPlanPage() {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [hotel, setHotel] = useState('')
  const [duration, setDuration] = useState('10 Days')
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0])
  
  // Interactive Day Items state
  const [dayItems, setDayItems] = useState<DayItem[]>([
    { day: 'Day 1', activity: 'Outbound Flight (Paris CDG ✈ Bali DPS) & Resort Check-in' },
    { day: 'Day 2', activity: 'Wellness Spa Ritual & Sunset Dinner' },
    { day: 'Day 10', activity: 'In-Villa Late Check-out & Return Flight' }
  ])

  const handleAddDay = () => {
    // Try to auto-increment the last day number
    let nextDayNum = dayItems.length + 1
    if (dayItems.length > 0) {
      const lastDayStr = dayItems[dayItems.length - 1].day
      const match = lastDayStr.match(/\d+/)
      if (match) {
        nextDayNum = parseInt(match[0], 10) + 1
      }
    }
    
    setDayItems([
      ...dayItems,
      { day: `Day ${nextDayNum}`, activity: '' }
    ])
  }

  const handleRemoveDay = (index: number) => {
    setDayItems(dayItems.filter((_, i) => i !== index))
  }

  const handleDayChange = (index: number, field: keyof DayItem, value: string) => {
    const updated = [...dayItems]
    updated[index] = { ...updated[index], [field]: value }
    setDayItems(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!destination || !dateRange || !hotel) {
      alert('Please fill in all required fields.')
      return
    }

    if (dayItems.length === 0) {
      alert('Please add at least one day to your itinerary.')
      return
    }

    // Serialize day items into single string
    const serializedActivities = dayItems
      .map(item => `${item.day.trim()}: ${item.activity.trim()}`)
      .join('\n')

    const newTrip = {
      id: `custom-${Date.now()}`,
      destination,
      dateRange,
      hotel,
      duration,
      activities: serializedActivities,
      image: selectedImage
    }

    // Save to local custom trips
    const existing = localStorage.getItem('grandcru_custom_trips')
    const currentTrips = existing ? JSON.parse(existing) : []
    localStorage.setItem('grandcru_custom_trips', JSON.stringify([newTrip, ...currentTrips]))

    alert('Your custom journey plan has been crafted successfully!')
    navigate('/favorites')
  }

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg font-sans pb-6">
      {/* Header */}
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={selectedImage} 
          alt="Journey Preview" 
          className="absolute inset-0 object-cover w-full h-full filter brightness-75 transition-all"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/20 to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          ← Back
        </button>
        <div className="absolute bottom-4 left-6 text-left">
          <h1 className="text-2xl font-serif text-brand-secondary-light font-bold">Craft Bespoke Journey</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left max-w-md mx-auto">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Destination Name *</label>
          <Input 
            placeholder="e.g. Amalfi Coast Sanctuary"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Dates *</label>
          <Input 
            placeholder="e.g. Oct 14 - Oct 24, 2026"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Resort / Accommodations *</label>
          <Input 
            placeholder="e.g. Belmond Hotel Caruso"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Duration</label>
            <Input 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-black/35 border-brand-primary-surf/30 text-neutral-bg"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Choose Cover Image</label>
            <div className="flex gap-2 items-center h-10">
              {PRESET_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-7 h-7 rounded overflow-hidden border-2 cursor-pointer transition-all ${selectedImage === img ? 'border-brand-secondary scale-105 shadow-md' : 'border-transparent opacity-65'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Itinerary Editor */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-brand-primary-surf/20 pb-1.5">
            <label className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold">Itinerary Schedule Per Day</label>
            <button
              type="button"
              onClick={handleAddDay}
              className="px-2.5 py-1 rounded bg-brand-secondary hover:bg-brand-secondary-dark text-brand-primary-dark text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              + Add Day
            </button>
          </div>

          <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
            {dayItems.map((item, index) => (
              <div key={index} className="flex gap-2 items-start bg-black/25 p-3 rounded-xl border border-brand-primary-surf/15">
                <div className="w-16 shrink-0">
                  <span className="text-[8px] uppercase tracking-wider text-brand-secondary/60 font-bold block mb-1">Day Tag</span>
                  <input
                    type="text"
                    value={item.day}
                    onChange={(e) => handleDayChange(index, 'day', e.target.value)}
                    className="w-full text-xs p-1.5 rounded bg-black/40 border border-brand-primary-surf/35 text-neutral-bg focus:outline-none font-bold"
                    placeholder="Day 1"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[8px] uppercase tracking-wider text-brand-secondary/60 font-bold block mb-1">Activity / Details</span>
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => handleDayChange(index, 'activity', e.target.value)}
                    className="w-full text-xs p-1.5 rounded bg-black/40 border border-brand-primary-surf/35 text-neutral-bg focus:outline-none"
                    placeholder="Describe daily plans, flights, or rest..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDay(index)}
                  className="mt-5 p-1 rounded bg-black/40 text-status-error/80 hover:text-status-error hover:bg-black/60 transition-colors cursor-pointer"
                  title="Remove Day"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            {dayItems.length === 0 && (
              <div className="py-6 text-center text-xs text-neutral-surface/40 bg-black/10 rounded-xl border border-dashed border-brand-primary-surf/20">
                Click "+ Add Day" to start building your luxury timeline.
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          variant="secondary"
          className="w-full h-11 text-xs uppercase tracking-widest font-serif font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full shadow-lg shadow-brand-secondary/15 transition-all mt-4"
        >
          Publish Custom Plan
        </Button>
      </form>
    </div>
  )
}
