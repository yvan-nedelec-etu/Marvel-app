function NumberOfCharacters({ characters }) {
  const list = Array.isArray(characters) ? characters : []
  const count = list.length

  if (count === 0) {
    return <div>There is no character</div>
  }
  if (count === 1) {
    return <div>There is 1 character</div>
  }
  return <div>There are {count} characters</div>
}

export default NumberOfCharacters