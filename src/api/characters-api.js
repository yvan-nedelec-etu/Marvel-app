import characters from '../../data/characters.json'

/**
 * Retourne la liste complète des personnages (Promise).
 */
export async function getCharacters() {
  return Array.isArray(characters) ? characters.slice() : []
}

/**
 * Retourne un personnage par id (number|string). Retourne null si non trouvé.
 */
export async function getCharacterById(id) {
  if (!Array.isArray(characters)) return null
  const sid = String(id)
  const found = characters.find(c => {
    if (c == null) return false
    if (typeof c === 'string') return c === id || c === sid
    if (c.id !== undefined) return String(c.id) === sid
    if (c.name !== undefined) return String(c.name) === sid
    return false
  })
  return found || null
}