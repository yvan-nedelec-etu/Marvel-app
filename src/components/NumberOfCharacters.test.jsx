// ...existing code...
import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NumberOfCharacters from './NumberOfCharacters';

describe('NumberOfCharacters component', () => {

    test('renders "There is no character" when characters array is empty', () => {
        render(<NumberOfCharacters characters={[]} />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });

    test('renders "There is 1 character" when characters array has one character', () => {
        const characters = ['Character 1'];
        render(<NumberOfCharacters characters={characters} />);
        expect(screen.getByText('There is 1 character')).toBeInTheDocument();
    });

    test('renders "There are 2 characters" when characters array has exactly two characters', () => {
        const characters = ['Character 1', 'Character 2'];
        render(<NumberOfCharacters characters={characters} />);
        expect(screen.getByText('There are 2 characters')).toBeInTheDocument();
    });

    test('renders plural "There are N characters" when characters array has multiple characters', () => {
        const characters = ['Character 1', 'Character 2', 'Character 3'];
        render(<NumberOfCharacters characters={characters} />);
        expect(screen.getByText('There are 3 characters')).toBeInTheDocument();
    });

    test('handles undefined characters prop (treat as empty)', () => {
        render(<NumberOfCharacters />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });

    test('handles null characters prop as empty', () => {
        render(<NumberOfCharacters characters={null} />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });

    test('handles object characters prop as empty', () => {
        render(<NumberOfCharacters characters={{}} />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });

    test('handles string characters prop as empty', () => {
        render(<NumberOfCharacters characters="not an array" />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });

    test('handles number characters prop as empty', () => {
        render(<NumberOfCharacters characters={123} />);
        expect(screen.getByText('There is no character')).toBeInTheDocument();
    });
});
// ...existing code...