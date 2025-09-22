// ...existing code...
import { useState } from 'react'
import './App.css'
import MainLayout from './layout/layout.jsx'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CharactersPage from './pages/CharactersPage'
import About from './pages/About'
import Contact from './pages/Contact'

function NotFound() {
  return (
    <section>
      <h2>404 — Not Found</h2>
      <p>La page demandée n'existe pas.</p>
    </section>
  )
}

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}