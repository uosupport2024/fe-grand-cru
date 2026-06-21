import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Lock, Letter, Eye, EyeClosed } from '@solar-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-5 w-full"
    >
      <div className="space-y-1.5 text-left">
        <h2 className="text-2xl font-serif font-bold text-brand-secondary-light leading-tight tracking-wide">
          Sign In
        </h2>
        <p className="text-xs text-neutral-surface/70 leading-relaxed font-sans">
          Enter your credentials to unlock your personalized world of bespoke itineraries.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-300 text-left font-sans"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Letter className="h-4 w-4 text-brand-secondary/80" />}
              className="bg-black/45 border-brand-primary-surf/30 text-neutral-bg placeholder:text-neutral-bg/35 focus:ring-brand-secondary/70 focus:border-brand-secondary/70 rounded-full text-xs font-sans h-12"
            />
          </div>

          <div className="space-y-1">
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
            <div className="flex justify-end pt-1">
              <a
                href="#"
                className="text-[10px] text-brand-secondary/80 hover:text-brand-secondary hover:underline transition-colors font-sans"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full h-10 mt-2 font-serif tracking-widest text-xs uppercase font-bold text-neutral-text-prim bg-brand-secondary hover:bg-brand-secondary-dark rounded-full transition-all duration-300 shadow-lg shadow-brand-secondary/10"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-3 w-3 text-neutral-text-prim" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying Credentials...
            </span>
          ) : (
            "Authenticate Session"
          )}
        </Button>
      </form>

      <div className="text-center mt-4">
        <span className="text-[10px] text-neutral-surface/60 font-sans">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-secondary font-medium hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </motion.div>
  )
}

