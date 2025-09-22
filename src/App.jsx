import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import characters from '../data/characters.json'
import CharactersList from './components/CharactersList'
import NumberOfCharacters from './components/NumberOfCharacters'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://but-sd.github.io/prez/marvel.png" target="_blank" rel="noopener">
          <img src="https://but-sd.github.io/prez/marvel.png" className="logo marvel" alt="Marvel logo" />
        </a>
      </div>
      <h1>Marvel App</h1>
      <CharactersList characters={characters} />
      <NumberOfCharacters characters={characters} /> 
    </>
  )
}
export default App
