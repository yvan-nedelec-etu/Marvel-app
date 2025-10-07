import CharactersList from "../components/CharactersList"
import NumberOfCharacters from "../components/NumberOfCharacters"
import { useLoaderData } from "react-router-dom"
import { getCharacters } from '../api/characters-api'

// loader exporté pour react-router
export async function loader() {
  // getCharacters retourne une Promise (voir src/api/characters-api.js)
  return await getCharacters()
}

export default function CharactersPage() {
  // change the title of the page
  document.title = "Characters | Marvel App"

  // useLoaderData fournit la valeur retournée par loader()
  const characters = useLoaderData()

  return (
    <>
      <h2>Marvel Characters</h2>
      <CharactersList characters={characters} />
      <br />
      <NumberOfCharacters characters={characters} />
    </>
  )
}