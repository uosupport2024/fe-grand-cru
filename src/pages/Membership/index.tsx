import BottomNav from '@/components/BottomNav'

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-brand-primary-dark text-neutral-bg flex flex-col justify-between font-sans">
      <div className="flex-1 p-6 space-y-6 pb-24 text-left">
        <h1 className="text-3xl font-serif text-brand-secondary-light font-bold">Membership</h1>
        
        {/* Luxury Card */}
        <div className="w-full aspect-[1.58/1] rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-primary-surf to-[#370C08] border border-brand-secondary/30 shadow-xl flex flex-col justify-between text-neutral-text-prim">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary-dark/80">GRAND CRU CLUB</span>
              <h3 className="font-serif text-xl font-bold mt-1 text-neutral-text-prim">Signature Elite</h3>
            </div>
            <span className="text-[10px] border border-brand-primary-dark/30 rounded-full px-2 py-0.5 font-semibold">Active</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] opacity-60 block">Member Number</span>
            <span className="font-mono text-xs tracking-wider">GC-8829-1093-0182</span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-4 pt-4 border-t border-brand-primary-surf/20">
          <h3 className="font-serif text-lg text-brand-secondary-light">Exclusive Privileges</h3>
          <div className="space-y-3">
            <div className="p-3 bg-black/20 rounded-xl border border-brand-primary-surf/15 flex items-center justify-between text-xs">
              <span>Private Airport Lounges</span>
              <span className="text-brand-secondary font-bold">Unlimited</span>
            </div>
            <div className="p-3 bg-black/20 rounded-xl border border-brand-primary-surf/15 flex items-center justify-between text-xs">
              <span>Complimentary Villa Upgrades</span>
              <span className="text-brand-secondary font-bold">Available</span>
            </div>
            <div className="p-3 bg-black/20 rounded-xl border border-brand-primary-surf/15 flex items-center justify-between text-xs">
              <span>Luxury Private Transfers</span>
              <span className="text-brand-secondary font-bold">Included</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
