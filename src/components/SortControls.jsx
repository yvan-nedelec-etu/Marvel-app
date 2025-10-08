import { useSearchParams } from 'react-router-dom'

export default function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Récupérer les valeurs actuelles ou utiliser les valeurs par défaut
  const currentSort = searchParams.get('sort') || 'name'
  const currentOrder = searchParams.get('order') || 'asc'

  const handleSortChange = (event) => {
    const newSort = event.target.value
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('sort', newSort)
      return newParams
    })
  }

  const handleOrderChange = (event) => {
    const newOrder = event.target.value
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('order', newOrder)
      return newParams
    })
  }

  return (
    <div className="sort-controls" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div>
        <label htmlFor="sort-select" style={{ marginRight: '0.5rem' }}>
          Sort by:
        </label>
        <select 
          id="sort-select"
          value={currentSort} 
          onChange={handleSortChange}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="name">Name</option>
          <option value="modified">Modified Date</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="order-select" style={{ marginRight: '0.5rem' }}>
          Order:
        </label>
        <select 
          id="order-select"
          value={currentOrder} 
          onChange={handleOrderChange}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}