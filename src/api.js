import seed from './mock-data.json'

const STORAGE_KEY = 'consultHubDemoData'
const SESSION_KEY = 'consultHubDemoUser'

const clone = (value) => JSON.parse(JSON.stringify(value))

function loadStore() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (_) {}
  const fresh = clone(seed)
  fresh.messages = fresh.messages || {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  return fresh
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  return store
}

function currentUser() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch (_) { return null }
}

function requireUser() {
  const user = currentUser()
  if (!user) throw new Error('Please log in first.')
  return user
}

const categoryKeywords = {
  Resume: ['resume', 'cv', 'linkedin', 'portfolio', 'profile'],
  Interview: ['interview', 'hr round', 'technical round', 'mock interview'],
  Projects: ['project', 'github', 'capstone', 'build', 'full stack', 'mern'],
  'Job Search': ['job', 'placement', 'company', 'application', 'job search'],
  Internships: ['internship', 'intern', 'summer internship', 'trainee'],
  Skills: ['skill', 'dsa', 'coding', 'javascript', 'java', 'react', 'learn'],
  Exams: ['exam', 'semester', 'test', 'subject', 'ignou'],
  Courses: ['course', 'degree', 'college', 'education', 'certification'],
  Career: ['career', 'switch', 'future', 'role', 'career path']
}

function classify(problem) {
  const text = problem.toLowerCase()
  const scores = Object.entries(categoryKeywords).map(([category, words]) => [
    category,
    words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0)
  ]).sort((a, b) => b[1] - a[1])
  const [category, score] = scores[0]
  const confidence = score ? Math.min(0.96, 0.58 + score * 0.1) : 0.55
  return { category: score ? category : 'Career', confidence }
}

function mentorMatches(category, problem) {
  const store = loadStore()
  const text = problem.toLowerCase()
  const mentors = store.mentors.map((mentor) => {
    let score = 0
    if (mentor.categories.includes(category)) score += 10
    mentor.categories.forEach((cat) => {
      ;(categoryKeywords[cat] || []).forEach((word) => { if (text.includes(word)) score += 2 })
    })
    if (mentor.verified) score += 3
    score += Number(mentor.rating || 0)
    return { mentor, score }
  }).sort((a, b) => b.score - a.score)
  return mentors.slice(0, 4).map((x) => x.mentor)
}

function enrichBooking(booking, store) {
  return { ...booking, mentor: store.mentors.find((m) => m.id === booking.mentorId) || null }
}

