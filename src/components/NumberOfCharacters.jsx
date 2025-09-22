function NumberOfCharacters({ characters }) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return <div>There is no character</div>
  }
  return <div>There is {characters.length} characters</div>
}

export default NumberOfCharacters