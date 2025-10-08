jest.mock('../../data/characters.json', () => [
  null,
  {},
  'StringHero',
  { name: 'NameOnly' },
  { id: '3', name: 'Charlie', modified: '2023-03-01T00:00:00Z' },
  { id: 1, name: 'Alpha', modified: '2023-01-01T00:00:00Z' },
  { id: 2, name: 'Beta', modified: '2023-02-01T00:00:00Z' },
], { virtual: true })

import characters from '../../data/characters.json'
import { getCharacters, getCharacterById } from './characters-api'

describe('characters-api', () => {
  describe('getCharacters', () => {
    test('should return the list of characters with default sorting (name, asc)', async () => {
      const result = await getCharacters()
      
      // Vérifier que c'est trié par nom en ordre croissant
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['Alpha', 'Beta', 'Charlie', 'NameOnly', 'StringHero'])
    })

    test('should sort by name in ascending order', async () => {
      const result = await getCharacters({ sort: 'name', order: 'asc' })
      
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['Alpha', 'Beta', 'Charlie', 'NameOnly', 'StringHero'])
    })

    test('should sort by name in descending order', async () => {
      const result = await getCharacters({ sort: 'name', order: 'desc' })
      
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['StringHero', 'NameOnly', 'Charlie', 'Beta', 'Alpha'])
    })

    test('should sort by modified date in ascending order', async () => {
      const result = await getCharacters({ sort: 'modified', order: 'asc' })
      
      // Filtrer seulement ceux qui ont une date de modification
      const withDates = result.filter(c => c && c.modified)
      const dates = withDates.map(c => c.modified)
      
      expect(dates).toEqual([
        '2023-01-01T00:00:00Z',
        '2023-02-01T00:00:00Z', 
        '2023-03-01T00:00:00Z'
      ])
    })

    test('should sort by modified date in descending order', async () => {
      const result = await getCharacters({ sort: 'modified', order: 'desc' })
      
      // Filtrer seulement ceux qui ont une date de modification
      const withDates = result.filter(c => c && c.modified)
      const dates = withDates.map(c => c.modified)
      
      expect(dates).toEqual([
        '2023-03-01T00:00:00Z',
        '2023-02-01T00:00:00Z',
        '2023-01-01T00:00:00Z'
      ])
    })

    test('should handle invalid sort parameter (defaults to name)', async () => {
      const result = await getCharacters({ sort: 'invalid', order: 'asc' })
      
      // Même résultat que le tri par nom par défaut
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['Alpha', 'Beta', 'Charlie', 'NameOnly', 'StringHero'])
    })

    test('should handle invalid order parameter (defaults to asc)', async () => {
      const result = await getCharacters({ sort: 'name', order: 'invalid' })
      
      // Même résultat que l'ordre croissant par défaut
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['Alpha', 'Beta', 'Charlie', 'NameOnly', 'StringHero'])
    })

    test('should handle empty options object', async () => {
      const result = await getCharacters({})
      
      const names = result.map(c => 
        typeof c === 'string' ? c : (c && (c.name || c.title || c.label) || '')
      ).filter(name => name !== '')
      
      expect(names).toEqual(['Alpha', 'Beta', 'Charlie', 'NameOnly', 'StringHero'])
    })

    test('should handle elements without names when sorting by modified', async () => {
      const result = await getCharacters({ sort: 'modified', order: 'asc' })
      
      // Tous les éléments doivent être présents, même ceux sans date
      expect(result).toHaveLength(7) // null, {}, 'StringHero', {name: 'NameOnly'}, Charlie, Alpha, Beta
      
      // Les éléments avec dates doivent être triés correctement
      const withDates = result.filter(c => c && c.modified)
      expect(withDates).toHaveLength(3)
      
      const dates = withDates.map(c => c.modified)
      expect(dates).toEqual([
        '2023-01-01T00:00:00Z',
        '2023-02-01T00:00:00Z',
        '2023-03-01T00:00:00Z'
      ])
    })
  })

  describe('getCharacterById', () => {
    test('find by numeric id', async () => {
      const result = await getCharacterById(1)
      expect(result).toEqual({ id: 1, name: 'Alpha', modified: '2023-01-01T00:00:00Z' })
    })

    test('find by id as string', async () => {
      const result = await getCharacterById('3')
      expect(result).toEqual({ id: '3', name: 'Charlie', modified: '2023-03-01T00:00:00Z' })
    })

    test('find string entry', async () => {
      const result = await getCharacterById('StringHero')
      expect(result).toBe('StringHero')
    })

    test('find by name when id missing', async () => {
      const result = await getCharacterById('NameOnly')
      expect(result).toEqual({ name: 'NameOnly' })
    })

    test('throws Response with 404 status when not found', async () => {
      try {
        await getCharacterById('not-present')
        // Si on arrive ici, le test doit échouer
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Response)
        expect(error.status).toBe(404)
      }
    })
  })
})

describe('edge cases - characters not an array', () => {
  test('getCharacters returns empty array when characters module is not an array', async () => {
    jest.resetModules()
    jest.doMock('../../data/characters.json', () => ({ foo: 'bar' }), { virtual: true })
    const { getCharacters: getChars } = require('./characters-api')
    const res = await getChars()
    expect(res).toEqual([])
  })

  test('getCharacterById returns null when characters module is not an array', async () => {
    jest.resetModules()
    jest.doMock('../../data/characters.json', () => null, { virtual: true })
    const { getCharacterById: getById } = require('./characters-api')
    const res = await getById(1)
    expect(res).toBeNull()
  })
})