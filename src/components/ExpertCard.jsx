import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
export default function ExpertCard({ e, saved, onSave, onBook }) {
  return <article className="ex"><div className="ex-top"><Avatar expert={e} /><div><h3>{e.name}</h3><div className="muted sm">{e.role}</div>{e.verified && <small className="muted">✓ Verified</small>}</div><span className="star"><Icon n="star" size={13} fill /> {e.rating}</span></div><p>{e.bio}</p><div className="ex-foot"><div><small className="muted">15 min</small><div><b>₹{e.rate}</b></div></div><div className="ex-act">{onSave && <button className={'icon-btn' + (saved ? ' on' : '')} onClick={() => onSave(e.id)} aria-pressed={saved}><Icon n="bookmark" fill={saved} /></button>}<button className="btn sm" onClick={() => onBook(e)}>Book</button></div></div></article>
}
