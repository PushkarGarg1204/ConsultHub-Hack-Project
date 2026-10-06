<<<<<<< HEAD
import { useCallback, useEffect, useRef, useState } from 'react'
=======
import { useCallback, useRef, useState } from 'react'
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
import Landing from './Landing.jsx'
import Shell from './Shell.jsx'
import Toast from './components/Toast.jsx'
import { useTheme } from './hooks.js'
<<<<<<< HEAD
import { api } from './api.js'
=======
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e

export default function App() {
  const theme = useTheme()
  const [user, setUser] = useState(null)
<<<<<<< HEAD
  const [booting, setBooting] = useState(true)
  useEffect(() => { if (!localStorage.getItem('consultHubToken')) { setBooting(false); return } api.me().then(setUser).catch(api.logout).finally(() => setBooting(false)) }, [])
=======
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
  const [msg, setMsg] = useState('')
  const timer = useRef()
  const notify = useCallback((m) => { setMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setMsg(''), 2600) }, [])

  const login = (u) => { setUser(u); window.scrollTo(0, 0); notify('Welcome, ' + u.name) }
  const update = (u) => setUser(u)
<<<<<<< HEAD
  const logout = () => { api.logout(); setUser(null); notify('Logged out') }

  if (booting) return <div className="loading-screen">Loading ConsultHUB…</div>
=======
  const logout = () => { setUser(null); notify('Logged out') }
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e

  return (
    <>
      {user ? <Shell user={user} theme={theme} notify={notify} onLogout={logout} onUpdate={update} /> : <Landing theme={theme} notify={notify} onAuth={login} />}
      <Toast msg={msg} />
    </>
  )
}
