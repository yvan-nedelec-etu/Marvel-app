import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import MainLayout from './layout/layout.jsx'
import Home from './pages/Home'
import CharactersPage, { loader as charactersLoader } from './pages/CharactersPage'
import CharacterDetailPage, { loader as characterLoader } from './pages/CharacterDetailPage'
// ...existing code... // <-- ajouté
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// route config avec loader pour /characters
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'characters', element: <CharactersPage />, loader: charactersLoader },
      { path: 'characters/:id', element: <CharacterDetailPage />, loader: characterLoader }, // <-- ajouté
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)