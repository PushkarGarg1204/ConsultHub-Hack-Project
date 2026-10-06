<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Sheet from '../components/Sheet.jsx'
import ExpertCard from '../components/ExpertCard.jsx'
import { CATEGORIES, PILLS } from '../data.js'
import { api, mentorToCard } from '../api.js'

const DEFAULT = { cats: [], min: 40, max: 150, rating: 0 }
export default function Home({ saved, onSave, onBook }) {
  const [q, setQ] = useState(''); const [problem, setProblem] = useState(''); const [matched, setMatched] = useState([]); const [triage, setTriage] = useState(null)
  const [f, setF] = useState(DEFAULT); const [open, setOpen] = useState(false); const [draft, setDraft] = useState(DEFAULT); const [experts, setExperts] = useState([]); const [loading, setLoading] = useState(true); const [matching, setMatching] = useState(false)

  useEffect(() => { api.mentors({ verified: true }).then((x) => setExperts(x.map(mentorToCard))).catch(() => {}).finally(() => setLoading(false)) }, [])
  const source = matched.length ? matched : experts
  const list = useMemo(() => source.filter((e) => (!f.cats.length || f.cats.some(c => e.categories?.includes(c) || e.cat === c)) && e.rate >= f.min && e.rate <= f.max && Number(e.rating) >= f.rating && (e.name + e.role + e.bio).toLowerCase().includes(q.trim().toLowerCase())), [source, f, q])
  const active = f.cats.length + (f.min > 40 || f.max < 150 ? 1 : 0) + (f.rating ? 1 : 0)
  const toggle = (c) => setDraft((d) => ({ ...d, cats: d.cats.includes(c) ? d.cats.filter((x) => x !== c) : [...d.cats, c] }))
  const findMentor = async () => { if (problem.trim().length < 5) return; setMatching(true); try { const r = await api.match(problem); setTriage(r.triage); setMatched(r.mentors.map(mentorToCard)); setQ('') } catch (e) { alert(e.message) } finally { setMatching(false) } }
  const reset = () => { setF(DEFAULT); setQ(''); setMatched([]); setTriage(null) }
  return <>
    <section className="problem-box">
      <div><span className="tag">AI MATCHING</span><h1>What are you stuck on?</h1><p className="muted">Describe your student problem. We’ll find the most relevant verified mentor.</p></div>
      <textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Example: I’m preparing for a BCA interview but don’t know how to plan DSA and projects…" rows={3} />
      <button className="btn" disabled={matching || problem.trim().length < 5} onClick={findMentor}>{matching ? 'Finding mentors…' : 'Find the right mentor'}</button>
      {triage && <div className="match-note">AI category: <b>{triage.category}</b> · confidence {Math.round((triage.confidence || 0) * 100)}%</div>}
    </section>
    <div className="searchrow"><div className="search"><Icon n="search" size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find an expert or topic..." /></div><button className="icon-btn big" onClick={() => { setDraft(f); setOpen(true) }} aria-label="Filters"><Icon n="sliders" />{active > 0 && <span className="badge">{active}</span>}</button></div>
    <div className="pills">{['All', ...PILLS].map((p) => <button key={p} className="chip pill" onClick={() => setF({ ...f, cats: p === 'All' ? [] : [p] })}>{p}</button>)}</div>
    <div className="sec-h"><h2>{matched.length ? 'Recommended for your problem' : 'Verified Experts'}</h2><button className="link" onClick={reset}>SEE ALL</button></div>
    {loading ? <div className="empty"><p>Loading verified mentors…</p></div> : list.length ? <div className="grid">{list.map((e) => <ExpertCard key={e.id} e={e} saved={saved.includes(e.id)} onSave={onSave} onBook={onBook} />)}</div> : <div className="empty"><p>No mentors match your filters.</p><button className="btn sm" onClick={reset}>Clear filters</button></div>}
    {open && <Sheet title="Filters" onClose={() => setOpen(false)} action={<button className="link" onClick={() => setDraft(DEFAULT)}>Reset All</button>}><div className="lbl">Category</div><div className="chips">{CATEGORIES.map((c) => <button key={c} className="chip" aria-pressed={draft.cats.includes(c)} onClick={() => toggle(c)}>{c}</button>)}</div><div className="lbl">15-minute price <span className="rng">₹{draft.min} - ₹{draft.max}</span></div><div className="dual"><div className="track" /><input type="range" min="40" max="150" step="1" value={draft.min} onChange={(e) => setDraft({ ...draft, min: Math.min(+e.target.value, draft.max - 1) })} /><input type="range" min="40" max="150" step="1" value={draft.max} onChange={(e) => setDraft({ ...draft, max: Math.max(+e.target.value, draft.min + 1) })} /></div><div className="lbl">Minimum rating</div><div className="chips">{[[0, 'Any'], [4, '4.0+'], [4.5, '4.5+']].map(([v, l]) => <button key={l} className="chip" aria-pressed={draft.rating === v} onClick={() => setDraft({ ...draft, rating: v })}>{l}{v ? ' ★' : ''}</button>)}</div><button className="btn block" style={{ marginTop: 24 }} onClick={() => { setF(draft); setOpen(false) }}>Show Results</button></Sheet>}
  </>
=======
import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Sheet from '../components/Sheet.jsx'
import ExpertCard from '../components/ExpertCard.jsx'
import { CATEGORIES, PILLS, EXPERTS } from '../data.js'

const DEFAULT = { cats: [], min: 100, max: 500, rating: 0 }

export default function Home({ saved, onSave, onBook }) {
  const [q, setQ] = useState('')
  const [f, setF] = useState(DEFAULT)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(DEFAULT)

  const list = useMemo(() => EXPERTS.filter((e) =>
    (!f.cats.length || f.cats.includes(e.cat)) && e.rate >= f.min && e.rate <= f.max && e.rating >= f.rating &&
    (e.name + e.role + e.bio).toLowerCase().includes(q.trim().toLowerCase())), [f, q])

  const active = f.cats.length + (f.min > 100 || f.max < 500 ? 1 : 0) + (f.rating ? 1 : 0)
  const pill = (p) => (p === 'All' ? !f.cats.length : f.cats.length === 1 && f.cats[0] === p)
  const toggle = (c) => setDraft((d) => ({ ...d, cats: d.cats.includes(c) ? d.cats.filter((x) => x !== c) : [...d.cats, c] }))
  const openSheet = () => { setDraft(f); setOpen(true) }
  const reset = () => { setF(DEFAULT); setQ('') }

  return (
    <>
      <div className="searchrow">
        <div className="search">
          <Icon n="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find an expert or topic..." aria-label="Search experts" />
        </div>
        <button className="icon-btn big" onClick={openSheet} aria-label="Filters">
          <Icon n="sliders" />{active > 0 && <span className="badge">{active}</span>}
        </button>
      </div>

      <div className="pills" role="group" aria-label="Categories">
        {['All', ...PILLS].map((p) => (
          <button key={p} className="chip pill" aria-pressed={pill(p)} onClick={() => setF({ ...f, cats: p === 'All' ? [] : [p] })}>{p}</button>
        ))}
      </div>

      <div className="sec-h"><h2>Featured Experts</h2><button className="link" onClick={reset}>SEE ALL</button></div>

      {list.length ? (
        <div className="grid">{list.map((e) => <ExpertCard key={e.id} e={e} saved={saved.includes(e.id)} onSave={onSave} onBook={onBook} />)}</div>
      ) : (
        <div className="empty"><p>No experts match your filters.</p><button className="btn sm" onClick={reset}>Clear filters</button></div>
      )}

      {open && (
        <Sheet title="Filters" onClose={() => setOpen(false)} action={<button className="link" onClick={() => setDraft(DEFAULT)}>Reset All</button>}>
          <div className="lbl">Category</div>
          <div className="chips">
            {CATEGORIES.map((c) => <button key={c} className="chip" aria-pressed={draft.cats.includes(c)} onClick={() => toggle(c)}>{c}</button>)}
          </div>

          <div className="lbl">Hourly rate <span className="rng">₹{draft.min} - ₹{draft.max}{draft.max === 500 ? '+' : ''}</span></div>
          <div className="dual">
            <div className="track"><div className="fill" style={{ left: ((draft.min - 100) / 4) + '%', right: (100 - (draft.max - 100) / 4) + '%' }} /></div>
            <input type="range" min="100" max="500" step="10" value={draft.min} aria-label="Minimum rate"
              onChange={(e) => setDraft({ ...draft, min: Math.min(+e.target.value, draft.max - 10) })} />
            <input type="range" min="100" max="500" step="10" value={draft.max} aria-label="Maximum rate"
              onChange={(e) => setDraft({ ...draft, max: Math.max(+e.target.value, draft.min + 10) })} />
          </div>
          <div className="mm">
            <label>Min (₹)<input type="number" readOnly value={draft.min} /></label>
            <label>Max (₹)<input type="number" readOnly value={draft.max} /></label>
          </div>

          <div className="lbl">Minimum rating</div>
          <div className="chips">
            {[[0, 'Any'], [4, '4.0+'], [4.5, '4.5+']].map(([v, l]) => (
              <button key={l} className="chip" aria-pressed={draft.rating === v} onClick={() => setDraft({ ...draft, rating: v })}>{l}{v ? ' ★' : ''}</button>
            ))}
          </div>

          <button className="btn block" style={{ marginTop: 24 }} onClick={() => { setF(draft); setOpen(false) }}>Show Results</button>
        </Sheet>
      )}
    </>
  )
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
}