export const api = {
  register: async ({ name, email, password, role = 'student' }) => {
    const store = loadStore()
    const normalized = email.trim().toLowerCase()
    if (store.users.some((u) => u.email === normalized)) throw new Error('An account with this email already exists.')
    const user = { id: `u-${Date.now()}`, name, email: normalized, password, role, credits: 1500 }
    store.users.push(user)
    store.saved[user.id] = []
    store.messages[user.id] = []
    saveStore(store)
    const safe = { ...user }; delete safe.password
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe))
    return safe
  },

  login: async ({ email, password }) => {
    const store = loadStore()
    const user = store.users.find((u) => u.email === email.trim().toLowerCase() && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    const safe = { ...user }; delete safe.password
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe))
    return safe
  },

  me: async () => {
    const user = currentUser()
    if (!user) throw new Error('Not logged in.')
    return user
  },

  logout: () => localStorage.removeItem(SESSION_KEY),

  mentors: async (params = {}) => {
    const store = loadStore()
    return store.mentors.filter((m) => params.verified === undefined || String(m.verified) === String(params.verified))
  },

  match: async (problem) => {
    const triage = classify(problem)
    return { triage, mentors: mentorMatches(triage.category, problem) }
  },

  saved: async () => {
    const user = requireUser()
    const store = loadStore()
    const ids = store.saved[user.id] || []
    return ids.map((id) => store.mentors.find((m) => m.id === id)).filter(Boolean)
  },

  toggleSaved: async (mentorId) => {
    const user = requireUser()
    const store = loadStore()
    const ids = store.saved[user.id] || []
    store.saved[user.id] = ids.includes(mentorId) ? ids.filter((id) => id !== mentorId) : [...ids, mentorId]
    saveStore(store)
    return { saved: store.saved[user.id].includes(mentorId) }
  },

  createBooking: async ({ mentorId, startsAt, duration = 15 }) => {
    const user = requireUser()
    const store = loadStore()
    const mentor = store.mentors.find((m) => m.id === mentorId)
    if (!mentor) throw new Error('Mentor not found.')
    if (!mentor.verified) throw new Error('Only verified mentors can be booked.')
    if (![10, 15].includes(Number(duration))) throw new Error('Choose a 10 or 15 minute consultation.')
    const start = new Date(startsAt).getTime()
    const clash = store.bookings.some((b) => b.userId === user.id && b.status !== 'cancelled' && Math.abs(new Date(b.startsAt).getTime() - start) < 15 * 60 * 1000)
    if (clash) throw new Error('You already have a session around this time.')
    const booking = {
      id: `b-${Date.now()}`,
      userId: user.id,
      mentorId,
      startsAt,
      duration: Number(duration),
      status: 'pending',
      paymentId: null,
      createdAt: new Date().toISOString()
    }
    store.bookings.push(booking)
    saveStore(store)
    return { booking: enrichBooking(booking, store) }
  },

  confirmPayment: async (bookingId) => {
    const user = requireUser()
    const store = loadStore()
    const booking = store.bookings.find((b) => b.id === bookingId && b.userId === user.id)
    if (!booking) throw new Error('Booking not found.')
    booking.status = 'confirmed'
    booking.paymentId = `DEMO_PAYMENT_${Date.now()}`
    booking.roomId = `DEMO_ROOM_${booking.id}`
    saveStore(store)
    return { booking: enrichBooking(booking, store) }
  },

  bookings: async () => {
    const user = requireUser()
    const store = loadStore()
    return store.bookings.filter((b) => b.userId === user.id).map((b) => enrichBooking(b, store))
  },

  startSession: async (bookingId) => {
    const user = requireUser()
    const store = loadStore()
    const booking = store.bookings.find((b) => b.id === bookingId && b.userId === user.id)
    if (!booking) throw new Error('Booking not found.')
    booking.status = 'active'
    saveStore(store)
    return { booking: enrichBooking(booking, store) }
  },

  messages: async (mentorId) => {
    const user = requireUser()
    const store = loadStore()
    return store.messages[user.id] || []
  },

  sendMessage: async (mentorId, text) => {
    const user = requireUser()
    const store = loadStore()
    const threads = store.messages[user.id] || []
    let thread = threads.find((t) => t.mentorId === mentorId)
    if (!thread) {
      thread = { id: `t-${Date.now()}`, mentorId, unread: 0, msgs: [] }
      threads.push(thread)
    }
    thread.msgs.push({ me: true, t: text, ts: Date.now() })
    saveStore(store)
    return { message: thread.msgs[thread.msgs.length - 1] }
  },

  feedback: async (bookingId, rating, text = '') => ({ bookingId, rating, text, saved: true })
}

export function mentorToCard(m) {
  return {
    ...m,
    id: m.id || m._id,
    cat: m.categories?.[0] || 'Career',
    rate: m.rate15,
    rating: Number(m.rating || 0).toFixed(1),
    bio: m.bio || 'Verified student mentor.',
    online: !!m.online,
    verified: !!m.verified,
    credentials: m.credentials || []
  }
}

export function bookingToSession(b) {
  const at = new Date(b.startsAt).getTime()
  return {
    id: b.id || b._id,
    bookingId: b.id || b._id,
    title: `Consultation with ${b.mentor?.name || 'Mentor'}`,
    expertId: b.mentor?.id || b.mentor?._id || b.mentorId,
    expert: b.mentor ? mentorToCard(b.mentor) : null,
    at,
    when: new Date(at).toLocaleString('en-IN', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    mins: b.duration,
    status: b.status === 'confirmed' || b.status === 'active' || b.status === 'pending' ? 'upcoming' : b.status
  }
}
