import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'

// Polyfill pour TextEncoder/TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import CharactersPage, { loader } from './CharactersPage'

// Mock de l'API
jest.mock('../api/characters-api', () => ({
  getCharacters: jest.fn()
}))

import { getCharacters } from '../api/characters-api'

describe('CharactersPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    document.title = 'Test'
  })

  test('renders page with correct title and heading when characters are loaded', async () => {
    const mockCharacters = [
      { id: '1', name: 'Thor' },
      { id: '2', name: 'Iron Man' },
      { id: '3', name: 'Captain America' }
    ]

    getCharacters.mockResolvedValue(mockCharacters)

    const Stub = createRoutesStub([
      {
        path: '/characters',
        Component: CharactersPage,
        loader,
        HydrateFallback: () => <div>Loading characters...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters']} />)

    // Vérifier qu'il y a bien un élément h2 avec le texte attendu
    const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })
    expect(heading).toBeInTheDocument()

    // Vérifier que le titre de la page est correct
    expect(document.title).toBe('Characters | Marvel App')

    // Vérifications supplémentaires
    expect(screen.getByText('Thor')).toBeInTheDocument()
    expect(screen.getByText('Iron Man')).toBeInTheDocument()
    expect(screen.getByText('Captain America')).toBeInTheDocument()
    expect(screen.getByText('There are 3 characters')).toBeInTheDocument()

    // Vérifier que l'API a été appelée avec les paramètres par défaut
    expect(getCharacters).toHaveBeenCalledWith({ sort: 'name', order: 'asc' })
  })

  test('renders page with empty state when no characters', async () => {
    getCharacters.mockResolvedValue([])

    const Stub = createRoutesStub([
      {
        path: '/characters',
        Component: CharactersPage,
        loader,
        HydrateFallback: () => <div>Loading characters...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters']} />)

    // Vérifier qu'il y a bien un élément h2 avec le texte attendu
    const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })
    expect(heading).toBeInTheDocument()

    // Vérifier que le titre de la page est correct
    expect(document.title).toBe('Characters | Marvel App')

    // Vérifier l'état vide
    expect(screen.getByText('There is no character')).toBeInTheDocument()

    // Vérifier que l'API a été appelée
    expect(getCharacters).toHaveBeenCalledWith({ sort: 'name', order: 'asc' })
  })

  test('page structure includes all required elements including sort controls', async () => {
    const mockCharacters = [{ id: '1', name: 'Spider-Man' }]

    getCharacters.mockResolvedValue(mockCharacters)

    const Stub = createRoutesStub([
      {
        path: '/characters',
        Component: CharactersPage,
        loader,
        HydrateFallback: () => <div>Loading characters...</div>,
      },
    ])

    render(<Stub initialEntries={['/characters']} />)

    // Vérifier qu'il y a bien un élément h2 avec le texte attendu
    await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })

    // Vérifier que le titre de la page est correct
    expect(document.title).toBe('Characters | Marvel App')

    // Vérifier la structure
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('There is 1 character')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Spider-Man' })).toBeInTheDocument()

    // Vérifier les contrôles de tri
    expect(screen.getByLabelText('Sort by:')).toBeInTheDocument()
    expect(screen.getByLabelText('Order:')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Name')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Ascending')).toBeInTheDocument()

    // Vérifier que l'API a été appelée
    expect(getCharacters).toHaveBeenCalledWith({ sort: 'name', order: 'asc' })
  })

  test('loader function calls getCharacters API with default parameters', async () => {
    const mockCharacters = [{ id: '1', name: 'Test' }]
    getCharacters.mockResolvedValue(mockCharacters)

    // Mock d'une request sans paramètres
    const mockRequest = {
      url: 'http://localhost:3000/characters'
    }

    const result = await loader({ request: mockRequest })

    expect(getCharacters).toHaveBeenCalledWith({ sort: 'name', order: 'asc' })
    expect(result).toEqual(mockCharacters)
  })

  test('loader function calls getCharacters API with URL parameters', async () => {
    const mockCharacters = [{ id: '1', name: 'Test' }]
    getCharacters.mockResolvedValue(mockCharacters)

    // Mock d'une request avec paramètres de tri
    const mockRequest = {
      url: 'http://localhost:3000/characters?sort=modified&order=desc'
    }

    const result = await loader({ request: mockRequest })

    expect(getCharacters).toHaveBeenCalledWith({ sort: 'modified', order: 'desc' })
    expect(result).toEqual(mockCharacters)
  })

  test('loader handles partial URL parameters', async () => {
    const mockCharacters = [{ id: '1', name: 'Test' }]
    getCharacters.mockResolvedValue(mockCharacters)

    // Mock d'une request avec seulement le paramètre sort
    const mockRequest = {
      url: 'http://localhost:3000/characters?sort=modified'
    }

    const result = await loader({ request: mockRequest })

    expect(getCharacters).toHaveBeenCalledWith({ sort: 'modified', order: 'asc' })
    expect(result).toEqual(mockCharacters)
  })
})