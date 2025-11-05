import React, { useState, useEffect } from 'react';
import { getCharacters } from '../api/characters-api';
import RadarChart from '../components/RadarChart';
import '../App.css';

export default function Compare() {
  const [characters, setCharacters] = useState([]);
  const [char1, setChar1] = useState(null);
  const [char2, setChar2] = useState(null);

  // Charger la liste de tous les personnages au montage du composant
  useEffect(() => {
    getCharacters().then(data => {
      // On trie par nom pour une meilleure expérience utilisateur dans la liste
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setCharacters(sortedData);
    });
  }, []);

  const handleSelectChar1 = (e) => {
    const selectedId = e.target.value;
    const character = characters.find(c => c.id.toString() === selectedId);
    setChar1(character);
  };

  const handleSelectChar2 = (e) => {
    const selectedId = e.target.value;
    const character = characters.find(c => c.id.toString() === selectedId);
    setChar2(character);
  };

  // On vérifie si les deux personnages sélectionnés ont bien l'objet 'capacities'
  const canCompare = char1 && char2 && char1.capacities && char2.capacities;

  return (
    <div className="compare-page">
      <h2>Character Comparison</h2>
      <div className="selectors">
        <div className="selector-container">
          <label htmlFor="char1-select">Choose Character 1:</label>
          <select id="char1-select" onChange={handleSelectChar1} defaultValue="">
            <option value="" disabled>Select a character</option>
            {characters.map(char => (
              <option key={`char1-${char.id}`} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>
        <div className="selector-container">
          <label htmlFor="char2-select">Choose Character 2:</label>
          <select id="char2-select" onChange={handleSelectChar2} defaultValue="">
            <option value="" disabled>Select a character</option>
            {characters.map(char => (
              <option key={`char2-${char.id}`} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-container">
        {canCompare ? (
          <RadarChart char1={char1} char2={char2} />
        ) : (
          <p>Please select two characters with available stats to compare.</p>
        )}
      </div>
    </div>
  );
}