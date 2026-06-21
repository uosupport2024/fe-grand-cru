import { useState, useRef, useEffect } from 'react'
import { Smartphone, Letter, ArrowLeft } from '@solar-icons/react'
import { motion, AnimatePresence } from 'motion/react'

interface ChatThread {
  id: string
  name: string
  role: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface Message {
  id: string
  sender: 'concierge' | 'user' | 'system'
  text: string
  timestamp: string
}

export default function ChatPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  // Chat History / List data
  const THREADS: ChatThread[] = [
    {
      id: 'thread-marcello',
      name: 'Marcello Rossi',
      role: 'Elite Concierge Specialist',
      avatar: 'MR',
      lastMessage: 'Bonjour Andrea, I have received your inquiry for the Kyoto Sanctuary...',
      timestamp: '10:06 AM',
      unreadCount: 1
    },
    {
      id: 'thread-support',
      name: 'Grand Cru Support',
      role: 'Global Member Desk',
      avatar: 'CS',
      lastMessage: 'Your Premium Elite Tier status is now active in all partner locations.',
      timestamp: 'Yesterday',
      unreadCount: 0
    }
  ]

  // Marcello Rossi Chat Details
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'concierge',
      text: 'Welcome to your Grand Cru Private Concierge Room, Andrea. I am Marcello Rossi, your dedicated Elite Concierge Specialist. Let me know if you would like me to curate private villas, yacht charters, or custom flight connections.',
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'system',
      text: '⚜ Custom Curation Request Submitted: Kyoto Sanctuary & Ryokan Experience (7 Days / 6 Nights)',
      timestamp: '10:05 AM'
    },
    {
      id: 'msg-3',
      sender: 'concierge',
      text: 'Bonjour Andrea, I have received your inquiry for the Kyoto Sanctuary & Ryokan Experience. I am currently customizing your flight routing (GC-772 First Class departure) and coordinating with Hoshinoya Ryokan for your private zen garden access. I will upload your bespoke itinerary details to the Journeys tab shortly. Please let me know if you would like to arrange a private helicopter transfer from Kansai Airport.',
      timestamp: '10:06 AM'
    }
  ])

  const [inputVal, setInputVal] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: inputVal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal('')

    // Simulate luxury concierge auto-response after 1.5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        sender: 'concierge',
        text: 'Received with pleasure, Andrea. I am updating your curation profile right away and will notify you when the custom flight details are locked.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, replyMsg])
    }, 1500)
  }

  // Scroll to bottom when messages list changes
  useEffect(() => {
    if (selectedThreadId) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, selectedThreadId])

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 overflow-hidden flex flex-col bg-brand-primary-dark text-neutral-bg font-sans">
      <AnimatePresence mode="wait">
        {!selectedThreadId ? (
          /* CHAT THREADS LIST VIEW */
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Scrollable Container matching other pages */}
            <div className="flex-1 overflow-y-auto pt-8 px-6 space-y-6 scrollbar-thin scrollbar-thumb-brand-secondary/20 pb-6">
              
              {/* Page Header */}
              <div className="space-y-1 text-left">
                <h1 className="text-3xl font-serif text-brand-secondary-light font-bold leading-tight">Inbox</h1>
                <p className="text-xs text-neutral-surface/60">Your direct secure lines to Grand Cru VIP Concierges.</p>
              </div>

              {/* List Content */}
              <div className="space-y-4">
                {THREADS.map(thread => (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className="p-4 rounded-3xl bg-black/40 border border-brand-primary-surf/25 hover:border-brand-secondary/40 transition-all flex items-center justify-between cursor-pointer group text-left relative overflow-hidden"
                  >
                    {/* Active background hover glow */}
                    <div className="absolute inset-0 bg-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3.5 relative z-10 min-w-0">
                      <div className="relative shrink-0">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-brand-secondary/80 to-brand-secondary-light/95 text-brand-primary-dark font-bold flex items-center justify-center font-serif text-sm border border-brand-secondary/25">
                          {thread.avatar}
                        </div>
                        {thread.unreadCount > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-brand-secondary border-2 border-brand-primary-dark flex items-center justify-center text-[7px] text-brand-primary-dark font-extrabold font-mono animate-pulse" />
                        )}
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-neutral-bg">{thread.name}</h4>
                          <span className="text-[7px] bg-brand-secondary/15 border border-brand-secondary/35 text-brand-secondary px-1.5 py-0.5 rounded font-mono uppercase font-bold tracking-wider">
                            {thread.unreadCount > 0 ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-secondary-light font-medium tracking-wide">{thread.role}</p>
                        <p className="text-[10px] text-neutral-surface/60 truncate leading-snug pt-0.5">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 relative z-10 pl-3">
                      <span className="text-[9px] text-neutral-surface/40 font-mono block">{thread.timestamp}</span>
                      {thread.unreadCount > 0 && (
                        <span className="inline-block h-2 w-2 rounded-full bg-brand-secondary mt-1.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* CONVERSATION DETAILS VIEW */
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-brand-primary-surf/20 bg-black/35 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedThreadId(null)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-neutral-surface hover:text-neutral-bg cursor-pointer shrink-0 transition-colors"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                </button>
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-full bg-brand-secondary text-brand-primary-dark font-bold flex items-center justify-center font-serif text-sm">
                    MR
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-brand-primary-dark animate-pulse" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-neutral-bg">Marcello Rossi</h3>
                  <span className="text-[9px] text-brand-secondary uppercase tracking-widest font-mono font-bold block">Elite Concierge Specialist</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-black/20 border border-brand-primary-surf/15 hover:border-brand-secondary/40 text-brand-secondary cursor-pointer">
                  <Smartphone className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Bubble Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-brand-secondary/20">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[75%] rounded-2xl p-3.5 space-y-1.5 text-xs text-left ${msg.sender === 'user'
                        ? 'self-end bg-brand-secondary text-brand-primary-dark rounded-tr-none font-medium'
                        : msg.sender === 'system'
                          ? 'self-center bg-brand-primary-surf/20 text-brand-secondary-light border border-brand-secondary/20 w-[90%] text-center rounded-xl font-semibold py-2 px-3'
                          : 'self-start bg-black/40 border border-brand-primary-surf/15 text-neutral-bg rounded-tl-none leading-relaxed font-light'
                      }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className={`block text-[8px] text-right ${msg.sender === 'user' ? 'text-brand-primary-dark/60 font-semibold' : 'text-neutral-surface/40'
                      }`}>
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3.5 border-t border-brand-primary-surf/15 bg-black/25 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Direct message Marcello..."
                className="flex-1 bg-black/40 border border-brand-primary-surf/30 rounded-full py-2.5 px-4 text-xs text-neutral-bg focus:outline-none focus:border-brand-secondary placeholder:text-neutral-bg/30"
              />
              <button
                type="submit"
                className="h-9 w-9 rounded-full bg-brand-secondary text-brand-primary-dark flex items-center justify-center hover:bg-brand-secondary-dark transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
              >
                <Letter className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
