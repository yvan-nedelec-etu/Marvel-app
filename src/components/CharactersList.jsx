function CharactersList({ characters }) {
  if (!Array.isArray(characters)) {
    return <ul id="characters"><li>No characters</li></ul>
  }
  return (
    <ul id="characters">
      {characters.map((c, i) => {
        const label = typeof c === 'string' ? c : (c && (c.name || c.title || c.label)) || JSON.stringify(c)
        return <li key={i}>{label}</li>
      })}
    </ul>
  )
}

export default CharactersList