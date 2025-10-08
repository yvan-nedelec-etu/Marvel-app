import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('NotFound component', () => {
  test('renders 404 page with correct headings and content', () => {
    renderWithRouter(<NotFound />)

    // Vérifier le heading h1 avec "404"
    const h1Heading = screen.getByRole('heading', { level: 1, name: '404' })
    expect(h1Heading).toBeInTheDocument()

    // Vérifier le heading h2 avec "Page not found"
    const h2Heading = screen.getByRole('heading', { level: 2, name: 'Page not found' })
    expect(h2Heading).toBeInTheDocument()

    // Vérifier le message d'erreur
    expect(screen.getByText("La page demandée n'existe pas.")).toBeInTheDocument()

    // Vérifier la structure section par tag
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  test('displays home link correctly', () => {
    renderWithRouter(<NotFound />)

    // Vérifier le lien de retour à l'accueil
    const homeLink = screen.getByRole('link', { name: "Retour à l'accueil" })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('has correct styling structure', () => {
    renderWithRouter(<NotFound />)

    // Vérifier que la section a les styles appropriés par tag
    const section = document.querySelector('section')
    expect(section).toHaveStyle({ 
      padding: '4rem', 
      textAlign: 'center' 
    })

    // Vérifier le style du h1
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveStyle({ 
      fontSize: '4rem', 
      margin: '0' 
    })

    // Vérifier le style du h2
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2).toHaveStyle({ 
      margin: '0.5rem 0' 
    })
  })

  test('displays complete error message', () => {
    renderWithRouter(<NotFound />)

    // Vérifier que tout le contenu du paragraphe est présent
    expect(screen.getByText(/La page demandée n'existe pas/)).toBeInTheDocument()
    expect(screen.getByText(/Retour à l'accueil/)).toBeInTheDocument()
  })
})