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
      {characters.map((c, i) => {
        const label =
          typeof c === 'string'
            ? c
            : (c && (c.name || c.title || c.label)) || JSON.stringify(c)
        return <li key={i}>{label}</li>
      })}
    </ul>
  )
}

export default CharactersList