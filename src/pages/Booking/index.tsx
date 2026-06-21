import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BottomNav from '@/components/BottomNav'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import {
  Calendar,
  Ticket,
  UsersGroupTwoRounded,
  Smartphone,
  Letter,
  MapPoint
} from '@solar-icons/react'

type TabType = 'Overview' | 'Journeys Plan' | 'Flight' | 'Hotel' | 'People'

export default function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<TabType>('Overview')
  const [showShareModal, setShowShareModal] = useState(false)
  const [alertConfig, setAlertConfig] = useState<{ show: boolean; message: string; title: string; redirect?: string } | null>(null)

  const defaultTrip = {
    title: 'Private Villa in Tuscany',
    location: 'Italy • Exclusive Retreat',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
    price: '€2,450'
  }

  const trip = location.state?.trip || defaultTrip

  // Dynamic helper calculations
  const countryMap: Record<string, string> = {
    'tuscany': 'Tuscany',
    'toscana': 'Tuscany',
    'alula': 'AlUla',
    'kyoto': 'Kyoto',
    'santorini': 'Santorini',
    'amalfi': 'Amalfi',
    'france': 'France',
    'spain': 'Spain',
    'bali': 'Bali',
    'indonesia': 'Bali',
    'egypt': 'Egypt',
    'italy': 'Italy',
    'greece': 'Greece'
  }

  const getDestinationCountry = (title: string, locationStr: string) => {
    const target = `${title} ${locationStr}`.toLowerCase()
    for (const key of Object.keys(countryMap)) {
      if (target.includes(key)) {
        return countryMap[key]
      }
    }
    const parts = locationStr.split('•')
    return parts[0]?.trim() || 'Bali'
  }

  const destinationCountry = getDestinationCountry(trip.title || '', trip.location || '')
  const originCountry = destinationCountry.toLowerCase() === 'france' ? 'Bali' : 'France'
  const tripPrice = trip.price && trip.price !== 'Curated' ? trip.price : '$ 2,000.00'

  const hotelMap: Record<string, string> = {
    'tuscany': 'Il Borgo Exclusive Estate',
    'toscana': 'Il Borgo Exclusive Estate',
    'alula': 'Habitas Luxury Eco-Resort',
    'kyoto': 'Hoshinoya Luxury Ryokan',
    'santorini': 'Katikies Luxury Suites',
    'amalfi': 'Belmond Hotel Caruso',
    'france': 'Eiffel & Seine Luxury Hotel',
    'spain': 'Ibiza Luxury Villa',
    'indonesia': 'Bvlgari Resort & Private Villas',
    'bali': 'Bvlgari Resort & Private Villas',
    'egypt': 'The Mena House Cairo'
  }

  const getHotelName = (title: string, locationStr: string) => {
    const target = `${title} ${locationStr}`.toLowerCase()
    for (const key of Object.keys(hotelMap)) {
      if (target.includes(key)) {
        return hotelMap[key]
      }
    }
    return 'Grand Cru Luxury Partner Villa'
  }

  const hotelName = getHotelName(trip.title || '', trip.location || '')

  const tabs: TabType[] = ['Overview', 'Journeys Plan', 'Flight', 'Hotel', 'People']

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans pb-16">
      <div className="flex-1 overflow-y-auto pb-6">

        {/* Banner header same as clicked trip card */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={trip.image || defaultTrip.image}
            alt={trip.title}
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-black/35 to-transparent"></div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 h-8 px-3 rounded-full bg-black/40 text-neutral-bg text-xs hover:bg-black/60 transition-all cursor-pointer z-10"
          >
            ← Back
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="absolute top-6 right-6 h-8 px-3 rounded-full bg-brand-secondary text-brand-primary-dark text-xs font-bold hover:bg-brand-secondary-dark transition-all cursor-pointer z-10 flex items-center gap-1.5 shadow-lg active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l-2.777 1.258m2.777-1.258a3.125 3.125 0 100-3.484M8.684 10.742a3.13 3.13 0 000 2.516m0-2.516l2.777 1.258m-2.777 1.258a3.125 3.125 0 100 3.484" />
            </svg>
            Share
          </button>
          <div className="absolute bottom-4 left-6 text-left">
            <h1 className="text-2xl font-serif text-brand-secondary-light font-bold leading-tight">{trip.title}</h1>
          </div>
        </div>

        {/* Dynamic Route Card - luxury design */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-black/50 to-brand-primary-dark/80 backdrop-blur-md rounded-3xl p-6 text-neutral-bg border border-brand-secondary/20 shadow-2xl text-left relative overflow-hidden group">
            {/* Subtle background golden glow */}
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-brand-secondary/10 blur-2xl group-hover:bg-brand-secondary/15 transition-all"></div>

            <div className="flex justify-between items-center pb-4 border-b border-brand-primary-surf/20">
              <div className="flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-widest text-brand-secondary font-semibold">Origin</span>
                <span className="text-lg font-serif font-bold text-neutral-bg mt-1">{originCountry}</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-[9px] text-brand-secondary/70 font-mono tracking-widest mb-1">FIRST CLASS</div>
                <div className="w-full flex items-center justify-between gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-secondary/60"></div>
                  <div className="flex-1 border-t border-dashed border-brand-secondary/40 relative flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-secondary absolute -top-2 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-brand-secondary font-semibold">Destination</span>
                <span className="text-lg font-serif font-bold text-brand-secondary-light mt-1">{destinationCountry}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 pt-4 divide-x divide-brand-primary-surf/20 text-center">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] text-neutral-surface/60 font-medium uppercase tracking-widest">Duration</span>
                <span className="text-sm font-serif font-bold text-neutral-bg mt-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand-secondary" /> 10 Days
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] text-neutral-surface/60 font-medium uppercase tracking-widest">Amount</span>
                <span className="text-sm font-serif font-bold text-brand-secondary mt-1">
                  {tripPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab View selector */}
        <div className="px-6 space-y-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-1 border-b border-brand-primary-surf/20">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-2 px-3 text-xs font-medium whitespace-nowrap cursor-pointer relative transition-colors",
                  activeTab === tab ? "text-brand-secondary font-bold" : "text-neutral-surface/60 hover:text-neutral-bg"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-booking-tab"
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-secondary"
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[180px] p-5 rounded-2xl bg-black/25 border border-brand-primary-surf/15 text-left text-xs text-neutral-surface/90">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {activeTab === 'Overview' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-brand-primary-surf/15 pb-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-secondary-light">Curated Overview</h4>
                      <span className="text-[9px] bg-brand-secondary/20 text-brand-secondary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Bespoke Tour
                      </span>
                    </div>

                    <p className="leading-relaxed text-[11px] text-neutral-surface/80">
                      This meticulously crafted itinerary focuses on pristine environments, fine gastronomic menus, and elite private guides. Every step is curated to guarantee comfort, luxury, and authentic cultural immersion.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="bg-black/20 p-3 rounded-xl border border-brand-primary-surf/10 flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] uppercase tracking-wider text-brand-secondary font-bold block mb-1">Priority Service</span>
                          <span className="text-xs font-bold text-neutral-bg">Dedicated Concierge</span>
                        </div>
                        <p className="text-[10px] text-neutral-surface/60 mt-1">24/7 private line directly to your chef concierge.</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded-xl border border-brand-primary-surf/10 flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] uppercase tracking-wider text-brand-secondary font-bold block mb-1">Gastronomy</span>
                          <span className="text-xs font-bold text-neutral-bg">Michelin Dining</span>
                        </div>
                        <p className="text-[10px] text-neutral-surface/60 mt-1">Confirmed priority reservations at Michelin-starred venues.</p>
                      </div>
                    </div>

                    <div className="bg-brand-primary-dark/40 border border-brand-primary-surf/15 rounded-xl p-3.5 space-y-2">
                      <h5 className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest">Key Highlights Included</h5>
                      <ul className="space-y-1.5 text-[10px] text-neutral-surface/75">
                        <li className="flex items-start gap-2">
                          <span className="text-brand-secondary text-xs">•</span>
                          <span>Fast-track VIP airport arrivals & clearance handling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand-secondary text-xs">•</span>
                          <span>Chauffeur-driven luxury Mercedes-Benz S-Class transfers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand-secondary text-xs">•</span>
                          <span>Private museum viewings & custom historic guides</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'Journeys Plan' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-brand-primary-surf/15 pb-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-secondary-light">Chronological Journey Timeline</h4>
                      <span className="text-[9px] text-neutral-surface/60">10 Days Bespoke Plan</span>
                    </div>

                    <div className="max-h-[280px] overflow-y-auto pr-1.5 space-y-4 font-sans pl-1 border-l border-brand-secondary/30 ml-1.5 pt-1 scrollbar-thin scrollbar-thumb-brand-secondary/20">
                      {/* Day 1 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 1 • Outbound Flight</span>
                          <span className="text-[8px] bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.5 rounded font-mono font-bold">Ticket In</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">{originCountry} (CDG) ✈ {destinationCountry} (DPS) • Flight GC-772</p>
                        <p className="text-[9px] text-neutral-surface/60">Fast-track VIP lounge check-in, sleeper cabin suite on first-class departure.</p>
                      </div>

                      {/* Day 2 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/90"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 2 • Arrival & Welcome</span>
                          <span className="text-[8px] text-neutral-surface/40">Check-in</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">{hotelName} Check-In</p>
                        <p className="text-[9px] text-neutral-surface/60">Private airport transfer, check-in orientation, welcome 5-course dinner by private chef.</p>
                      </div>

                      {/* Day 3 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/80"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 3 • Sailing Charter</span>
                          <span className="text-[8px] text-neutral-surface/40">Adventure</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Private Catamaran Cruise</p>
                        <p className="text-[9px] text-neutral-surface/60">Sailing to Nusa Penida, snorkeling in secret coves, and fresh beach picnic.</p>
                      </div>

                      {/* Day 4 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/70"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 4 • Heritage Tour</span>
                          <span className="text-[8px] text-neutral-surface/40">Culture</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Uluwatu Temples & Traditional Dance</p>
                        <p className="text-[9px] text-neutral-surface/60">Skip-the-line VIP tour of sacred sites with personal historian guide.</p>
                      </div>

                      {/* Day 5 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/60"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 5 • Art & Design</span>
                          <span className="text-[8px] text-neutral-surface/40">Workshop</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Private Ceramic Atelier Access</p>
                        <p className="text-[9px] text-neutral-surface/60">Meet master artisans and create a personalized pottery keepsake.</p>
                      </div>

                      {/* Day 6 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/50"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 6 • Volcano Trek</span>
                          <span className="text-[8px] text-neutral-surface/40">Nature</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Mount Batur Sunrise Journey</p>
                        <p className="text-[9px] text-neutral-surface/60">Private 4x4 Jeep mountain tour, sunrise breakfast overlooking the caldera.</p>
                      </div>

                      {/* Day 7 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/40"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 7 • Gastronomy</span>
                          <span className="text-[8px] text-neutral-surface/40">Culinary</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Organic Cooking Masterclass</p>
                        <p className="text-[9px] text-neutral-surface/60">Harvest fresh ingredients from a highland garden and prepare authentic dishes.</p>
                      </div>

                      {/* Day 8 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/30"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 8 • Ocean Leisure</span>
                          <span className="text-[8px] text-neutral-surface/40">Relax</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Private Beach Club Cabana</p>
                        <p className="text-[9px] text-neutral-surface/60">Relax with premium cocktail service and front-row ocean views in Uluwatu.</p>
                      </div>

                      {/* Day 9 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/20"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 9 • Fine Dining</span>
                          <span className="text-[8px] text-neutral-surface/40">Gastronomy</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Michelin Degustation dinner</p>
                        <p className="text-[9px] text-neutral-surface/60">7-course menu featuring curated wine pairings in an exclusive estate reservation.</p>
                      </div>

                      {/* Day 10 */}
                      <div className="relative pl-4 space-y-1">
                        <div className="absolute left-[-6.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-secondary/10"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider">Day 10 • Return Journey</span>
                          <span className="text-[8px] bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.5 rounded font-mono font-bold">Ticket Out</span>
                        </div>
                        <p className="text-[10px] text-neutral-bg font-bold">Bali (DPS) ✈ Paris (CDG) • Flight GC-773</p>
                        <p className="text-[9px] text-neutral-surface/60">Late butler check-out, Mercedes S-Class transfer to DPS VIP Terminal lounge, flight departure.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Flight' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-brand-primary-surf/15 pb-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-secondary-light flex items-center gap-1.5">
                        <Ticket className="h-4 w-4 text-brand-secondary" /> Boarding Details
                      </h4>
                      <span className="text-[9px] bg-brand-secondary/20 text-brand-secondary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        VIP Jet
                      </span>
                    </div>

                    <div className="bg-black/30 rounded-xl p-3 border border-brand-primary-surf/10 space-y-2.5 font-sans">
                      <div className="flex justify-between items-center text-[10px] text-neutral-surface/60 uppercase tracking-wider">
                        <span>FLIGHT: <strong className="text-brand-secondary">GC-772</strong></span>
                        <span>SEAT: <strong className="text-brand-secondary">01A (First Class)</strong></span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-brand-primary-surf/10 pt-2.5">
                        <div>
                          <p className="text-[9px] text-neutral-surface/40 uppercase tracking-widest">Departure</p>
                          <p className="text-xs font-bold text-neutral-bg">Paris CDG</p>
                          <p className="text-[10px] text-brand-secondary/80">10:30 AM</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-surface/40 uppercase tracking-widest">Arrival</p>
                          <p className="text-xs font-bold text-neutral-bg">Bali DPS</p>
                          <p className="text-[10px] text-brand-secondary/80">06:45 PM (+1 Day)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-brand-primary-surf/10 pt-2 text-[10px] text-neutral-surface/70">
                        <Calendar className="h-3.5 w-3.5 text-brand-secondary/70" />
                        <span>Boarding Time: <strong>09:45 AM</strong></span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Hotel' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-brand-primary-surf/15 pb-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-secondary-light flex items-center gap-1.5">
                        <MapPoint className="h-4 w-4 text-brand-secondary" /> Featured Accommodations
                      </h4>
                      <span className="text-[9px] text-brand-secondary font-bold uppercase tracking-wider">5 ★ Luxury Resort</span>
                    </div>

                    <div className="bg-black/30 rounded-xl p-3 border border-brand-primary-surf/10 space-y-3.5 font-sans">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-brand-primary-surf/20">
                          <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=150&q=80"
                            alt="Luxury Suite"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs font-bold text-neutral-bg">{hotelName}</p>
                          <p className="text-[10px] text-brand-secondary">Premium Executive Suite</p>
                          <p className="text-[9px] text-neutral-surface/40 mt-0.5">{trip.location || 'Bespoke destination stay'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 border-t border-brand-primary-surf/10 pt-3 text-[10px]">
                        <div className="bg-black/10 p-2 rounded-lg border border-brand-primary-surf/5">
                          <span className="text-neutral-surface/40 block text-[8px] uppercase tracking-wider">VIP Check-In</span>
                          <span className="font-semibold text-neutral-bg">14:00 PM • In-Villa</span>
                        </div>
                        <div className="bg-black/10 p-2 rounded-lg border border-brand-primary-surf/5">
                          <span className="text-neutral-surface/40 block text-[8px] uppercase tracking-wider">VIP Check-Out</span>
                          <span className="font-semibold text-neutral-bg">12:00 PM • Late checkout available</span>
                        </div>
                      </div>

                      <div className="border-t border-brand-primary-surf/10 pt-3">
                        <span className="text-[9px] text-neutral-surface/40 uppercase tracking-widest block mb-1.5">Elite Room Amenities & Services</span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[8px] bg-brand-primary-surf/35 px-2 py-0.5 rounded text-neutral-bg font-medium">Private Butler 24/7</span>
                          <span className="text-[8px] bg-brand-primary-surf/35 px-2 py-0.5 rounded text-neutral-bg font-medium">Wellness Spa Access</span>
                          <span className="text-[8px] bg-brand-primary-surf/35 px-2 py-0.5 rounded text-neutral-bg font-medium">Helipad Access</span>
                          <span className="text-[8px] bg-brand-primary-surf/35 px-2 py-0.5 rounded text-neutral-bg font-medium">Private Pool</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'People' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-brand-primary-surf/15 pb-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-secondary-light flex items-center gap-1.5">
                        <UsersGroupTwoRounded className="h-4 w-4 text-brand-secondary" /> Travelers List
                      </h4>
                      <span className="text-[9px] text-neutral-surface/60">3 Members</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/25 border border-brand-primary-surf/10">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-brand-secondary text-brand-primary-dark font-bold font-serif flex items-center justify-center text-xs">
                            A
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-bg">Andrea Del Villar</p>
                            <p className="text-[9px] text-neutral-surface/60">Primary Account Holder</p>
                          </div>
                        </div>
                        <Letter className="h-4 w-4 text-brand-secondary/70" />
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/25 border border-brand-primary-surf/10">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-brand-primary-surf text-neutral-bg font-bold font-serif flex items-center justify-center text-xs">
                            A
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-bg">Adrian Sterling</p>
                            <p className="text-[9px] text-neutral-surface/60">Co-Traveler Guest</p>
                          </div>
                        </div>
                        <Letter className="h-4 w-4 text-brand-secondary/70" />
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/25 border border-brand-primary-surf/10">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-brand-secondary-dark text-neutral-bg font-bold font-serif flex items-center justify-center text-xs">
                            M
                          </div>
                          <div>
                            <p className="text-xs font-bold text-brand-secondary">Marcello Rossi</p>
                            <p className="text-[9px] text-brand-secondary/70">Elite Concierge Specialist</p>
                          </div>
                        </div>
                        <Smartphone className="h-4 w-4 text-brand-secondary/70" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            onClick={() => {
              setAlertConfig({
                show: true,
                title: 'Bespoke Confirmed',
                message: 'Your booking request has been sent successfully to your Grand Cru Concierge.',
                redirect: '/home'
              })
            }}
            variant="secondary"
            className="w-full h-11 mt-4 text-xs uppercase tracking-widest font-serif font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full shadow-lg shadow-brand-secondary/15 transition-all"
          >
            Confirm Reservation
          </Button>
        </div>
      </div>

      <BottomNav />

      {/* Spotify-like Instagrammable Share Card Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-6 font-sans text-left"
          >
            {/* Story Card Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-[280px] aspect-[9/16] rounded-3xl overflow-hidden relative border border-brand-secondary/40 shadow-2xl flex flex-col justify-between p-6 bg-brand-primary-dark"
            >
              {/* Cover Image Background with low exposure and high saturation gradient */}
              <div className="absolute inset-0">
                <img
                  src={trip.image || defaultTrip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover opacity-35 filter brightness-50 contrast-125 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary-dark/80 via-black/40 to-brand-primary-dark/95" />
                {/* Thin golden internal border framing the story */}
                <div className="absolute inset-2.5 border border-brand-secondary/15 rounded-2xl pointer-events-none" />
              </div>

              {/* Story Content - Relative to overlay */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-1 pt-4">
                <span className="text-[7px] uppercase tracking-[0.25em] text-brand-secondary font-mono">Grand Cru Travelers</span>
                <span className="text-[6px] uppercase tracking-widest text-neutral-surface/60">Bespoke Escape Card</span>
                <div className="w-6 h-[1px] bg-brand-secondary/35 mt-1.5" />
              </div>

              <div className="relative z-10 space-y-4 px-2 my-auto">
                <div className="space-y-1 text-center">
                  <span className="text-[8px] uppercase tracking-widest text-brand-secondary/80 font-semibold font-mono">JOURNEY</span>
                  <h2 className="text-xl font-serif font-bold text-neutral-bg leading-tight tracking-tight drop-shadow-md">
                    {trip.title}
                  </h2>
                </div>

                {/* Micro flight path design */}
                <div className="bg-black/45 border border-brand-secondary/25 rounded-2xl p-3 space-y-2 text-center">
                  <div className="flex justify-between items-center text-[10px] font-serif font-bold text-brand-secondary-light">
                    <span>{originCountry}</span>
                    <svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>{destinationCountry}</span>
                  </div>
                  <div className="w-full h-[1px] border-t border-dashed border-brand-secondary/30" />
                  <div className="flex justify-between text-[7px] uppercase tracking-wider text-neutral-surface/50 font-mono">
                    <span>10 Days Curation</span>
                    <span>First Class</span>
                  </div>
                </div>

                {/* Accommodations Highlight Badge */}
                <div className="text-center">
                  <span className="text-[7px] text-neutral-surface/50 uppercase tracking-widest">Accommodations stay</span>
                  <p className="text-[10px] font-serif text-neutral-bg font-bold mt-0.5">{hotelName}</p>
                </div>
              </div>

              {/* Story Footer Branding */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-2">
                <div className="flex items-center gap-1.5 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full px-2 py-0.5">
                  <span className="w-1 h-1 rounded-full bg-brand-secondary animate-pulse" />
                  <span className="text-[6px] tracking-wider text-brand-secondary font-mono font-bold uppercase">Signature Elite Status</span>
                </div>
                <span className="text-[5px] text-neutral-surface/40 uppercase tracking-widest font-mono">© 2026 Grand Cru Travelers Club</span>
              </div>
            </motion.div>

            {/* Stories Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 w-64 relative z-10">
              <button
                onClick={() => {
                  setShowShareModal(false)
                  setAlertConfig({
                    show: true,
                    title: 'Sharing Stories',
                    message: 'Opening Instagram Stories transition window...'
                  })
                }}
                className="w-full h-11 bg-gradient-to-r from-brand-secondary to-[#E7D2BC] text-brand-primary-dark font-serif font-bold text-xs uppercase tracking-widest rounded-full shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* Instagram story icon SVG */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Share to Instagram Stories
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full h-11 border border-brand-primary-surf/30 text-neutral-surface/80 font-serif font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/5 active:scale-95 transition-all cursor-pointer text-center"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reusable Luxury Simple Alert Modal */}
      <AnimatePresence>
        {alertConfig?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-left"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-brand-primary-dark border border-brand-secondary/35 rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl relative overflow-hidden flex flex-col items-center"
            >
              {/* Subtle gold decoration background */}
              <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-brand-secondary/5 blur-xl pointer-events-none" />

              {/* Luxury Gold Icon stamp */}
              <div className="h-10 w-10 rounded-full bg-brand-secondary/15 border border-brand-secondary/30 flex items-center justify-center mb-3.5">
                <svg className="w-5 h-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-serif text-sm font-bold text-brand-secondary-light tracking-wide uppercase mb-1">
                {alertConfig.title}
              </h3>

              <p className="text-[10px] text-neutral-surface/80 leading-relaxed px-1 mb-5">
                {alertConfig.message}
              </p>

              <button
                onClick={() => {
                  const redirectPath = alertConfig.redirect
                  setAlertConfig(null)
                  if (redirectPath) {
                    navigate(redirectPath)
                  }
                }}
                className="px-6 py-2 rounded-full border border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary-dark font-mono text-[9px] uppercase tracking-widest font-bold transition-all active:scale-95 cursor-pointer"
              >
                Acknowledge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

