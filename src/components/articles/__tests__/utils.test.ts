import { formatDate } from "components/articles/utils";

describe('formatDate', () => {
    test('formats a valid date and handles invalid input', () => {
        // Valid date format
        expect(formatDate('2024-02-10T15:30:00Z')).toBe('February 10, 2024');
        expect(formatDate('2024-01-01T00:00:00Z')).toBe('January 1, 2024');

        // Invalid date input (should throw error)
        expect(() => formatDate('invalid-date')).toThrow('Invalid date format');
        expect(() => formatDate('')).toThrow('Invalid date format');

        // Invalid date with an incorrect month or day (should throw error)
        expect(() => formatDate('2024-13-01T00:00:00Z')).toThrow('Invalid date format');  // Invalid month
    });
});
