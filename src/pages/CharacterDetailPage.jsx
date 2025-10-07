import { useLoaderData } from 'react-router-dom'
import { getCharacterById } from '../api/characters-api'
import CharacterDetail from './CharacterDetail'

// loader : récupère params.id et appelle l'API
export async function loader({ params }) {
  const { id } = params
  const character = await getCharacterById(id)
  if (!character) {
    throw new Response('Not Found', { status: 404 })
  }
  return character
}

export default function CharacterDetailPage() {
  const character = useLoaderData()
  document.title = `${character.name} | Marvel App`
  return <CharacterDetail character={character} />
}