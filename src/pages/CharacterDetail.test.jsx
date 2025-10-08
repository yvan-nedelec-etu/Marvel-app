import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CharacterDetail from './CharacterDetail'

// Wrapper pour fournir le contexte de routage
const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('CharacterDetail component', () => {
  test('displays character information correctly when image exists', () => {
    const character = {
      id: '1',
      name: 'Thor',
      description: 'God of Thunder',
      modified: '2023-01-01T00:00:00Z',
      thumbnail: {
        path: 'https://example.com/thor',
        extension: 'jpg'
      }
    }

    renderWithRouter(<CharacterDetail character={character} />)

    // Vérifier les informations du personnage
    expect(screen.getByText('Thor')).toBeInTheDocument()
    expect(screen.getByText('God of Thunder')).toBeInTheDocument()
    expect(screen.getByText(/ID: 1 · Modified: 2023-01-01T00:00:00Z/)).toBeInTheDocument()
    expect(screen.getByText('← Back to characters')).toBeInTheDocument()

    // Vérifier que l'image est présente
    const image = screen.getByRole('img', { name: 'Thor' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/thor.jpg')
    expect(image).toHaveAttribute('alt', 'Thor')
  })

  test('displays character information correctly when image does not exist', () => {
    const character = {
      id: '2',
      name: 'Iron Man',
      description: 'Genius billionaire playboy philanthropist',
      modified: '2023-02-01T00:00:00Z',
      thumbnail: null // pas d'image
    }

    renderWithRouter(<CharacterDetail character={character} />)

    // Vérifier les informations du personnage
    expect(screen.getByText('Iron Man')).toBeInTheDocument()
    expect(screen.getByText('Genius billionaire playboy philanthropist')).toBeInTheDocument()
    expect(screen.getByText(/ID: 2 · Modified: 2023-02-01T00:00:00Z/)).toBeInTheDocument()
    expect(screen.getByText('← Back to characters')).toBeInTheDocument()

    // Vérifier qu'il n'y a pas d'image
    const image = screen.queryByRole('img', { name: 'Iron Man' })
    expect(image).not.toBeInTheDocument()
    
    // Vérifier qu'il n'y a aucune image dans le composant
    const allImages = screen.queryAllByRole('img')
    expect(allImages).toHaveLength(0)
  })

  test('displays character information with incomplete thumbnail data', () => {
    const character = {
      id: '3',
      name: 'Captain America',
      description: 'First Avenger',
      modified: '2023-03-01T00:00:00Z',
      thumbnail: {
        path: null, // path manquant
        extension: 'jpg'
      }
    }

    renderWithRouter(<CharacterDetail character={character} />)

    // Vérifier les informations du personnage
    expect(screen.getByText('Captain America')).toBeInTheDocument()
    expect(screen.getByText('First Avenger')).toBeInTheDocument()

    // Vérifier qu'il n'y a pas d'image car le path est null
    const image = screen.queryByRole('img', { name: 'Captain America' })
    expect(image).not.toBeInTheDocument()
    
    const allImages = screen.queryAllByRole('img')
    expect(allImages).toHaveLength(0)
  })

  test('displays "No description available." when description is missing', () => {
    const character = {
      id: '4',
      name: 'Spider-Man',
      description: '', // description vide
      modified: '2023-04-01T00:00:00Z'
    }

    renderWithRouter(<CharacterDetail character={character} />)

    expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    expect(screen.getByText('No description available.')).toBeInTheDocument()
  })

  test('displays "No description available." when description is null', () => {
    const character = {
      id: '5',
      name: 'Hulk',
      description: null, // description null
      modified: '2023-05-01T00:00:00Z'
    }

    renderWithRouter(<CharacterDetail character={character} />)

    expect(screen.getByText('Hulk')).toBeInTheDocument()
    expect(screen.getByText('No description available.')).toBeInTheDocument()
  })

  test('returns null when no character is provided', () => {
    const { container } = renderWithRouter(<CharacterDetail character={null} />)
    
    // Le composant retourne null, donc le container devrait être vide
    expect(container.firstChild).toBeNull()
  })

  test('returns null when character is undefined', () => {
    const { container } = renderWithRouter(<CharacterDetail />)
    
    // Le composant retourne null, donc le container devrait être vide
    expect(container.firstChild).toBeNull()
  })

  test('back to characters link works correctly', () => {
    const character = {
      id: '6',
      name: 'Black Widow',
      description: 'Super spy',
      modified: '2023-06-01T00:00:00Z'
    }

    renderWithRouter(<CharacterDetail character={character} />)

    const backLink = screen.getByRole('link', { name: '← Back to characters' })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/characters')
  })
})