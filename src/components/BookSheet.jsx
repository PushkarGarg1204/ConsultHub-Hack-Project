import { useState } from 'react'
import Sheet from './Sheet.jsx'
import Avatar from './Avatar.jsx'
import SlotPicker from './SlotPicker.jsx'
export default function BookSheet({ expert, onConfirm, onClose, busy }) {
  const [v, setV] = useState({ day: null, time: null }); const ready = v.day && v.time
  return <Sheet title="Book a consultation" onClose={onClose}><div className="demo-head" style={{ marginBottom: 6 }}><Avatar expert={expert} /><div><h3>{expert.name}</h3><p className="muted">{expert.role}</p></div><div className="rate">₹{expert.rate}<small>15 minutes</small></div></div><SlotPicker value={v} onChange={setV} /><button className="btn block" style={{ marginTop: 22 }} disabled={!ready || busy} onClick={() => onConfirm(expert, v)}>{busy ? 'Booking…' : ready ? `Confirm ${v.day}, ${v.time}` : 'Pick a day and time'}</button></Sheet>
}
