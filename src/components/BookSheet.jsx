import { useState } from 'react'
import Sheet from './Sheet.jsx'
import Avatar from './Avatar.jsx'
import SlotPicker from './SlotPicker.jsx'
<<<<<<< HEAD
export default function BookSheet({ expert, onConfirm, onClose, busy }) {
  const [v, setV] = useState({ day: null, time: null }); const ready = v.day && v.time
  return <Sheet title="Book a consultation" onClose={onClose}><div className="demo-head" style={{ marginBottom: 6 }}><Avatar expert={expert} /><div><h3>{expert.name}</h3><p className="muted">{expert.role}</p></div><div className="rate">₹{expert.rate}<small>15 minutes</small></div></div><SlotPicker value={v} onChange={setV} /><button className="btn block" style={{ marginTop: 22 }} disabled={!ready || busy} onClick={() => onConfirm(expert, v)}>{busy ? 'Booking…' : ready ? `Confirm ${v.day}, ${v.time}` : 'Pick a day and time'}</button></Sheet>
=======
export default function BookSheet({ expert, onConfirm, onClose }) {
  const [v, setV] = useState({ day: null, time: null })
  const ready = v.day && v.time
  return (
    <Sheet title="Book a session" onClose={onClose}>
      <div className="demo-head" style={{ marginBottom: 6 }}>
        <Avatar expert={expert} />
        <div><h3>{expert.name}</h3><p className="muted">{expert.role}</p></div>
        <div className="rate">₹{expert.rate}<small>per hour</small></div>
      </div>
      <SlotPicker value={v} onChange={setV} />
      <button className="btn block" style={{ marginTop: 22 }} disabled={!ready} onClick={() => onConfirm(expert, v)}>
        {ready ? `Confirm ${v.day}, ${v.time}` : 'Pick a day and time'}
      </button>
    </Sheet>
  )
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
}
