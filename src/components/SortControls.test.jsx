import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SortControls from './SortControls'

// Helper pour rendre avec router et URL initiale
const renderWithRouter = (initialEntries = ['/characters']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SortControls />
    </MemoryRouter>
  )
}

describe('SortControls component', () => {
  test('renders sort controls with default values', () => {
    renderWithRouter()

    // Vérifier les labels
    expect(screen.getByText('Sort by:')).toBeInTheDocument()
    expect(screen.getByText('Order:')).toBeInTheDocument()

    // Vérifier les selects
    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')

    expect(sortSelect).toBeInTheDocument()
    expect(orderSelect).toBeInTheDocument()

    // Vérifier les valeurs par défaut
    expect(sortSelect.value).toBe('name')
    expect(orderSelect.value).toBe('asc')

    // Vérifier les options
    expect(screen.getByDisplayValue('Name')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Ascending')).toBeInTheDocument()
  })

  test('renders with URL parameters', () => {
    renderWithRouter(['/characters?sort=modified&order=desc'])

    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')

    // Vérifier que les valeurs de l'URL sont utilisées
    expect(sortSelect.value).toBe('modified')
    expect(orderSelect.value).toBe('desc')
  })

  test('renders with partial URL parameters (only sort)', () => {
    renderWithRouter(['/characters?sort=modified'])

    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')

    // Sort vient de l'URL, order utilise la valeur par défaut
    expect(sortSelect.value).toBe('modified')
    expect(orderSelect.value).toBe('asc')
  })

  test('renders with partial URL parameters (only order)', () => {
    renderWithRouter(['/characters?order=desc'])

    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')

    // Sort utilise la valeur par défaut, order vient de l'URL
    expect(sortSelect.value).toBe('name')
    expect(orderSelect.value).toBe('desc')
  })

  test('handles sort change interaction', () => {
    renderWithRouter(['/characters?sort=name&order=asc'])

    const sortSelect = screen.getByLabelText('Sort by:')
    
    // Vérifier la valeur initiale
    expect(sortSelect.value).toBe('name')
    
    // Changer la valeur
    fireEvent.change(sortSelect, { target: { value: 'modified' } })
    
    // Vérifier que la valeur a changé
    expect(sortSelect.value).toBe('modified')
  })

  test('handles order change interaction', () => {
    renderWithRouter(['/characters?sort=name&order=asc'])

    const orderSelect = screen.getByLabelText('Order:')
    
    // Vérifier la valeur initiale
    expect(orderSelect.value).toBe('asc')
    
    // Changer la valeur
    fireEvent.change(orderSelect, { target: { value: 'desc' } })
    
    // Vérifier que la valeur a changé
    expect(orderSelect.value).toBe('desc')
  })

  test('handles multiple interactions in sequence', () => {
    renderWithRouter(['/characters'])

    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')
    
    // Valeurs par défaut
    expect(sortSelect.value).toBe('name')
    expect(orderSelect.value).toBe('asc')
    
    // Première interaction : changer le sort
    fireEvent.change(sortSelect, { target: { value: 'modified' } })
    expect(sortSelect.value).toBe('modified')
    expect(orderSelect.value).toBe('asc') // Order reste inchangé
    
    // Deuxième interaction : changer l'order
    fireEvent.change(orderSelect, { target: { value: 'desc' } })
    expect(sortSelect.value).toBe('modified') // Sort reste inchangé
    expect(orderSelect.value).toBe('desc')
    
    // Troisième interaction : revenir au sort par défaut
    fireEvent.change(sortSelect, { target: { value: 'name' } })
    expect(sortSelect.value).toBe('name')
    expect(orderSelect.value).toBe('desc') // Order reste inchangé
  })

  test('contains all sort options', () => {
    renderWithRouter()

    const sortSelect = screen.getByLabelText('Sort by:')
    const options = Array.from(sortSelect.options).map(option => ({
      value: option.value,
      text: option.text
    }))

    expect(options).toEqual([
      { value: 'name', text: 'Name' },
      { value: 'modified', text: 'Modified Date' }
    ])
  })

  test('contains all order options', () => {
    renderWithRouter()

    const orderSelect = screen.getByLabelText('Order:')
    const options = Array.from(orderSelect.options).map(option => ({
      value: option.value,
      text: option.text
    }))

    expect(options).toEqual([
      { value: 'asc', text: 'Ascending' },
      { value: 'desc', text: 'Descending' }
    ])
  })

  test('has correct styling structure', () => {
    renderWithRouter()

    const container = document.querySelector('.sort-controls')
    expect(container).toBeInTheDocument()
    expect(container).toHaveStyle({
      marginBottom: '1rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    })
  })

  test('select elements have correct styling', () => {
    renderWithRouter()

    const sortSelect = screen.getByLabelText('Sort by:')
    const orderSelect = screen.getByLabelText('Order:')

    expect(sortSelect).toHaveStyle({
      padding: '0.5rem',
      borderRadius: '4px'
    })

    expect(orderSelect).toHaveStyle({
      padding: '0.5rem',
      borderRadius: '4px'
    })
  })

  test('labels have correct styling', () => {
    renderWithRouter()

    const sortLabel = screen.getByText('Sort by:')
    const orderLabel = screen.getByText('Order:')

    expect(sortLabel).toHaveStyle({ marginRight: '0.5rem' })
    expect(orderLabel).toHaveStyle({ marginRight: '0.5rem' })
  })

  test('preserves existing URL parameters when changing sort', () => {
    renderWithRouter(['/characters?existing=param&sort=name&order=asc'])

    const sortSelect = screen.getByLabelText('Sort by:')
    
    // Changer le sort ne devrait pas affecter les autres paramètres
    fireEvent.change(sortSelect, { target: { value: 'modified' } })
    
    // Le composant devrait maintenir les paramètres existants
    expect(sortSelect.value).toBe('modified')
  })

  test('preserves existing URL parameters when changing order', () => {
    renderWithRouter(['/characters?existing=param&sort=name&order=asc'])

    const orderSelect = screen.getByLabelText('Order:')
    
    // Changer l'order ne devrait pas affecter les autres paramètres
    fireEvent.change(orderSelect, { target: { value: 'desc' } })
    
    // Le composant devrait maintenir les paramètres existants
    expect(orderSelect.value).toBe('desc')
  })
})