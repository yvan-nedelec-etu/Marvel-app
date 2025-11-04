import { prepareData } from './chart-utils';

describe('prepareData', () => {
    it('should return an empty array when no data is provided', () => {
        const result = prepareData();
        expect(result).toEqual([]);
    });

    it('should return the correct transformed data when all values are provided', () => {
        const data = {
            force: 10,
            intelligence: 8,
            energy: 7,
            speed: 9,
            durability: 6,
            fighting: 5,
        };
        const expected = [
            { name: 'Force', value: 10 },
            { name: 'Intelligence', value: 8 },
            { name: 'Energy', value: 7 },
            { name: 'Speed', value: 9 },
            { name: 'Durability', value: 6 },
            { name: 'Fighting', value: 5 },
        ];
        const result = prepareData(data);
        expect(result).toEqual(expected);
    });

    it('should filter out elements with undefined values', () => {
        const data = {
            force: 10,
            intelligence: undefined,
            energy: 7,
            speed: undefined,
            durability: 6,
            fighting: 5,
        };
        const expected = [
            { name: 'Force', value: 10 },
            { name: 'Energy', value: 7 },
            { name: 'Durability', value: 6 },
            { name: 'Fighting', value: 5 },
        ];
        const result = prepareData(data);
        expect(result).toEqual(expected);
    });

    it('should handle partial data correctly', () => {
        const data = {
            force: 10,
            energy: 7,
        };
        const expected = [
            { name: 'Force', value: 10 },
            { name: 'Energy', value: 7 },
        ];
        const result = prepareData(data);
        expect(result).toEqual(expected);
    });
});