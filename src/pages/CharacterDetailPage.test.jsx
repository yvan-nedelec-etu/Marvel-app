import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'

// Polyfill for TextEncoder/TextDecoder MUST be set before importing react-router
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import CharacterDetailPage, { loader } from './CharacterDetailPage'

const mockCharacter = {
  id: '1',
  name: 'Thor',
  description: 'God of Thunder',
  modified: '2023-01-01T00:00:00Z',
  thumbnail: {
    path: 'https://example.com/thor',
    extension: 'jpg'
  }
}

// Mock de l'API
jest.mock('../api/characters-api', () => ({
  getCharacterById: jest.fn()
}))

import { getCharacterById } from '../api/characters-api'

describe('CharacterDetailPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders character detail page with correct title when character exists', async () => {
    getCharacterById.mockResolvedValue(mockCharacter)

    const Stub = createRoutesStub([
      {
        path: '/characters/:id',
        Component: CharacterDetailPage,
        loader,
        HydrateFallback: () => <div>Loading...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters/1']} />)

    // Attendre que le contenu se charge
    const characterName = await screen.findByText('Thor')
    expect(characterName).toBeInTheDocument()

    // Vérifier le titre de la page
    expect(document.title).toBe('Thor | Marvel App')

    // Vérifier les informations du personnage
    expect(screen.getByText('God of Thunder')).toBeInTheDocument()
    expect(screen.getByText(/ID: 1 · Modified: 2023-01-01T00:00:00Z/)).toBeInTheDocument()

    // Vérifier l'image
    const image = screen.getByRole('img', { name: 'Thor' })
    expect(image).toHaveAttribute('src', 'https://example.com/thor.jpg')

    // Vérifier le lien de retour
    expect(screen.getByRole('link', { name: '← Back to characters' })).toBeInTheDocument()

    // Vérifier que l'API a été appelée avec le bon ID
    expect(getCharacterById).toHaveBeenCalledWith('1')
  })

  test('loader function calls API with correct parameters', async () => {
    getCharacterById.mockResolvedValue(mockCharacter)

    const result = await loader({ params: { id: '1' } })
    
    expect(getCharacterById).toHaveBeenCalledWith('1')
    expect(result).toEqual(mockCharacter)
  })

  test('loader throws 404 response when character not found', async () => {
    getCharacterById.mockResolvedValue(null)

    try {
      await loader({ params: { id: '999' } })
      expect(true).toBe(false) // Force l'échec du test
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
      expect(error.status).toBe(404)
    }
    
    expect(getCharacterById).toHaveBeenCalledWith('999')
  })

  test('renders character with minimal data', async () => {
    const minimalCharacter = {
      id: '2',
      name: 'Iron Man',
      description: null,
      modified: '2023-02-01T00:00:00Z',
      thumbnail: null
    }

    getCharacterById.mockResolvedValue(minimalCharacter)

    const Stub = createRoutesStub([
      {
        path: '/characters/:id',
        Component: CharacterDetailPage,
        loader,
        HydrateFallback: () => <div>Loading...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters/2']} />)

    // Attendre que le contenu se charge
    const characterName = await screen.findByText('Iron Man')
    expect(characterName).toBeInTheDocument()

    // Vérifier le titre de la page
    expect(document.title).toBe('Iron Man | Marvel App')

    // Vérifier l'absence d'image
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('handles API error gracefully', async () => {
    getCharacterById.mockRejectedValue(new Error('API Error'))

    await expect(loader({ params: { id: '1' } })).rejects.toThrow('API Error')
    
    expect(getCharacterById).toHaveBeenCalledWith('1')
  })

  test('renders page component with document.title assignment', async () => {
    // Ce test couvre la ligne 17 : document.title = `${character.name} | Marvel App`
    const characterWithSpecialName = {
      id: '3',
      name: 'Black Widow',
      description: 'Super spy',
      modified: '2023-03-01T00:00:00Z',
      thumbnail: null
    }

    getCharacterById.mockResolvedValue(characterWithSpecialName)

    const Stub = createRoutesStub([
      {
        path: '/characters/:id',
        Component: CharacterDetailPage,
        loader,
        HydrateFallback: () => <div>Loading...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters/3']} />)

    // Attendre que le contenu se charge
    await screen.findByText('Black Widow')

    // Vérifier que document.title est bien assigné (couvre la ligne 17)
    expect(document.title).toBe('Black Widow | Marvel App')
  })
})