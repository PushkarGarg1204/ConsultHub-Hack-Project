import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
export default function ExpertCard({ e, saved, onSave, onBook }) {
<<<<<<< HEAD
  return <article className="ex"><div className="ex-top"><Avatar expert={e} /><div><h3>{e.name}</h3><div className="muted sm">{e.role}</div>{e.verified && <small className="muted">✓ Verified</small>}</div><span className="star"><Icon n="star" size={13} fill /> {e.rating}</span></div><p>{e.bio}</p><div className="ex-foot"><div><small className="muted">15 min</small><div><b>₹{e.rate}</b></div></div><div className="ex-act">{onSave && <button className={'icon-btn' + (saved ? ' on' : '')} onClick={() => onSave(e.id)} aria-pressed={saved}><Icon n="bookmark" fill={saved} /></button>}<button className="btn sm" onClick={() => onBook(e)}>Book</button></div></div></article>
=======
  return (
    <article className="ex">
      <div className="ex-top">
        <Avatar expert={e} />
        <div><h3>{e.name}</h3><div className="muted sm">{e.role}</div></div>
        <span className="star"><Icon n="star" size={13} fill /> {e.rating}</span>
      </div>
      <p>{e.bio}</p>
      <div className="ex-foot">
        <div><small className="muted">Rate</small><div><b>₹{e.rate}</b> <small className="muted">/hr</small></div></div>
        <div className="ex-act">
          {onSave && <button className={'icon-btn' + (saved ? ' on' : '')} onClick={() => onSave(e.id)} aria-pressed={saved} aria-label={(saved ? 'Remove ' : 'Save ') + e.name}><Icon n="bookmark" fill={saved} /></button>}
          <button className="btn sm" onClick={() => onBook(e)}>Book</button>
        </div>
      </div>
    </article>
  )
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
}
