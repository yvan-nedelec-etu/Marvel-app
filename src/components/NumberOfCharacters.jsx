function NumberOfCharacters({ characters }) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return <div>There is no character</div>
  }
  if (characters.length === 1) {
    return <div>There is 1 character</div>
  }
  return <div>There are {characters.length} characters</div>
}

export default NumberOfCharacters