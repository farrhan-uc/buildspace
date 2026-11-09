export const locales = ['en', 'hi'] as const;
export type Locale = (typeof locales)[number];

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    settings: 'Settings',
    suppliers: 'Suppliers',
    reports: 'Reports',
    visualizer: 'Visualizer',
    language: 'Language',
    accessibility: 'Accessibility and UX',
    ratePreferences: 'Rate preferences',
    defaultRegion: 'Default region',
    regionDescription: 'Kota, Rajasthan',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    settings: 'सेटिंग्स',
    suppliers: 'सप्लायर',
    reports: 'रिपोर्ट्स',
    visualizer: 'विज़ुअलाइज़र',
    language: 'भाषा',
    accessibility: 'पहुँच और उपयोग',
    ratePreferences: 'दर प्राथमिकताएँ',
    defaultRegion: 'डिफ़ॉल्ट क्षेत्र',
    regionDescription: 'कोटा, राजस्थान',
  },
};

export const getLabel = (locale: Locale, key: string) => translations[locale][key] ?? key;
