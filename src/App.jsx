import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
        <li>Beast</li>
        <li>Captain America</li>
        <li>Deadpool</li>
      </ul>
    </>
  )
}
export default App
