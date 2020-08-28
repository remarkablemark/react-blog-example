import {
  capitalizeWords,
  getFullYear,
  truncate,
} from './utilities';

describe('utilities', () => {
  describe('capitalizeWords', () => {
    it('capitalizes 1 word', () => {
      expect(capitalizeWords('foo')).toBe('Foo');
    });

    it('capitalizes 2 words', () => {
      expect(capitalizeWords('foo bar')).toBe('Foo Bar');
    });

    it('capitalizes 3 words', () => {
      expect(capitalizeWords(' foo  bar  baz ')).toBe('Foo Bar Baz');
    });

    it('capitalizes words that have capitals', () => {
      expect(capitalizeWords('foo Bar baz Qux')).toBe('Foo Bar Baz Qux');
    });
  });

  describe('getFullYear', () => {
    const _Date = Date;

    beforeAll(() => {
      global.Date = jest.fn(() => ({
        getFullYear: () => 2020,
      }));
    });

    afterAll(() => {
      global.Date = _Date;
    });

    it('returns full year', () => {
      expect(getFullYear()).toBe(2020);
    });
  });

  describe('truncate', () => {
    it('returns blank string if type is invalid', () => {
      expect(truncate(42)).toBe('');
      expect(truncate(null)).toBe('');
      expect(truncate(undefined)).toBe('');
      expect(truncate({})).toBe('');
      expect(truncate([])).toBe('');
      expect(truncate(Function)).toBe('');
    });

    it('truncates string based on limit', () => {
      const string = '123456789';
      const limit = 5;
      expect(truncate(string, limit)).toBe(string.substring(0, limit));
    });

    it('truncates and then trims whitespace', () => {
      const string = '1234 6789';
      const limit = 5;
      expect(truncate(string, limit)).toBe(string.substring(0, limit).trim());
    });

    it('truncates and then trims whitespace and periods', () => {
      const string = '123. 6789';
      const limit = 5;
      expect(truncate(string, limit)).toBe('123');
    });
  });
});
