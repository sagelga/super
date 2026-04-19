import { formatDate } from '@/utils/formatDate';

describe('formatDate', () => {
    describe('with string input', () => {
        it('formats an ISO date string in English by default', () => {
            const result = formatDate('2024-01-15');
            expect(result).toContain('2024');
            expect(result).toContain('15');
        });

        it('formats an ISO date string in Thai locale', () => {
            const result = formatDate('2024-01-15', 'th');
            expect(result).toContain('2567'); // Thai Buddhist year (2024 + 543)
        });

        it('formats an ISO date string in Chinese locale', () => {
            const result = formatDate('2024-01-15', 'zh');
            expect(result).toContain('2024');
        });

        it('falls back to en-US for unknown locale', () => {
            const result = formatDate('2024-01-15', 'fr');
            expect(result).toContain('2024');
        });
    });

    describe('with Date object input', () => {
        it('formats a Date object correctly', () => {
            const date = new Date(2024, 0, 15); // Jan 15, 2024
            const result = formatDate(date, 'en');
            expect(result).toContain('2024');
            expect(result).toContain('15');
        });

        it('formats a Date object with Thai locale', () => {
            const date = new Date(2024, 0, 15);
            const result = formatDate(date, 'th');
            expect(result).toContain('2567');
        });
    });

    describe('with custom options', () => {
        it('uses provided Intl.DateTimeFormatOptions over defaults', () => {
            const result = formatDate('2024-01-15', 'en', {
                year: '2-digit',
                month: 'short',
            });
            expect(result).toContain('24');
        });

        it('formats with numeric month option', () => {
            const result = formatDate('2024-06-20', 'en', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            expect(result).toContain('2024');
            expect(result).toContain('20');
        });
    });

    describe('default locale', () => {
        it('defaults to English when no locale provided', () => {
            const withDefault = formatDate('2024-01-15');
            const withEn = formatDate('2024-01-15', 'en');
            expect(withDefault).toBe(withEn);
        });
    });
});
