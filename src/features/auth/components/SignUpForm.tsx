import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Lock, Letter, User, Phone, Eye, EyeClosed } from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="space-y-4 w-full"
    >
      <div className="space-y-1 text-left">
        <h2 className="text-2xl font-serif font-bold text-brand-secondary-light leading-tight tracking-wide">
          Create Account
        </h2>
        <p className="text-xs text-neutral-surface/70 leading-relaxed font-sans">
          Join Grand Cru Travelers to access elite bespoke itineraries.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-300 text-left font-sans"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-2.5">
          <Input
            type="text"
            required
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="h-4 w-4 text-brand-secondary/80" />}
            className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
          />

          <Input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Letter className="h-4 w-4 text-brand-secondary/80" />}
            className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
          />

          <Input
            type="tel"
            required
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            icon={<Phone className="h-4 w-4 text-brand-secondary/80" />}
            className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4 text-brand-secondary/80" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-brand-secondary/60 hover:text-brand-secondary transition-colors cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
            />
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="h-4 w-4 text-brand-secondary/80" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-brand-secondary/60 hover:text-brand-secondary transition-colors cursor-pointer focus:outline-none"
                >
                  {showConfirmPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full h-10 mt-2 font-serif tracking-widest text-xs uppercase font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full transition-all duration-300 shadow-lg shadow-brand-secondary/10"
          disabled={isLoading}
        >
          {isLoading ? "Creating Profile..." : "Register Membership"}
        </Button>
      </form>
    </motion.div>
  )
}
