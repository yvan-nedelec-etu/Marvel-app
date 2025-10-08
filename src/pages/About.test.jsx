import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('About component', () => {
  test('renders page with correct heading and content', () => {
    renderWithRouter(<About />)

    // Vérifier le heading h1 (attention, c'est h1 pas h2)
    const heading = screen.getByRole('heading', { level: 1, name: 'Marvel App' })
    expect(heading).toBeInTheDocument()

    // Vérifier le contenu descriptif
    expect(screen.getByText('We are a team of marvel fans who love to create some awesome apps !')).toBeInTheDocument()

    // Vérifier la structure section par tag
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  test('displays team information correctly', () => {
    renderWithRouter(<About />)

    // Vérifier que l'information de l'équipe est présente
    expect(screen.getByText(/team of marvel fans/)).toBeInTheDocument()
    expect(screen.getByText(/awesome apps/)).toBeInTheDocument()
  })
})