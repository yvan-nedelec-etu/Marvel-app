import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact'

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('Contact component', () => {
  test('renders page with correct heading and content', () => {
    renderWithRouter(<Contact />)

    // Vérifier le heading h2
    const heading = screen.getByRole('heading', { level: 2, name: 'Contact Us' })
    expect(heading).toBeInTheDocument()

    // Vérifier le contenu avec l'email
    expect(screen.getByText('Feel free to contact us at marvelApp@gmail.com')).toBeInTheDocument()

    // Vérifier la structure section par tag
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  test('displays contact information correctly', () => {
    renderWithRouter(<Contact />)

    // Vérifier que l'email est présent
    expect(screen.getByText(/marvelApp@gmail.com/)).toBeInTheDocument()
    expect(screen.getByText(/Feel free to contact us/)).toBeInTheDocument()
  })
})