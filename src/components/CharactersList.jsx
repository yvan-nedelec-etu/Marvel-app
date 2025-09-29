// ...existing code...
import { Link } from 'react-router-dom'

function CharactersList({ characters }) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return (
      <ul id="characters">
        <li>There is no character</li>
      </ul>
    )
  }
  return (
    <ul id="characters">
      {characters.map((c) => {
        const label =
          typeof c === 'string'
            ? c
            : (c && (c.name || c.title || c.label)) || JSON.stringify(c)
        const id = c && (c.id ?? c._id)

        if (id) {
          return (
            <li key={id}>
              {/* SPA navigation — react-router Link (pas de reload) */}
              <Link to={`/characters/${id}`} className="character-link">
                {label}
              </Link>
            </li>
          )
        }

        return <li key={label}>{label}</li>
      })}
    </ul>
  )
}

export default CharactersList
// ...existing code...