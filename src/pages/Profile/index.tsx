import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BottomNav from '@/components/BottomNav'

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans pb-16">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-8 text-left">
        {/* Page Header */}
        <h1 className="text-3xl font-serif text-brand-secondary-light font-bold">Profile</h1>

        {/* User Card - Luxury Embossed Card with subtle glass glow */}
        <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-black/50 to-brand-primary-dark/90 border border-brand-secondary/20 shadow-2xl flex items-center justify-between group">
          {/* Decorative gold backdrop glow */}
          <div className="absolute -right-12 -top-12 w-28 h-28 rounded-full bg-brand-secondary/5 blur-2xl group-hover:bg-brand-secondary/10 transition-all"></div>

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-secondary to-brand-secondary-light text-brand-primary-dark font-serif text-2xl font-bold flex items-center justify-center shadow-lg border border-brand-secondary/20">
              A
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-neutral-bg leading-tight">Andrea Del Villar</h3>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Premium Elite Tier</span>
              </div>
            </div>
          </div>

          <span className="text-[8px] bg-brand-secondary/15 border border-brand-secondary/30 rounded-full px-2.5 py-1 text-brand-secondary font-mono tracking-wider font-bold">
            CLUB MEMBER
          </span>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-black/25 p-3 rounded-2xl border border-brand-primary-surf/10 text-center">
            <span className="text-[9px] uppercase tracking-wider text-neutral-surface/50 block">Journeys</span>
            <span className="text-sm font-serif font-bold text-neutral-bg mt-1 block">12</span>
          </div>
          <div className="bg-black/25 p-3 rounded-2xl border border-brand-primary-surf/10 text-center">
            <span className="text-[9px] uppercase tracking-wider text-neutral-surface/50 block">Saved Places</span>
            <span className="text-sm font-serif font-bold text-neutral-bg mt-1 block">24</span>
          </div>
          <div className="bg-black/25 p-3 rounded-2xl border border-brand-primary-surf/10 text-center">
            <span className="text-[9px] uppercase tracking-wider text-neutral-surface/50 block">Concierge Level</span>
            <span className="text-sm font-serif font-bold text-brand-secondary mt-1 block">Elite</span>
          </div>
        </div>

        {/* Section: Account Settings */}
        <div className="space-y-2.5">
          <span className="text-[9px] uppercase tracking-wider text-brand-secondary/70 font-bold block pl-1">Personal Portfolio</span>
          <div className="bg-black/15 rounded-2xl border border-brand-primary-surf/15 divide-y divide-brand-primary-surf/10 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-neutral-surface/90">Personal Details</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors" onClick={() => navigate('/membership')}>
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="text-neutral-surface/90">Club Membership Perks</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-neutral-surface/90">Saved Payment Methods</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>
          </div>
        </div>

        {/* Section: Custom Travel Settings */}
        <div className="space-y-2.5">
          <span className="text-[9px] uppercase tracking-wider text-brand-secondary/70 font-bold block pl-1">Travel Preferences</span>
          <div className="bg-black/15 rounded-2xl border border-brand-primary-surf/15 divide-y divide-brand-primary-surf/10 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-neutral-surface/90">Dietary & Seating Curation</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10.5 10.5 0 0114.14 0M1.34 8.344a16.5 16.5 0 0121.32 0" />
                </svg>
                <span className="text-neutral-surface/90">Notification Channels</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 transition-colors" onClick={() => navigate('/guide')}>
              <div className="flex items-center gap-3">
                <svg className="h-4.5 w-4.5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-neutral-surface/90">Design Guidelines Dashboard</span>
              </div>
              <span className="text-brand-secondary/60">→</span>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          onClick={() => navigate('/login')}
          variant="outline"
          className="w-full h-11 border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary-dark rounded-full mt-4 text-xs font-serif uppercase tracking-widest font-bold shadow-lg transition-all"
        >
          Sign Out
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
