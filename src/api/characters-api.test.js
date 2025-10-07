jest.mock('../../data/characters.json', () => [
  null,
  {},
  'StringHero',
  { name: 'NameOnly' },
  { id: '3', name: 'Three' },
  { id: 1, name: 'Character One' },
  { id: 2, name: 'Character Two' },
], { virtual: true })

import characters from '../../data/characters.json'
import { getCharacters, getCharacterById } from './characters-api'

describe('characters-api', () => {
  describe('getCharacters', () => {
    test('should return the list of characters', async () => {
      const result = await getCharacters()
      expect(result).toEqual(characters)
    })
  })

  describe('getCharacterById', () => {
    test('find by numeric id', async () => {
      const result = await getCharacterById(1)
      expect(result).toEqual({ id: 1, name: 'Character One' })
    })

    test('find by id as string', async () => {
      const result = await getCharacterById('3')
      expect(result).toEqual({ id: '3', name: 'Three' })
    })

    test('find string entry', async () => {
      const result = await getCharacterById('StringHero')
      expect(result).toBe('StringHero')
    })

    test('find by name when id missing', async () => {
      const result = await getCharacterById('NameOnly')
      expect(result).toEqual({ name: 'NameOnly' })
    })

    test('rejects when not found', async () => {
      await expect(getCharacterById('not-present')).rejects.toThrow('Character with id "not-present" not found')
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