import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CharactersList from './CharactersList'

describe('CharactersList component', () => {
  test('renders empty list when characters array is empty', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={[]} />
      </MemoryRouter>
    )
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list).toBeEmptyDOMElement()
  })

  test('renders empty list when characters is not provided', () => {
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    )
    const list = screen.getByRole('list')
    expect(list).toBeEmptyDOMElement()
  })

  test('displays all characters correctly when characters array is provided', () => {
    const characters = [
      { id: '1', name: 'Thor' },
      { id: '2', name: 'Iron Man' },
      { id: '3', name: 'Captain America' },
      'String Hero'
    ]

    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    )

    // Vérifier que tous les éléments de liste sont présents
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(4)

    // Vérifier chaque personnage individuellement
    expect(screen.getByText('Thor')).toBeInTheDocument()
    expect(screen.getByText('Iron Man')).toBeInTheDocument()
    expect(screen.getByText('Captain America')).toBeInTheDocument()
    expect(screen.getByText('String Hero')).toBeInTheDocument()

    // Vérifier que les personnages avec ID sont des liens
    const thorLink = screen.getByRole('link', { name: 'Thor' })
    expect(thorLink).toBeInTheDocument()
    expect(thorLink).toHaveAttribute('href', '/characters/1')

    const ironManLink = screen.getByRole('link', { name: 'Iron Man' })
    expect(ironManLink).toBeInTheDocument()
    expect(ironManLink).toHaveAttribute('href', '/characters/2')

    // Vérifier que le personnage string n'est pas un lien
    expect(screen.queryByRole('link', { name: 'String Hero' })).not.toBeInTheDocument()
  })

  test('handles characters with different property structures', () => {
    const characters = [
      { id: '1', name: 'Thor' },
      { _id: 'custom-id', title: 'The Amazing Spider-Man' },
      { id: '3', label: 'Hero Label' },
      { name: 'No ID Hero' },
      'String Character'
    ]

    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(5)

    // Vérifier les textes affichés
    expect(screen.getByText('Thor')).toBeInTheDocument()
    expect(screen.getByText('The Amazing Spider-Man')).toBeInTheDocument()
    expect(screen.getByText('Hero Label')).toBeInTheDocument()
    expect(screen.getByText('No ID Hero')).toBeInTheDocument()
    expect(screen.getByText('String Character')).toBeInTheDocument()

    // Vérifier les liens pour ceux qui ont un ID
    expect(screen.getByRole('link', { name: 'Thor' })).toHaveAttribute('href', '/characters/1')
    expect(screen.getByRole('link', { name: 'The Amazing Spider-Man' })).toHaveAttribute('href', '/characters/custom-id')
    expect(screen.getByRole('link', { name: 'Hero Label' })).toHaveAttribute('href', '/characters/3')

    // Vérifier que ceux sans ID ne sont pas des liens
    expect(screen.queryByRole('link', { name: 'No ID Hero' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'String Character' })).not.toBeInTheDocument()
  })

test('handles null and undefined characters in array', () => {
  const characters = [
    { id: '1', name: 'Thor' },
    null,  // caractère null
    undefined,  // caractère undefined
    { id: '2', name: 'Iron Man' }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters} />
    </MemoryRouter>
  )

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(4)

  // Vérifier que les caractères valides sont affichés
  expect(screen.getByText('Thor')).toBeInTheDocument()
  expect(screen.getByText('Iron Man')).toBeInTheDocument()

  // Vérifier que null est converti en JSON
  expect(screen.getByText('null')).toBeInTheDocument()
  
  // Pour undefined, JSON.stringify retourne undefined (pas de string)
  // donc la liste aura un élément vide - on vérifie juste le nombre d'éléments
  // screen.debug() // décommente pour voir le DOM généré
})

test('handles empty objects and objects without displayable properties', () => {
  const characters = [
    {},  // objet vide
    { someProperty: 'value' },  // objet sans name/title/label
    { id: '1', randomProp: 'test' }  // objet avec id mais sans propriété d'affichage
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters} />
    </MemoryRouter>
  )

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(3)

  // Vérifier la conversion JSON des objets
  expect(screen.getByText('{}')).toBeInTheDocument()
  expect(screen.getByText('{"someProperty":"value"}')).toBeInTheDocument()
  
  // Le dernier devrait être un lien car il a un ID
  const linkElement = screen.getByRole('link', { name: '{"id":"1","randomProp":"test"}' })
  expect(linkElement).toHaveAttribute('href', '/characters/1')
})
})