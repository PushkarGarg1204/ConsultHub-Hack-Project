import { useState } from 'react'
import { api } from './api.js'

export default function AuthCard({ mode, setMode, onAuth, notify }) {
  const su = mode === 'signup'
  const [f, setF] = useState({ name: '', email: '', pw: '', role: 'learner' })
  const [err, setErr] = useState({})
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: '' }) }
  const switchTo = (m) => { setMode(m); setErr({}) }

  const submit = async (e) => {
    e.preventDefault()
    const n = {}
    if (su && f.name.trim().length < 2) n.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) n.email = 'Enter a valid email.'
    if (f.pw.length < 8) n.pw = 'Use at least 8 characters.'
    setErr(n)
    if (Object.keys(n).length) return
    setBusy(true)
    try {
      const user = su
        ? await api.register({ name: f.name.trim(), email: f.email.trim(), password: f.pw, role: f.role === 'expert' ? 'mentor' : 'student' })
        : await api.login({ email: f.email.trim(), password: f.pw })
      onAuth(user)
    } catch (e) { setErr({ form: e.message }) }
    finally { setBusy(false) }
  }
  const field = (k, label, props) => (
    <div className="field"><label htmlFor={k}>{label}</label><div className="inp"><input id={k} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} {...props} />{k === 'pw' && <button type="button" className="eye" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>}</div>{err[k] && <div className="err">{err[k]}</div>}</div>
  )
  return (
    <aside className="auth" id="auth" aria-label="Account">
      <div className="tabs" role="tablist"><button role="tab" aria-selected={!su} onClick={() => switchTo('login')}>Log in</button><button role="tab" aria-selected={su} onClick={() => switchTo('signup')}>Sign up</button></div>
      <h2>{su ? 'Create your account' : 'Welcome back'}</h2><p className="sub">{su ? 'Join to book experts or offer your own sessions.' : 'Log in to see your sessions and messages.'}</p>
      <form onSubmit={submit} noValidate>
        {su && <div className="role" role="radiogroup" aria-label="I want to">{[['learner', 'Get advice', 'Book experts'], ['expert', 'Give advice', 'Become an expert']].map(([v, t, s]) => <div key={v}><input type="radio" name="role" id={'r-' + v} checked={f.role === v} onChange={() => setF({ ...f, role: v })} /><label htmlFor={'r-' + v}>{t}<small>{s}</small></label></div>)}</div>}
        {su && field('name', 'Full name', { autoComplete: 'name', placeholder: 'Aarav Sharma' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
        {field('pw', 'Password', { type: show ? 'text' : 'password', autoComplete: su ? 'new-password' : 'current-password', placeholder: 'At least 8 characters' })}
        {err.form && <div className="err">{err.form}</div>}
        {!su && <div className="row"><label><input type="checkbox" /> Remember me</label><a href="#auth" onClick={(e) => { e.preventDefault(); notify('Password reset can be added with email provider integration.') }}>Forgot password?</a></div>}
        <button className="btn block" type="submit" disabled={busy}>{busy ? 'Please wait…' : su ? 'Create account' : 'Log in'}</button>
      </form>
      <div className="or">or</div><button className="btn ghost block" type="button" onClick={() => notify('Google OAuth can be connected after the core MVP.')}>Continue with Google</button>
      <p className="fine">{su ? 'By signing up you agree to the Terms and Privacy Policy.' : 'New here? Use Sign up above. It takes under a minute.'}</p>
    </aside>
  )
}
