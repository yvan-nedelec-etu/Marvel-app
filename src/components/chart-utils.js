/**
 * Transforme les données de statistiques en format utilisable par recharts/d3.js
 * @param {Object} data - Objet contenant les statistiques du personnage
 * @param {number} data.force - Valeur de force
 * @param {number} data.intelligence - Valeur d'intelligence
 * @param {number} data.energy - Valeur d'énergie
 * @param {number} data.speed - Valeur de vitesse
 * @param {number} data.durability - Valeur de durabilité
 * @param {number} data.fighting - Valeur de combat
 * @returns {Array<{name: string, value: number}>} Tableau formaté pour les graphiques
 */
export function prepareData(data) {
  // Retourner un tableau vide si aucune donnée n'est fournie
  if (!data || typeof data !== 'object') {
    return [];
  }

  // Mapping des clés vers les noms d'affichage
  const keyToNameMap = {
    force: 'Force',
    intelligence: 'Intelligence',
    energy: 'Energy',
    speed: 'Speed',
    durability: 'Durability',
    fighting: 'Fighting'
  };

  // Transformer l'objet en tableau, en filtrant les valeurs undefined
  const result = [];
  
  // Parcourir les clés dans l'ordre défini pour maintenir la cohérence
  const orderedKeys = ['force', 'intelligence', 'energy', 'speed', 'durability', 'fighting'];
  
  for (const key of orderedKeys) {
    // Vérifier si la propriété existe et n'est pas undefined
    if (data.hasOwnProperty(key) && data[key] !== undefined) {
      result.push({
        name: keyToNameMap[key],
        value: data[key]
      });
    }
  }

  return result;
}