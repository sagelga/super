import {
  getCookiePreferences,
  setCookiePreferences,
  hasConsent,
  hasAnalyticsConsent,
  clearCookiePreferences,
} from '../cookies';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('Cookie Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('getCookiePreferences', () => {
    it('should return default preferences when no consent is given', () => {
      const preferences = getCookiePreferences();

      expect(preferences).toEqual({
        functional: true,
        analytics: false,
        consentGiven: false,
        consentTimestamp: null,
      });
    });

    it('should return stored preferences when consent is given', () => {
      const storedPreferences = {
        functional: true,
        analytics: true,
        consentGiven: true,
        consentTimestamp: Date.now(),
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedPreferences));

      const preferences = getCookiePreferences();

      expect(preferences).toEqual(storedPreferences);
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      const preferences = getCookiePreferences();

      expect(preferences).toEqual({
        functional: true,
        analytics: false,
        consentGiven: false,
        consentTimestamp: null,
      });
    });

    it('should handle localStorage being undefined (SSR)', () => {
      const originalLocalStorage = global.localStorage;
      // @ts-expect-error - Testing SSR behavior
      delete global.localStorage;

      const preferences = getCookiePreferences();

      expect(preferences).toEqual({
        functional: true,
        analytics: false,
        consentGiven: false,
        consentTimestamp: null,
      });

      // @ts-expect-error - Restoring for other tests
      global.localStorage = originalLocalStorage;
    });
  });

  describe('setCookiePreferences', () => {
    it('should save preferences to localStorage', () => {
      const preferences = {
        functional: true,
        analytics: false,
        consentGiven: false,
        consentTimestamp: null,
      };

      setCookiePreferences(preferences);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cookie_consent',
        expect.any(String)
      );
    });

    it('should set consentGiven and consentTimestamp when saving', () => {
      const preferences = {
        functional: true,
        analytics: false,
        consentGiven: false,
        consentTimestamp: null,
      };

      setCookiePreferences(preferences);

      const savedData = JSON.parse(
        localStorageMock.setItem.mock.calls[0][1] as string
      );
      expect(savedData.consentGiven).toBe(true);
      expect(savedData.consentTimestamp).toBeDefined();
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(() => {
        setCookiePreferences({
          functional: true,
          analytics: false,
          consentGiven: false,
          consentTimestamp: null,
        });
      }).not.toThrow();
    });

    it('should handle localStorage being undefined (SSR)', () => {
      const originalLocalStorage = global.localStorage;
      // @ts-expect-error - Testing SSR behavior
      delete global.localStorage;

      expect(() => {
        setCookiePreferences({
          functional: true,
          analytics: false,
          consentGiven: false,
          consentTimestamp: null,
        });
      }).not.toThrow();

      // @ts-expect-error - Restoring for other tests
      global.localStorage = originalLocalStorage;
    });
  });

  describe('hasConsent', () => {
    it('should return false when no consent is given', () => {
      localStorageMock.getItem.mockReturnValue(null);

      expect(hasConsent()).toBe(false);
    });

    it('should return true when consent is given', () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          functional: true,
          analytics: true,
          consentGiven: true,
          consentTimestamp: Date.now(),
        })
      );

      expect(hasConsent()).toBe(true);
    });
  });

  describe('hasAnalyticsConsent', () => {
    it('should return false when no consent is given', () => {
      localStorageMock.getItem.mockReturnValue(null);

      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('should return false when analytics consent is not given', () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          functional: true,
          analytics: false,
          consentGiven: true,
          consentTimestamp: Date.now(),
        })
      );

      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('should return true when analytics consent is given', () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          functional: true,
          analytics: true,
          consentGiven: true,
          consentTimestamp: Date.now(),
        })
      );

      expect(hasAnalyticsConsent()).toBe(true);
    });
  });

  describe('clearCookiePreferences', () => {
    it('should remove cookie_consent from localStorage', () => {
      clearCookiePreferences();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('cookie_consent');
    });

    it('should handle localStorage being undefined (SSR)', () => {
      const originalLocalStorage = global.localStorage;
      // @ts-expect-error - Testing SSR behavior
      delete global.localStorage;

      expect(() => {
        clearCookiePreferences();
      }).not.toThrow();

      // @ts-expect-error - Restoring for other tests
      global.localStorage = originalLocalStorage;
    });
  });
});
