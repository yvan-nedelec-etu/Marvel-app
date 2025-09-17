import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import characters from '../data/characters.json'

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

      <ul id="characters">
        {Array.isArray(characters) ? (
          characters.map((c, i) => {
            const label = typeof c === 'string' ? c : (c && (c.name || c.title || c.label)) || JSON.stringify(c)
            return <li key={i}>{label}</li>
          })
        ) : (
          <li>No characters</li>
        )}
      </ul>
    </>
  )
}
export default App
