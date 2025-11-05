import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout';
import '@testing-library/jest-dom';

// On dit à Jest d'ignorer l'import de App.css et de le remplacer par un objet vide.
// C'est la ligne qui résout le problème.
jest.mock('../App.css', () => ({}), { virtual: true });

// On mock l'import du package.json pour fournir une version de test
jest.mock('../../package.json', () => ({
  version: '1.0.0-test',
}));

describe('MainLayout', () => {
  test('renders all layout components correctly', () => {
    // On utilise MemoryRouter pour simuler le contexte de react-router-dom
    // On ajoute une route enfant pour tester que le composant <Outlet /> fonctionne
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Contenu de l'Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // 1. Vérifier le header et le logo
    expect(screen.getByAltText('Marvel logo')).toBeInTheDocument();

    // 2. Vérifier les liens de navigation
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /characters/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();

    // 3. Vérifier que le contenu de l'Outlet est bien rendu
    expect(screen.getByText("Contenu de l'Outlet")).toBeInTheDocument();

    // 4. Vérifier le footer avec le numéro de version mocké
    expect(screen.getByText('© Marvel App — v1.0.0-test')).toBeInTheDocument();
  });
});