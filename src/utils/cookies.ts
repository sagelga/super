import { CookiePreferences, COOKIE_STORAGE_KEY, CONSENT_VERSION, CONSENT_EXPIRY_MS } from '@/types';

const DEFAULT_PREFERENCES: CookiePreferences = {
  functional: true,
  analytics: false,
  consentGiven: false,
  consentTimestamp: null,
  consentVersion: null,
};

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CookiePreferences;

      // Invalidate if policy version changed
      if (parsed.consentVersion !== CONSENT_VERSION) {
        localStorage.removeItem(COOKIE_STORAGE_KEY);
        return DEFAULT_PREFERENCES;
      }

      // Invalidate if consent is older than 13 months
      if (parsed.consentTimestamp !== null && Date.now() - parsed.consentTimestamp > CONSENT_EXPIRY_MS) {
        localStorage.removeItem(COOKIE_STORAGE_KEY);
        return DEFAULT_PREFERENCES;
      }

      return parsed;
    }
  } catch {
    console.warn('Failed to parse cookie preferences from localStorage');
  }

  return DEFAULT_PREFERENCES;
}

export function setCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') {
    return;
  }

  const updatedPreferences: CookiePreferences = {
    ...preferences,
    consentGiven: true,
    consentTimestamp: Date.now(),
    consentVersion: CONSENT_VERSION,
  };

  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(updatedPreferences));
  } catch {
    console.warn('Failed to save cookie preferences to localStorage');
  }
}

export function hasConsent(): boolean {
  return getCookiePreferences().consentGiven;
}

export function hasAnalyticsConsent(): boolean {
  const prefs = getCookiePreferences();
  return prefs.consentGiven && prefs.analytics;
}

export function clearCookiePreferences(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(COOKIE_STORAGE_KEY);
  } catch {
    console.warn('Failed to clear cookie preferences from localStorage');
  }
}
