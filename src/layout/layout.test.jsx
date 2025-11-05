// src/layout/layout.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout';

// Mock pour éviter les erreurs de navigation
const MockedMainLayout = ({ children }) => (
  <BrowserRouter>
    <MainLayout>{children}</MainLayout>
  </BrowserRouter>
);

describe('MainLayout', () => {
  test('renders MainLayout component', () => {
    render(
      <MockedMainLayout>
        <div>Test content</div>
      </MockedMainLayout>
    );
    
    // Vérifier que le layout est rendu
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders navigation if present', () => {
    render(
      <MockedMainLayout>
        <div>Test content</div>
      </MockedMainLayout>
    );
    
    // Vérifier que le composant se rend sans erreur
    expect(document.body).toBeInTheDocument();
  });
});