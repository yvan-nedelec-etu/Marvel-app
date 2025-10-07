import { Link } from 'react-router-dom'

export default function CharacterDetail({ character }) {
  if (!character) return null

  const thumb =
    character?.thumbnail && character.thumbnail.path
      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
      : null

  return (
    <section>
      <p>
        <Link to="/characters">← Back to characters</Link>
      </p>

      <h2>{character.name}</h2>

      {thumb && (
        <img
          src={thumb}
          alt={character.name}
          style={{ maxWidth: 320, width: '100%', borderRadius: 8 }}
        />
      )}

      <p>{character.description || 'No description available.'}</p>

      <p>
        <small>ID: {character.id} · Modified: {character.modified}</small>
      </p>
    </section>
  )
}