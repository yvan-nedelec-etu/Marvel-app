import characters from '../../data/characters.json'

/**
 * Retourne la liste complète des personnages (simule une API async).
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
  return Array.isArray(characters) ? characters.slice() : []
}

/**
 * Retourne un personnage par id (number|string).
 * Lance une erreur si aucun personnage trouvé.
 * Renvoie null si le module characters n'est pas un tableau.
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function getCharacterById(id) {
  if (!Array.isArray(characters)) return null
  const sid = String(id)
  const found = characters.find(c => {
    if (!c) return false
    if (typeof c === 'string') return c === sid || c === id
    if (c.id !== undefined) return String(c.id) === sid
    if (c.name !== undefined) return String(c.name) === sid
    return false
  })

  if (!found) {
    throw new Error(`Character with id "${id}" not found`)
  }

  return found
}