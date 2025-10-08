import characters from '../../data/characters.json'

/**
 * Retourne la liste complète des personnages triée (simule une API async).
 * @param {Object} options - Options de tri
 * @param {string} options.sort - Champ de tri ('name' ou 'modified')
 * @param {string} options.order - Ordre de tri ('asc' ou 'desc')
 * @returns {Promise<Array>}
 */
export async function getCharacters(options = {}) {
  if (!Array.isArray(characters)) return []
  
  // Valeurs par défaut - forcer name si sort invalide
  const { sort = 'name', order = 'asc' } = options
  const validSort = (sort === 'name' || sort === 'modified') ? sort : 'name'
  const validOrder = (order === 'asc' || order === 'desc') ? order : 'asc'
  
  // Copie du tableau pour éviter de modifier l'original
  const sortedCharacters = [...characters]
  
  // Fonction de tri
  sortedCharacters.sort((a, b) => {
    let valueA, valueB
    
    // Extraction des valeurs selon le type d'élément
    if (typeof a === 'string') {
      valueA = validSort === 'name' ? a : '' // String = nom, pas de date
    } else if (a && typeof a === 'object') {
      valueA = validSort === 'name' ? (a.name || a.title || a.label || '') : (a.modified || '')
    } else {
      valueA = '' // null, undefined, etc.
    }
    
    if (typeof b === 'string') {
      valueB = validSort === 'name' ? b : '' // String = nom, pas de date
    } else if (b && typeof b === 'object') {
      valueB = validSort === 'name' ? (b.name || b.title || b.label || '') : (b.modified || '')
    } else {
      valueB = '' // null, undefined, etc.
    }
    
    // Conversion en string pour comparaison uniforme
    const strA = String(valueA).toLowerCase()
    const strB = String(valueB).toLowerCase()
    
    // Comparaison
    let result = 0
    if (strA < strB) result = -1
    else if (strA > strB) result = 1
    
    // Inversion si ordre décroissant
    return validOrder === 'desc' ? -result : result
  })
  
  return sortedCharacters
}

/**
 * Retourne un personnage par id (number|string).
 * Lance une Response 404 si aucun personnage trouvé.
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
    throw new Response('Not Found', { status: 404 })
  }

  return found
}