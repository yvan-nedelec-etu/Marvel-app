// ...existing code...
import { Link } from 'react-router-dom'

function CharactersList({ characters }) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return <ul id="characters"></ul>
  }
  return (
    <ul id="characters">
      {characters.map((c, index) => {
        const label =
          typeof c === 'string'
            ? c
            : (c && (c.name || c.title || c.label)) || JSON.stringify(c)
        const id = c && (c.id ?? c._id)
        
        // Utilise une clé unique basée sur l'index et le contenu
        const key = id || `item-${index}-${label}`

        if (id) {
          return (
            <li key={key}>
              <Link to={`/characters/${id}`} className="character-link">
                {label}
              </Link>
            </li>
          )
        }

        return <li key={key}>{label}</li>
      })}
    </ul>
  )
}

export default CharactersList
// ...existing code...