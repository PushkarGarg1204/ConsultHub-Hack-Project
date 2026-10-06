export const CATEGORIES = ['Career', 'Resume', 'Interview', 'Projects', 'Job Search', 'Internships', 'Skills', 'Exams', 'Courses']
export const PILLS = ['Career', 'Resume', 'Interview', 'Projects']
export const DAYS = ['Wed, Oct 7', 'Thu, Oct 8', 'Fri, Oct 9', 'Sat, Oct 10']
export const TIMES = ['09:00 am', '11:30 am', '02:00 pm', '05:00 pm']

export const EXPERTS = [
  { id: 'm-ananya', name: 'Ananya Reddy', role: 'Career & Internship Mentor', cat: 'Career', rate: 79, rating: 4.9, online: true, bio: 'Helps college students plan internships, choose career paths and prepare for early software roles.', verified: true },
  { id: 'm-amit', name: 'Amit Patel', role: 'Software Engineering Mentor', cat: 'Projects', rate: 99, rating: 4.8, online: true, bio: 'Guides students on full-stack projects, DSA roadmaps, GitHub portfolios and software engineering fundamentals.', verified: true },
  { id: 'm-meera', name: 'Meera Joshi', role: 'Resume & Portfolio Mentor', cat: 'Resume', rate: 69, rating: 4.9, online: true, bio: 'Reviews student resumes, LinkedIn profiles and portfolios with practical recruiter-focused feedback.', verified: true },
  { id: 'm-rahul', name: 'Rahul Sharma', role: 'Interview Preparation Mentor', cat: 'Interview', rate: 89, rating: 4.8, online: false, bio: 'Mock interviews, HR questions, technical interview strategy and communication practice for students.', verified: true },
]

export const initials = (n) => n.replace(/^(Dr\.|Adv\.)\s*/, '').split(' ').map((w) => w[0]).join('')

export const MIN = 60000
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
export const time12 = (d) => `${String(d.getHours() % 12 || 12).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() < 12 ? 'am' : 'pm'}`
export const fmtWhen = (ts) => { const d = new Date(ts); return `${MON[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${time12(d)}` }
// 'Wed, Oct 7' + '02:00 pm' -> timestamp
export const slotToTs = (day, time) => {
  const [m, dd] = day.split(', ')[1].split(' '); const [hm, ap] = time.split(' '); let [h, mi] = hm.split(':').map(Number)
  if (ap === 'pm' && h < 12) h += 12; if (ap === 'am' && h === 12) h = 0
  return new Date(new Date().getFullYear(), MON.indexOf(m), +dd, h, mi).getTime()
}
export const fmtLeft = (ms) => { const m = Math.max(1, Math.ceil(ms / MIN)); return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m` }
export const chatTime = (ts) => time12(new Date(ts))

const n0 = Date.now(), Y = new Date().getFullYear()
const mk = (id, title, expertId, at, mins, status) => ({ id, title, expertId, at, when: fmtWhen(at), mins, status })
export const SESSIONS = [
  mk(1, 'Growth Strategy Alignment', 1, Math.ceil((n0 + 6 * MIN) / MIN) * MIN, 45, 'upcoming'), // demo: starts ~6 min after launch
  mk(2, 'Financial Audit Review', 6, new Date(Y, 9, 8, 8, 54).getTime() + 7 * 864e5, 60, 'upcoming'),
  mk(3, 'Pitch Deck Review & Seed Advice', 2, new Date(Y, 9, 5, 8, 55).getTime(), 45, 'completed'),
  mk(4, 'Portfolio Walkthrough', 7, new Date(Y, 9, 2, 16, 0).getTime(), 30, 'cancelled'),
]

export const THREADS = [
  { id: 1, expertId: 'm-ananya', unread: 1, msgs: [{ me: false, t: 'Hi! Tell me what career or internship decision you are currently stuck on.', ts: n0 - 12 * MIN }] },
  { id: 2, expertId: 'm-amit', unread: 0, msgs: [{ me: true, t: 'Can you review my final-year project idea?', ts: n0 - 26 * 60 * MIN }, { me: false, t: 'Sure. Send the idea and your current tech stack.', ts: n0 - 25 * 60 * MIN }] },
]

export const REPLIES = ['Sounds good. Could you share a bit more context?', 'Great, I will take a look and come prepared.', 'Thanks for the update! Anything specific you want to focus on?', 'Noted. Let us cover that in our session.', 'Happy to help. Feel free to send over any documents.']
