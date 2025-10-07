import characters from '../../data/characters.json'

/**
 * Retourne la liste complète des personnages (simule une API async).
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
  return Array.isArray(characters) ? characters.slice() : []
}

/**
 * Retourne un personnage par id (number|string). Retourne null si non trouvé.
 * @param {string|number} id
 * @returns {Promise<Object|null>}
 */
export async function getCharacterById(id) {
  if (!Array.isArray(characters)) return null
  const sid = String(id)
  return (
    characters.find(c => {
      if (!c) return false
      if (typeof c === 'string') return c === sid || c === id
      if (c.id !== undefined) return String(c.id) === sid
      if (c.name !== undefined) return String(c.name) === sid
      return false
    }) || null
  )
}