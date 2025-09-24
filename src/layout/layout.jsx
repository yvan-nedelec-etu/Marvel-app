import { Link, Outlet } from 'react-router-dom'
import '../App.css'
import './layout.css'

export default function MainLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner"> {/* conteneur centré pour le logo */}
          <div className="logo-wrap">
            <a href="https://but-sd.github.io/prez/marvel.png" target="_blank" rel="noopener noreferrer">
              <img src="https://but-sd.github.io/prez/marvel.png" className="logo marvel" alt="Marvel logo" />
            </a>
          </div>
        </div>

        {/* nav pleine largeur : nav-inner centre les liens */}
        <nav className="app-nav">
          <div className="nav-inner">
            <Link to="/">Home</Link>
            <Link to="/characters">Characters</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      </header>

      <div className="app-body">
        <aside className="app-sidebar"></aside>

        <main className="app-content">
          <Outlet />
        </main>
      </div>

      <footer className="app-footer">© Marvel App</footer>
    </div>
  )
}