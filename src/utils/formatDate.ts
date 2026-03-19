/**
 * Format a date string or Date object to a locale-specific string
 * @param date - The date to format (string or Date object)
 * @param locale - The locale to use (default: 'en')
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const localeMap: Record<string, string> = {
    en: 'en-US',
    th: 'th-TH',
    zh: 'zh-CN',
  };
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString(localeMap[locale] || 'en-US', options || defaultOptions);
}
