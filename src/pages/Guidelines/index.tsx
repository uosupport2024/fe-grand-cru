import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Magnifier,
  Heart,
  User,
  Copy,
  CheckCircle,
  Smartphone,
  Code,
  Palette,
  Tuning,
  Bookmark
} from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import brandLogo from '@/assets/logotipo_grandcrutravelers_transparente-01.webp'

// Custom Logo component
const GrandCruLogo = ({ className = "h-8" }: { className?: string }) => (
  <img 
    src={brandLogo} 
    alt="Grand Cru Travelers" 
    className={className} 
  />
)

export default function GuidelinesPage() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  
  // Playground state
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost'>('primary')
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [badgeVariant, setBadgeVariant] = useState<'outline' | 'primary' | 'secondary' | 'success'>('outline')
  const [switchChecked, setSwitchChecked] = useState(true)
  const [sliderOpacity, setSliderOpacity] = useState(35) // 0.35 overlay

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedValue(label)
    setTimeout(() => setCopiedValue(null), 2000)
  }

  // Brand color groups
  const colorPalette = {
    primary: [
      { name: 'Primary Brand', hex: '#5A0E14', desc: 'Main burgundy accent, premium identity', tailwind: 'bg-brand-primary' },
      { name: 'Primary Dark', hex: '#370C08', desc: 'Darkest burgundy variant for deep contrast', tailwind: 'bg-brand-primary-dark' },
      { name: 'Primary Surface', hex: '#A37863', desc: 'Warm tan earth tone surface/tint', tailwind: 'bg-brand-primary-surf' },
    ],
    secondary: [
      { name: 'Secondary Gold', hex: '#D1A672', desc: 'Warm gold/sand for highlights', tailwind: 'bg-brand-secondary' },
      { name: 'Secondary Light', hex: '#E7D2BC', desc: 'Creamy sand background/accent', tailwind: 'bg-brand-secondary-light' },
      { name: 'Secondary Dark', hex: '#8E542B', desc: 'Rich copper/brown', tailwind: 'bg-brand-secondary-dark' },
    ],
    accents: [
      { name: 'Accent Gold', hex: '#D1A672', desc: 'High emphasis highlights', tailwind: 'bg-accent-gold' },
      { name: 'Accent Copper', hex: '#8E542B', desc: 'Medium emphasis accents', tailwind: 'bg-accent-copper' },
      { name: 'Accent Clay', hex: '#5F311C', desc: 'Earthy contrast accent', tailwind: 'bg-accent-clay' },
    ],
    neutrals: [
      { name: 'Background', hex: '#F5EFE8', desc: 'Main soft cream layout backplate', tailwind: 'bg-neutral-bg' },
      { name: 'Surface', hex: '#E7D2BC', desc: 'Component and block backgrounds', tailwind: 'bg-neutral-surface' },
      { name: 'Border', hex: '#D8C7B6', desc: 'Sleek separators & structural line boundaries', tailwind: 'bg-neutral-border' },
      { name: 'Text Primary', hex: '#2B1A16', desc: 'High readability charcoal text', tailwind: 'text-neutral-text-prim' },
      { name: 'Text Secondary', hex: '#6D5B52', desc: 'Muted descriptive texts', tailwind: 'text-neutral-text-sec' },
    ],
    status: [
      { name: 'Success', hex: '#4E7A56', desc: 'Positive feedback state', tailwind: 'bg-status-success' },
      { name: 'Warning', hex: '#C28A3D', desc: 'Alert / cautionary state', tailwind: 'bg-status-warning' },
      { name: 'Error', hex: '#B44B4B', desc: 'Critical error / issue state', tailwind: 'bg-status-error' },
    ]
  }

  // Code templates
  const buttonCode = `<Button variant="${btnVariant}" size="${btnSize}">
  Explorar viajes
</Button>`

  const badgeCode = `<Badge variant="${badgeVariant}">
  Aventura
</Badge>`

  const cardCode = `<Card className="max-w-xs">
  <CardImage 
    src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538" 
    alt="AlUla" 
    aspect="portrait"
  />
  <CardContent>
    <CardTitle>Experiencia privada AlUla</CardTitle>
    <CardDescription>Desde €1,950</CardDescription>
  </CardContent>
</Card>`

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col antialiased selection:bg-brand-secondary/40">
      {/* Dynamic Toast System */}
      {copiedValue && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-brand-primary text-neutral-bg px-4 py-3 rounded-xl shadow-xl border border-brand-secondary/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="h-4 w-4 text-brand-secondary animate-bounce" />
          <span className="text-xs font-medium">Copied <span className="text-brand-secondary font-bold font-mono">{copiedValue}</span> to clipboard!</span>
        </div>
      )}

      {/* Hero Header */}
      <header className="relative py-16 px-6 md:px-12 border-b border-brand-primary-surf/20 overflow-hidden bg-gradient-to-b from-black/40 to-transparent">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D1A672_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-secondary/20 bg-brand-secondary/5 text-xs text-brand-secondary font-medium tracking-wide">
              <span>Mobile App Design System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-neutral-bg font-extrabold tracking-tight leading-none">
              GRAND CRU TRAVELERS
            </h1>
            <p className="text-lg text-neutral-bg/75 max-w-2xl font-light leading-relaxed">
              An elegant design language crafted for high-end luxury adventures. Explore harmonious palettes, premium typography rules, asset criteria, and solar-icon integrated React components.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="inline-flex items-center gap-2 bg-white/10 border border-brand-primary-surf/30 text-neutral-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/20 transition-all active:scale-[0.98]">
              <User className="h-4 w-4" /> Go to Login Page
            </Link>
            <a href="#playground" className="inline-flex items-center gap-2 bg-brand-secondary text-brand-primary-dark hover:bg-brand-secondary-dark hover:text-neutral-bg px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm active:scale-[0.98]">
              <Code className="h-4 w-4" /> Component Playground
            </a>
          </div>
        </div>
      </header>

      {/* Grid of Sections */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-24 flex-1">
        
        {/* Section: Color Palette */}
        <section id="colors" className="space-y-8">
          <div className="flex items-center justify-between border-brand-primary-surf/20 pb-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-serif font-bold text-neutral-bg flex items-center gap-2">
                <Palette className="h-6 w-6 text-brand-secondary" /> Brand Color Palette
              </h2>
              <p className="text-sm text-neutral-bg/65">Interactive swatches. Click to copy hex value.</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-bg/65">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-primary"></span> 20% Primary</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-secondary"></span> 10% Accent</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-neutral-bg"></span> 70% Neutral</span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Color Groups */}
            {(Object.keys(colorPalette) as Array<keyof typeof colorPalette>).map((groupName) => (
              <div key={groupName} className="space-y-4">
                <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-brand-secondary border-l-2 border-brand-secondary pl-2">
                  {groupName} Palette
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorPalette[groupName].map((color) => (
                    <div
                      key={color.name}
                      onClick={() => handleCopy(color.hex, color.name)}
                      className="group cursor-pointer bg-black/35 rounded-2xl border border-brand-primary-surf/20 overflow-hidden flex shadow-sm hover:shadow-md hover:border-brand-secondary/35 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className={`w-24 h-24 shrink-0 transition-transform group-hover:scale-95 duration-300 m-2 rounded-xl`} style={{ backgroundColor: color.hex }} />
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-neutral-bg">{color.name}</span>
                            <Copy className="h-3.5 w-3.5 text-neutral-bg/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-xs text-neutral-bg/60 mt-1 line-clamp-2">{color.desc}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <code className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded text-brand-secondary font-semibold">
                            {color.hex}
                          </code>
                          <span className="text-[10px] font-mono text-neutral-bg/40">
                            {color.tailwind}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Typography & Ratios */}
        <section id="typography" className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-brand-primary-surf/20">
          {/* Typography */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-neutral-bg">Typography</h2>
            <div className="bg-black/25 rounded-2xl border border-brand-primary-surf/20 p-8 space-y-8">
              <div className="space-y-2 pb-6 border-b border-brand-primary-surf/20">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-serif text-brand-secondary-light">Aa</span>
                  <span className="text-xs text-neutral-bg/60 font-mono">Playfair Display SemiBold</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-bg">Headings</h3>
                <p className="text-xs text-neutral-bg/60">Used for destinations, titles, hero titles, screen headings. Conveying luxury, custom craftsmanship, and elegant character.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-sans text-neutral-bg/85">Aa</span>
                  <span className="text-xs text-neutral-bg/60 font-mono">Inter Regular</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-bg">Body & UI Details</h3>
                <p className="text-xs text-neutral-bg/60">Used for body descriptions, chip tags, prices, navigation links, search inputs. Extremely legible, clean, and modern layout balance.</p>
              </div>

              {/* Sample */}
              <div className="p-6 bg-brand-primary/20 rounded-xl space-y-3 border border-brand-primary-surf/10">
                <h4 className="font-serif text-2xl text-brand-secondary-light">Diseñamos viajes extraordinarios</h4>
                <p className="font-sans text-sm text-neutral-bg/75 leading-relaxed">
                  Creamos experiences de viaje personalizadas con atención al detalle, servicio excepcional y acceso unique.
                </p>
              </div>
            </div>
          </div>

          {/* Image Guidelines */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-neutral-bg flex items-center gap-2">
              <Tuning className="h-6 w-6 text-brand-secondary" /> Image & Design Ratio
            </h2>
            <div className="bg-black/25 rounded-2xl border border-brand-primary-surf/20 p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-wider text-brand-secondary font-bold">Photography Guidelines</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <div className="h-16 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=150&q=80')]"></div>
                    <p className="text-[10px] text-center text-neutral-bg/60">Warmth: High</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-16 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=150&q=80')]"></div>
                    <p className="text-[10px] text-center text-neutral-bg/60">Contrast: Medium</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-16 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=150&q=80')]"></div>
                    <p className="text-[10px] text-center text-neutral-bg/60">Saturation: Low</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-16 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=150&q=80')]"></div>
                    <p className="text-[10px] text-center text-neutral-bg/60">Exposure: Bright</p>
                  </div>
                </div>
              </div>

              {/* Crop Ratio & Gradient overlay demo */}
              <div className="space-y-3 pt-4 border-t border-brand-primary-surf/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-bg">Hero Mobile Crop Ratio: 4:5 (1080 x 1350 px)</span>
                  <span className="text-neutral-bg/60">Interactive Overlay Slider</span>
                </div>
                <div className="flex gap-4">
                  {/* Aspect Demo */}
                  <div className="w-1/2 aspect-[4/5] rounded-xl overflow-hidden relative border border-brand-primary-surf/30 bg-black/45 group">
                    <img 
                      src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80" 
                      alt="Petra landscape" 
                      className="absolute inset-0 object-cover w-full h-full"
                    />
                    {/* Gradient overlay */}
                    <div 
                      className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300"
                      style={{
                        background: `linear-gradient(to bottom, rgba(55,12,8,${(sliderOpacity * 0.5) / 100}) 0%, rgba(55,12,8,${sliderOpacity / 100}) 100%)`
                      }}
                    >
                      <h4 className="font-serif text-white text-base leading-tight">Viajes a medida, experiences inolvidables</h4>
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="w-1/2 flex flex-col justify-center gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-bg/65 flex justify-between">
                        <span>Overlay Alpha:</span>
                        <span className="font-bold font-mono text-brand-secondary">{(sliderOpacity / 100).toFixed(2)}</span>
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="85" 
                        value={sliderOpacity}
                        onChange={(e) => setSliderOpacity(Number(e.target.value))}
                        className="w-full h-1 bg-brand-primary-surf/35 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-bg/60 block">Current gradient formula:</span>
                      <code className="text-[9px] block bg-black/40 p-2 rounded-lg break-all font-mono leading-normal text-brand-secondary-light">
                        background: linear-gradient(to bottom, rgba(55,12,8,{(sliderOpacity * 0.5 / 100).toFixed(2)}) 0%, rgba(55,12,8,{(sliderOpacity / 100).toFixed(2)}) 100%)
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Component Playground */}
        <section id="playground" className="space-y-6 pt-8 border-t border-brand-primary-surf/20">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif font-bold text-neutral-bg flex items-center gap-2">
              <Code className="h-6 w-6 text-brand-secondary" /> Shadcn Component Playground
            </h2>
            <p className="text-sm text-neutral-bg/65">Live testing arena. Modify settings, verify visual output, and copy copy-pasteable shadcn-like code structure.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Board */}
            <div className="bg-black/25 border border-brand-primary-surf/20 rounded-2xl p-6 space-y-6">
              <h3 className="font-serif font-bold text-lg border-b border-brand-primary-surf/20 pb-2 text-brand-secondary">Properties Editor</h3>
              
              {/* Button controllers */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-bg/60 block">Button Config</label>
                <div className="space-y-2">
                  <div className="text-xs text-neutral-bg/60">Variant</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['primary', 'secondary', 'outline', 'ghost'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setBtnVariant(v as any)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          btnVariant === v 
                            ? 'bg-brand-secondary text-brand-primary-dark border-transparent font-medium' 
                            : 'border-brand-primary-surf/35 text-neutral-bg/75 hover:bg-white/5'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-neutral-bg/60">Size</div>
                  <div className="flex gap-1.5">
                    {['sm', 'md', 'lg'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setBtnSize(s as any)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          btnSize === s 
                            ? 'bg-brand-secondary text-brand-primary-dark border-transparent font-medium' 
                            : 'border-brand-primary-surf/35 text-neutral-bg/75 hover:bg-white/5'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tag controller */}
              <div className="space-y-3 pt-4 border-t border-brand-primary-surf/20">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-bg/60 block">Badge Config</label>
                <div className="flex flex-wrap gap-1.5">
                  {['outline', 'primary', 'secondary', 'success'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setBadgeVariant(v as any)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        badgeVariant === v 
                          ? 'bg-brand-secondary text-brand-primary-dark border-transparent font-medium' 
                          : 'border-brand-primary-surf/35 text-neutral-bg/75 hover:bg-white/5'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Switch controller */}
              <div className="space-y-3 pt-4 border-t border-brand-primary-surf/20">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-bg/60">Switch Config</label>
                  <Switch checked={switchChecked} onChange={setSwitchChecked} />
                </div>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="bg-black/25 border border-brand-primary-surf/20 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg border-b border-brand-primary-surf/20 pb-2 text-brand-secondary">Visual Sandbox</h3>
                <span className="text-[10px] text-neutral-bg/60">Live interactives</span>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-6 py-6 bg-brand-primary-dark/30 rounded-xl border border-brand-primary-surf/10">
                {/* Button Live */}
                <div className="flex flex-col items-center gap-1.5 w-full px-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-bg/40">Button component</span>
                  <Button variant={btnVariant} size={btnSize}>
                    Explorar viajes
                  </Button>
                </div>

                {/* Badge Live */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-bg/40">Badge component</span>
                  <Badge variant={badgeVariant}>Aventura</Badge>
                </div>

                {/* Switch Live */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-bg/40">Switch component</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-bg/60">Status: {switchChecked ? "On" : "Off"}</span>
                    <Switch checked={switchChecked} onChange={setSwitchChecked} />
                  </div>
                </div>
              </div>
            </div>

            {/* Code Board */}
            <div className="bg-black/45 border border-brand-primary-surf/20 text-neutral-bg rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Code className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-brand-primary-surf/20 pb-2">
                  <h3 className="font-serif font-bold text-lg text-brand-secondary">Implementation Code</h3>
                  <span className="text-[10px] text-neutral-bg/50">Fully compatible React snippet</span>
                </div>
                
                {/* Code viewport */}
                <div className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-brand-secondary/70">
                      <span>BUTTON</span>
                      <button onClick={() => handleCopy(buttonCode, "Button Code")} className="hover:text-white transition-colors cursor-pointer">
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <pre className="bg-black/25 p-3 rounded-lg overflow-x-auto text-[11px] leading-relaxed text-neutral-bg/95">
                      {buttonCode}
                    </pre>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-brand-secondary/70">
                      <span>BADGE</span>
                      <button onClick={() => handleCopy(badgeCode, "Badge Code")} className="hover:text-white transition-colors cursor-pointer">
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <pre className="bg-black/25 p-3 rounded-lg overflow-x-auto text-[11px] leading-relaxed text-neutral-bg/95">
                      {badgeCode}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-primary-surf/20 mt-4 flex items-center justify-between relative z-10">
                <span className="text-[10px] text-neutral-bg/40">Includes full Tailwind compilation</span>
                <button onClick={() => handleCopy(cardCode, "Card Code")} className="inline-flex items-center gap-1.5 text-xs text-brand-secondary hover:underline cursor-pointer">
                  Copy Card Code <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Live Mobile Simulator (Light vs Dark Side-by-Side) */}
        <section id="simulator" className="space-y-6 pt-8 border-t border-brand-primary-surf/20">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif font-bold text-neutral-bg flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-brand-secondary" /> Live Mobile Simulator (Solar Icons)
            </h2>
            <p className="text-sm text-neutral-bg/65">A dynamic simulation of the mobile screens using Solar Icons for premium travel layout fidelity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* LIGHT THEME PHONE */}
            <div className="space-y-4">
              <h3 className="text-center font-sans font-bold text-xs uppercase tracking-widest text-neutral-bg/60">
                Light Theme Example
              </h3>
              <div className="mx-auto max-w-[360px] aspect-[9/19] rounded-[48px] border-[10px] border-neutral-text-prim bg-neutral-bg shadow-2xl overflow-hidden flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-neutral-text-prim flex justify-between items-center px-6 text-[10px] text-neutral-bg z-30 font-sans">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-3 border border-neutral-bg/50 rounded-sm bg-neutral-bg"></span>
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 pt-8 pb-16 px-4 overflow-y-auto space-y-6 flex flex-col justify-between">
                  {/* App Header */}
                  <div className="flex justify-between items-center">
                    <GrandCruLogo className="text-lg" />
                    <Button variant="ghost" size="sm" className="px-2 py-1"><Tuning className="h-4 w-4" /></Button>
                  </div>

                  {/* Welcome block */}
                  <div className="space-y-1 text-left">
                    <h4 className="font-serif text-2xl text-neutral-text-prim font-bold leading-tight">Hola, Andrea</h4>
                    <p className="text-xs text-neutral-text-sec">¿A dónde te gustaría viajar?</p>
                  </div>

                  {/* Search Input */}
                  <Input 
                    placeholder="Buscar destinos, experiencias..." 
                    icon={<Magnifier className="h-4 w-4 text-brand-primary" />}
                  />

                  {/* Tag Chips */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-text-prim">Filtros</span>
                      <span className="text-[10px] text-brand-primary hover:underline cursor-pointer">Ver todo</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="border-brand-primary/20 bg-brand-secondary-light/40">Cultural</Badge>
                      <Badge variant="outline">Aventura</Badge>
                      <Badge variant="primary" className="bg-brand-primary text-neutral-bg">Lujo</Badge>
                      <Badge variant="outline">Gastronomía</Badge>
                    </div>
                  </div>

                  {/* Card showcase */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-text-prim">Destinos recomendados</span>
                      <span className="text-[10px] text-brand-primary hover:underline cursor-pointer">Ver todo</span>
                    </div>
                    
                    <Card className="bg-white/80 border-neutral-border/60">
                      <CardImage 
                        src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=350&q=80" 
                        alt="Arabia Saudita"
                        aspect="video"
                      />
                      <CardContent className="p-3">
                        <CardTitle className="text-sm font-serif">Experiencia privada AlUla</CardTitle>
                        <CardDescription className="text-[10px]">Arabia Saudita • Luxury Private Tour</CardDescription>
                        <CardFooter className="mt-2 pt-2 border-neutral-border/20">
                          <span className="text-xs font-bold text-brand-primary-dark">Desde €1,950</span>
                          <Bookmark className="h-4 w-4 text-brand-primary cursor-pointer hover:fill-brand-primary transition-all" />
                        </CardFooter>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-neutral-surface border-t border-neutral-border/60 flex items-center justify-around px-4 z-20">
                  <div className="flex flex-col items-center text-brand-primary cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5 font-bold">Inicio</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-text-sec cursor-pointer hover:text-brand-primary transition-colors">
                    <Magnifier className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Viajes</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-text-sec cursor-pointer hover:text-brand-primary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Favoritos</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-text-sec cursor-pointer hover:text-brand-primary transition-colors">
                    <User className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Perfil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DARK THEME PHONE */}
            <div className="space-y-4">
              <h3 className="text-center font-sans font-bold text-xs uppercase tracking-widest text-neutral-bg/60">
                Dark Theme Example
              </h3>
              <div className="mx-auto max-w-[360px] aspect-[9/19] rounded-[48px] border-[10px] border-neutral-text-prim bg-brand-primary-dark shadow-2xl overflow-hidden flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-neutral-text-prim flex justify-between items-center px-6 text-[10px] text-neutral-bg z-30 font-sans">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-3 border border-neutral-bg/50 rounded-sm bg-neutral-bg"></span>
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 pt-8 pb-16 px-4 overflow-y-auto space-y-6 flex flex-col justify-between">
                  {/* App Header */}
                  <div className="flex justify-between items-center">
                    <GrandCruLogo className="h-6 w-auto object-contain" />
                    <Button variant="ghost" size="sm" className="px-2 py-1 text-brand-secondary hover:bg-neutral-bg/10"><Tuning className="h-4 w-4" /></Button>
                  </div>

                  {/* Welcome block */}
                  <div className="space-y-1 text-left">
                    <h4 className="font-serif text-2xl text-brand-secondary-light font-bold leading-tight">Hola, Andrea</h4>
                    <p className="text-xs text-neutral-surface/80">¿A dónde te gustaría viajar?</p>
                  </div>

                  {/* Search Input */}
                  <Input 
                    placeholder="Buscar destinos, experiencias..." 
                    icon={<Magnifier className="h-4 w-4 text-brand-secondary" />}
                    className="bg-black/35 border-brand-primary-surf/50 text-neutral-bg placeholder:text-neutral-bg/40 focus:ring-brand-secondary focus:border-brand-secondary"
                  />

                  {/* Tag Chips */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-brand-secondary-light">Filtros</span>
                      <span className="text-[10px] text-brand-secondary hover:underline cursor-pointer">Ver todo</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="border-brand-primary-surf/40 bg-black/20 text-neutral-bg">Cultural</Badge>
                      <Badge variant="outline" className="border-brand-primary-surf/40 bg-black/20 text-neutral-bg">Aventura</Badge>
                      <Badge variant="primary" className="bg-brand-secondary text-neutral-text-prim font-semibold">Lujo</Badge>
                      <Badge variant="outline" className="border-brand-primary-surf/40 bg-black/20 text-neutral-bg">Gastronomía</Badge>
                    </div>
                  </div>

                  {/* Card showcase */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-brand-secondary-light">Destinos recomendados</span>
                      <span className="text-[10px] text-brand-secondary hover:underline cursor-pointer">Ver todo</span>
                    </div>
                    
                    <Card className="bg-black/40 border-brand-primary-surf/30">
                      <CardImage 
                        src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=350&q=80" 
                        alt="Toscana Italia"
                        aspect="video"
                      />
                      <CardContent className="p-3">
                        <CardTitle className="text-sm font-serif text-brand-secondary-light">Villa privada en Toscana</CardTitle>
                        <CardDescription className="text-[10px] text-neutral-surface/60">Italia • Exclusive Retreat</CardDescription>
                        <CardFooter className="mt-2 pt-2 border-brand-primary-surf/20">
                          <span className="text-xs font-bold text-brand-secondary">Desde €2,450</span>
                          <Bookmark className="h-4 w-4 text-brand-secondary cursor-pointer hover:fill-brand-secondary transition-all" />
                        </CardFooter>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-brand-primary-dark border-t border-brand-primary-surf/20 flex items-center justify-around px-4 z-20">
                  <div className="flex flex-col items-center text-brand-secondary cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5 font-bold">Inicio</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-surface/60 cursor-pointer hover:text-brand-secondary transition-colors">
                    <Magnifier className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Viajes</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-surface/60 cursor-pointer hover:text-brand-secondary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Favoritos</span>
                  </div>
                  <div className="flex flex-col items-center text-neutral-surface/60 cursor-pointer hover:text-brand-secondary transition-colors">
                    <User className="h-4 w-4" />
                    <span className="text-[9px] mt-0.5">Perfil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 text-neutral-bg/60 border-t border-brand-primary-surf/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <GrandCruLogo className="text-brand-secondary text-2xl" />
            <p className="text-xs">© 2026 Grand Cru Travelers. All rights reserved. Designed for luxury travel experiences.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#colors" className="hover:text-brand-secondary transition-colors">Color Tokens</a>
            <a href="#typography" className="hover:text-brand-secondary transition-colors">Typography rules</a>
            <a href="#playground" className="hover:text-brand-secondary transition-colors">Playground</a>
            <a href="#simulator" className="hover:text-brand-secondary transition-colors">Simulators</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
