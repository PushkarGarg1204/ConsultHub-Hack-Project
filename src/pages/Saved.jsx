import ExpertCard from '../components/ExpertCard.jsx'
export default function Saved({ savedMentors, onSave, onBook, goHome }) {
  return <>
    <h1 className="page-t">Saved</h1>
    {savedMentors.length ? <div className="grid">{savedMentors.map((e) => <ExpertCard key={e.id} e={e} saved onSave={onSave} onBook={onBook} />)}</div> : <div className="empty"><p>Tap the bookmark on an expert to keep them here.</p><button className="btn sm" onClick={goHome}>Find experts</button></div>}
  </>
}
