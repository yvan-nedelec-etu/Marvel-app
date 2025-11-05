import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import RechartsPieChart from './RechartsPieChart';
import { prepareData } from './chart-utils';

// Mock ResizeObserver qui n'est pas disponible dans JSDOM
global.ResizeObserver = class ResizeObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        this.callback([{ contentRect: { width: 400, height: 400 } }]);
    }
    unobserve() {}
    disconnect() {}
};

// Mock de la fonction prepareData
jest.mock('./chart-utils', () => ({
    prepareData: jest.fn(),
}));

// Mock des composants Recharts pour capturer leurs props
// C'est la partie cruciale qui est corrigée
jest.mock('recharts', () => {
    const OriginalRecharts = jest.requireActual('recharts');
    
    // On utilise un objet pour stocker les props capturées
    const propsStore = {};

    return {
        ...OriginalRecharts,
        ResponsiveContainer: ({ children }) => <div className="recharts-responsive-container">{children}</div>,
        PieChart: ({ children }) => <div>{children}</div>,
        Pie: (props) => {
            propsStore.Pie = props; // Stocker les props de Pie
            return <div>{props.children}</div>;
        },
        Cell: ({ fill }) => <div data-testid="cell" data-fill={fill}></div>,
        Tooltip: (props) => {
            propsStore.Tooltip = props; // Stocker les props de Tooltip
            return <div></div>;
        },
        Legend: () => <div></div>,
        // On exporte le store pour y accéder dans les tests
        __propsStore: propsStore,
    };
});

// On importe le store exporté par le mock
const { __propsStore: propsStore } = require('recharts');

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
        // Vider le store de props avant chaque test
        delete propsStore.Pie;
        delete propsStore.Tooltip;
    });

    test('renders RechartsPieChart with data', () => {
        render(<RechartsPieChart data={mockData} />);
        expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
        expect(prepareData).toHaveBeenCalledWith(mockData);
    });

    test('renders "No data available" when data is empty', () => {
        prepareData.mockReturnValue([]);
        render(<RechartsPieChart data={{}} />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    // TEST SPÉCIFIQUE POUR LA LIGNE 54 (label)
    test('covers the Pie label function', () => {
        render(<RechartsPieChart data={mockData} />);

        // 1. Récupérer la fonction `label` depuis le store de props
        const labelFn = propsStore.Pie.label;
        expect(labelFn).toBeInstanceOf(Function);

        // 2. Exécuter la fonction avec des données de test
        const result = labelFn({ name: 'Force', value: 10 });

        // 3. Vérifier que le résultat est correct
        expect(result).toBe('Force: 10');
    });

    // TEST SPÉCIFIQUE POUR LA LIGNE 69 (formatter)
    test('covers the Tooltip formatter function', () => {
        render(<RechartsPieChart data={mockData} />);

        // 1. Récupérer la fonction `formatter` depuis le store de props
        const formatterFn = propsStore.Tooltip.formatter;
        expect(formatterFn).toBeInstanceOf(Function);

        // 2. Exécuter la fonction avec des données de test
        const result = formatterFn(10, 'Force');

        // 3. Vérifier que le résultat est correct
        expect(result).toEqual([10, 'Force']);
    });

    // Test pour couvrir le map des <Cell />
    test('renders all Cell components with proper colors', () => {
        render(<RechartsPieChart data={mockData} />);

        const cells = screen.getAllByTestId('cell');
        expect(cells).toHaveLength(preparedData.length);

        const expectedColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];
        cells.forEach((cell, index) => {
            expect(cell).toHaveAttribute('data-fill', expectedColors[index % expectedColors.length]);
        });
    });
});