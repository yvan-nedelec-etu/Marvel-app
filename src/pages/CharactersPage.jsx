import CharactersList from "../components/CharactersList"
import NumberOfCharacters from "../components/NumberOfCharacters"
import SortControls from "../components/SortControls"
import { useLoaderData } from "react-router-dom"
import { getCharacters } from '../api/characters-api'

// loader exporté pour react-router
export async function loader({ request }) {
  // Extraire les paramètres de l'URL
  const url = new URL(request.url)
  const sort = url.searchParams.get('sort') || 'name'
  const order = url.searchParams.get('order') || 'asc'
  
  // getCharacters retourne une Promise avec les options de tri
  return await getCharacters({ sort, order })
}

export default function CharactersPage() {
  // change the title of the page
  document.title = "Characters | Marvel App"

  // useLoaderData fournit la valeur retournée par loader()
  const characters = useLoaderData()

  return (
    <>
      <h2>Marvel Characters</h2>
      <SortControls />
      <CharactersList characters={characters} />
      <br />
      <NumberOfCharacters characters={characters} />
    </>
  )
}