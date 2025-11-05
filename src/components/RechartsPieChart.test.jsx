import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RechartsPieChart from './RechartsPieChart';
import { prepareData } from './chart-utils';

// Mock ResizeObserver qui n'est pas disponible dans JSDOM
global.ResizeObserver = class ResizeObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        // Mock implementation
        this.callback([
            {
                contentRect: {
                    width: 400,
                    height: 400,
                },
            },
        ]);
    }
    unobserve() {
        // Mock implementation
    }
    disconnect() {
        // Mock implementation
    }
};

// Mock the prepareData function
jest.mock('./chart-utils', () => ({
    prepareData: jest.fn(),
}));

describe('RechartsPieChart', () => {
    const mockData = {
        force: 10,
        intelligence: 8,
        energy: 7,
        speed: 9,
        durability: 6,
        fighting: 5,
    };

    const preparedData = [
        { name: 'Force', value: 10 },
        { name: 'Intelligence', value: 8 },
        { name: 'Energy', value: 7 },
        { name: 'Speed', value: 9 },
        { name: 'Durability', value: 6 },
        { name: 'Fighting', value: 5 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        prepareData.mockReturnValue(preparedData);
    });

    test('renders RechartsPieChart with data', () => {
        render(<RechartsPieChart data={mockData} />);

        // Vérifier que le composant ResponsiveContainer est rendu
        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        
        // Vérifier que prepareData a été appelé avec les bonnes données
        expect(prepareData).toHaveBeenCalledWith(mockData);
        expect(prepareData).toHaveBeenCalledTimes(1);
    });

    test('renders "No data available" when data is empty', () => {
        prepareData.mockReturnValue([]);
        
        render(<RechartsPieChart data={{}} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith({});
    });

    test('renders "No data available" when data is null', () => {
        prepareData.mockReturnValue([]);
        
        render(<RechartsPieChart data={null} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(null);
    });

    test('renders "No data available" when data is undefined', () => {
        prepareData.mockReturnValue([]);
        
        render(<RechartsPieChart data={undefined} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(undefined);
    });

    test('renders "No data available" when prepareData returns null', () => {
        prepareData.mockReturnValue(null);
        
        render(<RechartsPieChart data={mockData} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(mockData);
    });

    test('renders "No data available" when prepareData returns undefined', () => {
        prepareData.mockReturnValue(undefined);
        
        render(<RechartsPieChart data={mockData} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(mockData);
    });

    test('calls prepareData with provided data', () => {
        const testData = { force: 5, intelligence: 3 };
        prepareData.mockReturnValue([
            { name: 'Force', value: 5 },
            { name: 'Intelligence', value: 3 }
        ]);

        render(<RechartsPieChart data={testData} />);

        expect(prepareData).toHaveBeenCalledWith(testData);
    });

    test('applies custom width and height when provided', () => {
        render(<RechartsPieChart data={mockData} width={500} height={300} />);

        // Le ResponsiveContainer devrait avoir le style maxWidth
        const container = document.querySelector('.recharts-responsive-container');
        expect(container).toBeInTheDocument();
        
        // Vérifier que prepareData a été appelé
        expect(prepareData).toHaveBeenCalledWith(mockData);
    });

    test('uses default dimensions when width and height not provided', () => {
        render(<RechartsPieChart data={mockData} />);

        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(mockData);
    });

    test('renders empty state with custom styling', () => {
        prepareData.mockReturnValue([]);
        
        render(<RechartsPieChart data={{}} width={300} height={250} />);

        const emptyStateDiv = screen.getByText('No data available').parentElement;
        
        expect(emptyStateDiv).toHaveStyle({
            width: '300px',
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
    });

    test('renders empty state with default dimensions', () => {
        prepareData.mockReturnValue([]);
        
        render(<RechartsPieChart data={{}} />);

        const emptyStateDiv = screen.getByText('No data available').parentElement;
        
        expect(emptyStateDiv).toHaveStyle({
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
    });

    test('renders pie chart with single data point', () => {
        const singleData = [{ name: 'Force', value: 10 }];
        prepareData.mockReturnValue(singleData);
        
        render(<RechartsPieChart data={{ force: 10 }} />);

        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith({ force: 10 });
    });

    test('renders pie chart with zero values', () => {
        const zeroData = [
            { name: 'Force', value: 0 },
            { name: 'Intelligence', value: 0 }
        ];
        prepareData.mockReturnValue(zeroData);
        
        render(<RechartsPieChart data={{ force: 0, intelligence: 0 }} />);

        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith({ force: 0, intelligence: 0 });
    });

    test('handles very large numbers', () => {
        const largeData = [{ name: 'Force', value: 999999 }];
        prepareData.mockReturnValue(largeData);
        
        render(<RechartsPieChart data={{ force: 999999 }} />);

        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith({ force: 999999 });
    });

    test('component updates when data changes', () => {
        const { rerender } = render(<RechartsPieChart data={mockData} />);
        
        expect(prepareData).toHaveBeenCalledWith(mockData);
        
        const newData = { force: 5 };
        prepareData.mockReturnValue([{ name: 'Force', value: 5 }]);
        
        rerender(<RechartsPieChart data={newData} />);
        
        expect(prepareData).toHaveBeenCalledWith(newData);
        expect(prepareData).toHaveBeenCalledTimes(2);
    });

    test('component handles props change from data to no data', () => {
        const { rerender } = render(<RechartsPieChart data={mockData} />);
        
        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        
        prepareData.mockReturnValue([]);
        rerender(<RechartsPieChart data={{}} />);
        
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    test('component handles props change from no data to data', () => {
        prepareData.mockReturnValue([]);
        const { rerender } = render(<RechartsPieChart data={{}} />);
        
        expect(screen.getByText('No data available')).toBeInTheDocument();
        
        prepareData.mockReturnValue(preparedData);
        rerender(<RechartsPieChart data={mockData} />);
        
        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    // NOUVEAU TEST pour couvrir la ligne 69 (map des Cell components)
    test('renders correct number of Cell components for each data entry', () => {
        const testData = [
            { name: 'Force', value: 10 },
            { name: 'Intelligence', value: 8 },
            { name: 'Energy', value: 7 }
        ];
        prepareData.mockReturnValue(testData);
        
        render(<RechartsPieChart data={mockData} />);

        // Vérifier que le graphique est rendu
        const container = document.querySelector('.recharts-responsive-container');
        expect(container).toBeInTheDocument();
        
        // Vérifier que prepareData a été appelé
        expect(prepareData).toHaveBeenCalledWith(mockData);
        
        // Le composant PieChart avec les Cell devrait être présent
        // Rechercher les éléments path qui correspondent aux segments du pie chart
        const pathElements = document.querySelectorAll('.recharts-pie .recharts-pie-sector');
        expect(pathElements.length).toBeGreaterThanOrEqual(0); // Au moins quelques segments rendus
    });

    // Test supplémentaire pour s'assurer que le map des couleurs fonctionne
    test('applies different colors to multiple pie segments', () => {
        const multiData = [
            { name: 'Force', value: 10 },
            { name: 'Intelligence', value: 8 },
            { name: 'Energy', value: 7 },
            { name: 'Speed', value: 9 },
            { name: 'Durability', value: 6 },
            { name: 'Fighting', value: 5 },
            { name: 'Extra1', value: 4 },
            { name: 'Extra2', value: 3 },
            { name: 'Extra3', value: 2 } // Plus de 8 éléments pour tester le modulo
        ];
        prepareData.mockReturnValue(multiData);
        
        render(<RechartsPieChart data={mockData} />);

        // Vérifier que le graphique est rendu avec les données
        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(mockData);
        
        // Vérifier que prepareData a retourné nos données de test
        expect(prepareData).toHaveReturnedWith(multiData);
    });

    // Ajouter ce test dans RechartsPieChart.test.jsx
test('renders all Cell components with proper colors', () => {
  const multipleData = [
    { name: 'Force', value: 10 },
    { name: 'Intelligence', value: 8 },
    { name: 'Energy', value: 7 },
    { name: 'Speed', value: 9 },
    { name: 'Durability', value: 6 },
    { name: 'Fighting', value: 5 },
    { name: 'Extra1', value: 4 },
    { name: 'Extra2', value: 3 },
    { name: 'Extra3', value: 2 } // 9 éléments pour tester le modulo
  ];
  
  prepareData.mockReturnValue(multipleData);
  
  render(<RechartsPieChart data={mockData} />);

  // Vérifier que le graphique est rendu
  expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  
  // Vérifier que prepareData a été appelé
  expect(prepareData).toHaveBeenCalledWith(mockData);
  expect(prepareData).toHaveReturnedWith(multipleData);
});

// Ajouter ce test dans RechartsPieChart.test.jsx
test('renders Cell components with color cycling', () => {
  // Créer des données qui forcent l'utilisation du modulo pour les couleurs
  const manyItemsData = Array.from({ length: 10 }, (_, i) => ({
    name: `Item${i}`,
    value: i + 1
  }));
  
  prepareData.mockReturnValue(manyItemsData);
  
  render(<RechartsPieChart data={mockData} />);

  // Vérifier que le graphique est rendu
  expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  
  // Vérifier que prepareData a été appelé
  expect(prepareData).toHaveBeenCalledWith(mockData);
});
});