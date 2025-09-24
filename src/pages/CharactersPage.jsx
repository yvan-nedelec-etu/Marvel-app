import characters from '../../data/characters.json'
import CharactersList from '../components/CharactersList'
import NumberOfCharacters from '../components/NumberOfCharacters'

export default function CharactersPage() {
  return (
    <section>
      <h2>Characters</h2>
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </section>
  )
}