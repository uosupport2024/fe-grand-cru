import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Magnifier, Compass, MapPoint, Ticket, Stars, ArrowLeft } from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchItem {
  id: string
  type: 'destination' | 'package' | 'highlight'
  title: string
  subtitle: string
  image: string
  price?: string
  tags: string[]
  originalData: any
  score?: number
  matchReason?: string
}

// Master Index of all Searchable Luxury Experiences
const SEARCHABLE_ITEMS: SearchItem[] = [
  // Packages
  {
    id: 'pack-1',
    type: 'package',
    title: 'Kyoto Sanctuary & Ryokan Experience',
    subtitle: '7 Days / 6 Nights • Signature Package',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=350&q=80',
    price: '€6,200',
    tags: ['japan', 'kyoto', 'ryokan', 'tea ceremony', 'dining', 'temple', 'bamboo', 'culture', 'stay', 'package'],
    originalData: {
      id: 'pack-1',
      title: 'Kyoto Sanctuary & Ryokan Experience',
      duration: '7 Days / 6 Nights',
      inclusions: 'Hoshinoya Stay • VIP Dining • Private Tea Ceremony',
      price: '€6,200',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=350&q=80'
    }
  },
  {
    id: 'pack-2',
    type: 'package',
    title: 'AlUla Oasis & Desert Stargazing',
    subtitle: '5 Days / 4 Nights • Signature Package',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=350&q=80',
    price: '€4,800',
    tags: ['saudi', 'alula', 'desert', 'stargazing', 'luxury', 'oasis', 'stay', 'package', 'stars', 'camp'],
    originalData: {
      id: 'pack-2',
      title: 'AlUla Oasis & Desert Stargazing',
      duration: '5 Days / 4 Nights',
      inclusions: 'Habitas AlUla • Luxury Transfers • Guided Dunes Tour',
      price: '€4,800',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=350&q=80'
    }
  },
  // Recommended Destinations
  {
    id: 'rec-1',
    type: 'destination',
    title: 'Tuscany Villa',
    subtitle: 'Italy • Exclusive Retreat',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=250&q=80',
    price: 'From €2,450',
    tags: ['italy', 'tuscany', 'toscana', 'villa', 'wine', 'grape', 'retreat', 'europe'],
    originalData: {
      id: 'rec-1',
      title: 'Tuscany Villa',
      location: 'Italy • Retreat',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=250&q=80',
      price: 'From €2,450'
    }
  },
  {
    id: 'rec-2',
    type: 'destination',
    title: 'Amalfi Sanctuary',
    subtitle: 'Italy • Coastal Escape',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=250&q=80',
    price: 'From €3,100',
    tags: ['italy', 'amalfi', 'coast', 'sea', 'boat', 'escape', 'europe', 'beach'],
    originalData: {
      id: 'rec-2',
      title: 'Amalfi Sanctuary',
      location: 'Italy • Escape',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=250&q=80',
      price: 'From €3,100'
    }
  },
  {
    id: 'rec-3',
    type: 'destination',
    title: 'Kyoto Sanctuary',
    subtitle: 'Japan • Historic Ryokan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=250&q=80',
    price: 'From €1,850',
    tags: ['japan', 'kyoto', 'ryokan', 'garden', 'temple', 'zen', 'asia', 'culture'],
    originalData: {
      id: 'rec-3',
      title: 'Kyoto Sanctuary',
      location: 'Japan • Ryokan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=250&q=80',
      price: 'From €1,850'
    }
  },
  {
    id: 'rec-4',
    type: 'destination',
    title: 'Santorini Sunset',
    subtitle: 'Greece • Luxury Island Stay',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=250&q=80',
    price: 'From €2,900',
    tags: ['greece', 'santorini', 'sunset', 'caldera', 'island', 'sea', 'beach', 'europe'],
    originalData: {
      id: 'rec-4',
      title: 'Santorini Sunset',
      location: 'Greece • Luxury Stay',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=250&q=80',
      price: 'From €2,900'
    }
  },
  // Highlights
  {
    id: 'high-1',
    type: 'highlight',
    title: 'Eiffel & Seine Privé',
    subtitle: 'France • Seine Yacht Cruise',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80',
    tags: ['france', 'paris', 'seine', 'yacht', 'champagne', 'cruise', 'boat', 'eiffel tower', 'romance'],
    originalData: {
      title: 'Eiffel & Seine Privé',
      location: 'France • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-2',
    type: 'highlight',
    title: 'Côte d\'Azur Charter',
    subtitle: 'France • Yacht Charter',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=150&q=80',
    tags: ['france', 'cannes', 'yacht', 'charter', 'boat', 'sea', 'beach', 'sailing'],
    originalData: {
      title: 'Côte d\'Azur Charter',
      location: 'France • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-3',
    type: 'highlight',
    title: 'Provence Lavender Fields',
    subtitle: 'France • Sports Car Tour',
    image: 'https://images.unsplash.com/photo-1520608421441-19c6633766a5?auto=format&fit=crop&w=150&q=80',
    tags: ['france', 'provence', 'lavender', 'valley', 'sports car', 'drive', 'flowers', 'road trip'],
    originalData: {
      title: 'Provence Lavender Fields',
      location: 'France • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1520608421441-19c6633766a5?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-4',
    type: 'highlight',
    title: 'Ibiza Secluded Coves',
    subtitle: 'Spain • Catamaran Sailing',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=150&q=80',
    tags: ['spain', 'ibiza', 'catamaran', 'beach', 'swim', 'cove', 'sailing', 'sea', 'boat'],
    originalData: {
      title: 'Ibiza Secluded Coves',
      location: 'Spain • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-5',
    type: 'highlight',
    title: 'Barcelona Architecture VIP',
    subtitle: 'Spain • Historical Excursion',
    image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=150&q=80',
    tags: ['spain', 'barcelona', 'architecture', 'gaudi', 'guide', 'vip', 'history'],
    originalData: {
      title: 'Barcelona Architecture VIP',
      location: 'Spain • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-6',
    type: 'highlight',
    title: 'Uluwatu Sunset Dinners',
    subtitle: 'Indonesia • Ocean Cliff Dining',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=150&q=80',
    tags: ['indonesia', 'bali', 'uluwatu', 'sunset', 'dinner', 'cliff', 'food', 'romantic'],
    originalData: {
      title: 'Uluwatu Sunset Dinners',
      location: 'Indonesia • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-7',
    type: 'highlight',
    title: 'Komodo Phinisi Yachting',
    subtitle: 'Indonesia • Volcanic Sailing',
    image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=150&q=80',
    tags: ['indonesia', 'komodo', 'sailing', 'yacht', 'phinisi', 'beach', 'pink beach'],
    originalData: {
      title: 'Komodo Phinisi Yachting',
      location: 'Indonesia • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-8',
    type: 'highlight',
    title: 'Giza Necropolis Dawn',
    subtitle: 'Egypt • Pyramids Horseback Tour',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=150&q=80',
    tags: ['egypt', 'pyramid', 'giza', 'sunrise', 'horse', 'desert', 'history'],
    originalData: {
      title: 'Giza Necropolis Dawn',
      location: 'Egypt • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  },
  {
    id: 'high-9',
    type: 'highlight',
    title: 'Kyoto Zen Bamboo Sanctuaries',
    subtitle: 'Japan • Meditation Excursion',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&q=80',
    tags: ['japan', 'kyoto', 'bamboo', 'zen', 'meditation', 'arashiyama', 'nature'],
    originalData: {
      title: 'Kyoto Zen Bamboo Sanctuaries',
      location: 'Japan • Luxury Highlight',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      price: 'Curated'
    }
  }
]

// Semantic search dictionary mapping user intent keywords to curated tags
const SEMANTIC_DICTIONARY: Record<string, string[]> = {
  // Indonesian terms
  'pantai': ['beach', 'sea', 'coast', 'cove', 'sailing', 'island'],
  'laut': ['sea', 'yacht', 'boat', 'sailing', 'charter', 'phinisi', 'beach', 'cove'],
  'pasir': ['beach', 'desert'],
  'berenang': ['beach', 'swim', 'sea', 'cove'],
  'makan': ['dining', 'dinner', 'tea ceremony', 'food', 'gastronomy', 'champagne'],
  'kuliner': ['dining', 'dinner', 'food', 'tea ceremony'],
  'restoran': ['dining', 'dinner', 'food'],
  'malam': ['dinner', 'stargazing', 'stars', 'sunset', 'dawn', 'sunrise'],
  'siang': ['cruise', 'tour', 'drive'],
  'romantis': ['romance', 'romantic', 'sunset', 'champagne'],
  'mesra': ['romance', 'romantic', 'sunset'],
  'bulan madu': ['romance', 'romantic', 'sunset'],
  'sejarah': ['history', 'culture', 'temple', 'historic', 'zen', 'guide', 'pyramid'],
  'kuno': ['history', 'historic', 'pyramid', 'temple'],
  'budaya': ['culture', 'temple', 'tea ceremony', 'zen', 'historic'],
  'candi': ['temple', 'zen', 'history', 'culture'],
  'kuil': ['temple', 'zen', 'history', 'culture'],
  'meditasi': ['meditation', 'zen', 'bamboo'],
  'perahu': ['yacht', 'boat', 'sailing', 'cruise', 'charter', 'phinisi'],
  'kapal': ['yacht', 'boat', 'sailing', 'cruise', 'charter', 'phinisi'],
  'layar': ['yacht', 'boat', 'sailing', 'cruise', 'charter', 'phinisi'],
  'yacht': ['yacht', 'boat', 'sailing', 'cruise', 'charter', 'phinisi'],
  'gurun': ['desert', 'stargazing', 'stars', 'camp', 'dunes'],
  'bintang': ['stargazing', 'stars', 'camp', 'night'],
  'kemah': ['camp', 'desert', 'stargazing'],
  'gunung': ['nature', 'bamboo', 'valley'],
  'alam': ['nature', 'bamboo', 'valley', 'lavender', 'flowers', 'oasis'],
  'hutan': ['nature', 'bamboo'],
  'bambu': ['bamboo', 'zen'],
  'jalan': ['tour', 'drive', 'excursion', 'road trip'],
  'wisata': ['tour', 'drive', 'excursion', 'road trip', 'guide'],
  'mobil': ['sports car', 'drive', 'road trip'],
  'eropa': ['europe', 'france', 'italy', 'spain', 'greece'],
  'perancis': ['france', 'paris', 'seine', 'yacht', 'eiffel'],
  'paris': ['france', 'paris', 'seine', 'eiffel'],
  'italia': ['italy', 'tuscany', 'amalfi'],
  'spanyol': ['spain', 'ibiza', 'barcelona'],
  'yunani': ['greece', 'santorini'],
  'jepang': ['japan', 'kyoto', 'ryokan'],
  'bali': ['bali', 'indonesia', 'uluwatu'],
  'indonesia': ['indonesia', 'bali', 'uluwatu', 'komodo'],
  'mewah': ['luxury', 'vip', 'exclusive', 'signature', 'retreat'],
  'vip': ['luxury', 'vip', 'exclusive'],
  'santai': ['retreat', 'escape', 'meditation', 'zen', 'stay'],
  'liburan': ['retreat', 'escape', 'stay', 'package'],
  'adem': ['zen', 'meditation', 'bamboo', 'temple', 'garden'],
  'segar': ['nature', 'lavender', 'valley', 'flowers', 'oasis'],

  // English synonym expansions
  'ocean': ['sea', 'beach', 'yacht', 'sailing'],
  'marine': ['sea', 'yacht', 'sailing', 'boat'],
  'sea': ['sea', 'beach', 'yacht', 'sailing'],
  'gastronomy': ['dining', 'dinner', 'food', 'tea ceremony'],
  'cuisine': ['dining', 'dinner', 'food'],
  'food': ['dining', 'dinner', 'food'],
  'historic': ['history', 'historic', 'temple', 'pyramid'],
  'heritage': ['history', 'historic', 'culture', 'temple'],
  'cultural': ['culture', 'temple', 'tea ceremony'],
  'monument': ['pyramid', 'temple', 'history'],
  'honeymoon': ['romance', 'romantic', 'sunset'],
  'couple': ['romance', 'romantic'],
  'relax': ['retreat', 'escape', 'stay', 'meditation'],
  'peaceful': ['zen', 'meditation', 'bamboo', 'retreat']
}

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<any>(null)

  // Autofocus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!val.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    searchTimeoutRef.current = setTimeout(() => {
      const query = val.toLowerCase().trim()
      const queryWords = query.split(/\s+/).filter(Boolean)

      const expandedTags = new Set<string>()
      queryWords.forEach(word => {
        expandedTags.add(word)
        for (const [key, synonyms] of Object.entries(SEMANTIC_DICTIONARY)) {
          if (key.includes(word) || word.includes(key)) {
            synonyms.forEach(syn => expandedTags.add(syn))
          }
        }
      })

      const scored = SEARCHABLE_ITEMS.map(item => {
        let score = 0
        const matchedReasons: string[] = []

        if (item.title.toLowerCase() === query) {
          score += 150
          matchedReasons.push('Exact Match Found')
        } else if (item.title.toLowerCase().includes(query)) {
          score += 80
          matchedReasons.push('Direct Title Match')
        }

        if (item.subtitle.toLowerCase().includes(query)) {
          score += 50
          matchedReasons.push('Curated Experience match')
        }

        queryWords.forEach(word => {
          if (item.title.toLowerCase().includes(word)) score += 30
          if (item.subtitle.toLowerCase().includes(word)) score += 15
        })

        let tagMatchesCount = 0
        const matchedTags: string[] = []
        item.tags.forEach(tag => {
          if (expandedTags.has(tag)) {
            tagMatchesCount++
            matchedTags.push(tag)
          }
        })

        if (tagMatchesCount > 0) {
          score += tagMatchesCount * 25
          const labelsMap: Record<string, string> = {
            'beach': 'Coastal Sanctuary',
            'sea': 'Maritime Voyages',
            'yacht': 'Private Yacht Experience',
            'sailing': 'Ocean Sailing Cruise',
            'dining': 'Signature Fine Dining',
            'dinner': 'Sunset Culinary Curation',
            'romance': 'Romantic Getaway Curation',
            'romantic': 'Romantic Sunset Getaway',
            'sunset': 'Stunning Sunset Views',
            'history': 'Historical Exploration',
            'historic': 'Historical Discovery Tour',
            'culture': 'Immersive Cultural Stay',
            'temple': 'Zen Temple Sanctuary',
            'zen': 'Tranquil Zen Meditation',
            'meditation': 'Mindfulness & Meditation',
            'desert': 'Exotic Desert Oasis',
            'stargazing': 'Night Stargazing Tour',
            'stars': 'Stargazing Camp Tour',
            'nature': 'Scenic Nature Walk',
            'bamboo': 'Zen Bamboo Sanctuary',
            'ryokan': 'Luxury Ryokan Retreat',
            'villa': 'Exclusive Private Villa',
            'wine': 'Tuscan Wine Tasting',
            'italy': 'Mediterranean Retreat',
            'france': 'Seine Private Luxury',
            'spain': 'Spanish Sea Excursions',
            'japan': 'Japanese Heritage Stay',
            'greece': 'Cyclades Sunset Escape',
            'egypt': 'Ancient Wonders Safari',
            'indonesia': 'Tropical Bali Dinners'
          }

          const chosenLabel = matchedTags
            .map(t => labelsMap[t])
            .filter(Boolean)[0] || `${matchedTags[0].charAt(0).toUpperCase() + matchedTags[0].slice(1)} Curation`
          
          matchedReasons.push(chosenLabel)
        }

        return {
          ...item,
          score,
          matchReason: matchedReasons[0] || 'GrandCru Curation'
        }
      })
      .filter(item => (item.score || 0) > 0)
      .sort((a, b) => (b.score || 0) - (a.score || 0))

      setSearchResults(scored)
      setIsSearching(false)
    }, 280)
  }

  const handleItemSelect = (item: SearchItem) => {
    if (item.type === 'package') {
      navigate('/package-detail', { state: { package: item.originalData } })
    } else if (item.type === 'destination') {
      navigate('/destination-detail', { state: { trip: item.originalData } })
    } else if (item.type === 'highlight') {
      navigate('/inquiry', { state: { trip: item.originalData } })
    }
  }

  const groupedResults = searchResults.reduce(
    (acc, item) => {
      acc[item.type].push(item)
      return acc
    },
    { highlight: [] as SearchItem[], destination: [] as SearchItem[], package: [] as SearchItem[] }
  )

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col font-sans">
      {/* Navigation Top bar */}
      <div className="pt-8 px-6 pb-4 flex items-center gap-4 bg-brand-primary-dark sticky top-0 z-20 border-b border-brand-primary-surf/20">
        <button 
          onClick={() => navigate('/home')} 
          className="p-1 rounded-full text-brand-secondary hover:bg-neutral-bg/10 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <Input 
            ref={inputRef}
            placeholder="Search destinations, experiences..." 
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            icon={<Magnifier className="h-4 w-4 text-brand-secondary" />}
            className="bg-black/35 border-brand-primary-surf/50 text-neutral-bg placeholder:text-neutral-bg/40 focus:ring-brand-secondary focus:border-brand-secondary"
          />
        </div>
      </div>

      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Empty Input state: Show Smart Mood suggestions */}
        {!searchQuery.trim() && (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-secondary font-bold font-mono">
              <Stars className="h-4 w-4" /> AI Concierge Smart Suggestions
            </div>
            <p className="text-xs text-neutral-surface/75 leading-relaxed">
              Where does your mind wander? Tap a curated mood below or write down whatever luxury experience you have in mind.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                { label: '🌅 Romantic Sunset', query: 'romantis sunset' },
                { label: '⛵ Ocean Voyage', query: 'laut yacht' },
                { label: '⛩️ Zen & Heritage', query: 'sejarah zen' },
                { label: '🏜️ Desert Stargazing', query: 'gurun bintang' },
                { label: '🇮🇹 Italian Retreat', query: 'italia villa' }
              ].map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchChange(mood.query)}
                  className="text-xs bg-black/40 border border-brand-primary-surf/35 text-brand-secondary-light px-3.5 py-2 rounded-full hover:bg-brand-secondary/20 hover:border-brand-secondary/60 transition-all font-serif"
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading/Searching State */}
        {searchQuery.trim() && isSearching && (
          <div className="py-20 text-center text-sm text-neutral-surface/60 flex flex-col items-center gap-3">
            <Stars className="h-8 w-8 text-brand-secondary animate-spin" />
            <span className="font-serif italic text-brand-secondary-light">Curating matches matching your desires...</span>
          </div>
        )}

        {/* Results List */}
        {searchQuery.trim() && !isSearching && searchResults.length === 0 && (
          <div className="py-20 text-center text-sm text-neutral-surface/40 flex flex-col items-center gap-4">
            <Compass className="h-10 w-10 text-brand-secondary/35 animate-bounce" />
            <div className="space-y-2">
              <p className="font-semibold text-neutral-surface/80 font-serif text-lg">Tailoring custom luxury journeys</p>
              <p className="text-xs text-neutral-surface/65 max-w-[280px] mx-auto leading-relaxed">
                Even the gods are inspired. If you can't find your exact match, let Marcello Rossi personally curate this for you.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/chat')}
              className="mt-2 bg-brand-secondary hover:bg-brand-secondary-light text-brand-primary-dark font-bold text-xs px-6 py-2 rounded-full transition-all"
            >
              Ask Marcello Rossi
            </Button>
          </div>
        )}

        {searchQuery.trim() && !isSearching && searchResults.length > 0 && (
          <div className="space-y-6 pb-12">
            {/* Category: Curation Packages */}
            {groupedResults.package.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-secondary font-bold font-mono">
                  <Ticket className="h-4 w-4" /> Exclusive Packages
                </div>
                <div className="space-y-2.5">
                  {groupedResults.package.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-black/25 hover:bg-brand-secondary/15 transition-all cursor-pointer border border-brand-primary-surf/10"
                    >
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-bold text-neutral-bg truncate leading-snug">{item.title}</h5>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] bg-brand-secondary/15 text-brand-secondary px-2 py-0.5 rounded font-mono">
                            {item.matchReason}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-secondary shrink-0 pr-1">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category: Destinations */}
            {groupedResults.destination.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-secondary font-bold font-mono">
                  <MapPoint className="h-4 w-4" /> Popular Destinations
                </div>
                <div className="space-y-2.5">
                  {groupedResults.destination.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-black/25 hover:bg-brand-secondary/15 transition-all cursor-pointer border border-brand-primary-surf/10"
                    >
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-bold text-neutral-bg truncate leading-snug">{item.title}</h5>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] bg-brand-secondary/15 text-brand-secondary px-2 py-0.5 rounded font-mono">
                            {item.matchReason}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-secondary shrink-0 pr-1">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category: Highlights */}
            {groupedResults.highlight.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-secondary font-bold font-mono">
                  <Stars className="h-4 w-4" /> Experience Highlights
                </div>
                <div className="space-y-2.5">
                  {groupedResults.highlight.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-black/25 hover:bg-brand-secondary/15 transition-all cursor-pointer border border-brand-primary-surf/10"
                    >
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-bold text-neutral-bg truncate leading-snug">{item.title}</h5>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] bg-brand-secondary/15 text-brand-secondary px-2 py-0.5 rounded font-mono">
                            {item.matchReason}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs bg-brand-secondary/15 text-brand-secondary px-3 py-1 rounded font-mono font-bold tracking-wide shrink-0">Inquire</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
