import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('Home component', () => {
  test('renders page with correct heading and content', () => {
    renderWithRouter(<Home />)

    // Vérifier le heading h2
    const heading = screen.getByRole('heading', { level: 2, name: 'Home' })
    expect(heading).toBeInTheDocument()

    // Vérifier le contenu de bienvenue
    expect(screen.getByText('Welcome to the Marvel App.')).toBeInTheDocument()

    // Vérifier la structure section par tag
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  test('has correct semantic structure', () => {
    renderWithRouter(<Home />)

    // Vérifier que c'est bien dans une section par tag
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toContainElement(screen.getByRole('heading', { level: 2, name: 'Home' }))
  })
})