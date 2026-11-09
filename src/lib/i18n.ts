export const locales = ['en', 'hi'] as const;
export type Locale = (typeof locales)[number];

type Dictionary = Record<string, string>;
export const translations: Record<Locale, Dictionary> = {
  en: {
    language: 'Language', dashboard: 'Dashboard', settings: 'Settings', suppliers: 'Suppliers', reports: 'Reports', visualizer: 'Visualizer',
    features: 'Features', stages: 'Stages', workflow: 'Workflow', faq: 'FAQ', signIn: 'Sign in', getStarted: 'Get started', signOut: 'Sign out',
    createEstimate: 'Create free estimate', startEstimate: 'Start your estimate', seeHow: 'See how it works',
    accessibility: 'Accessibility and UX', ratePreferences: 'Rate preferences', defaultRegion: 'Default region', regionDescription: 'Kota, Rajasthan',
    login: 'Welcome back', loginSubtitle: 'Sign in to continue to BuildSpace', resetPassword: 'Reset your password', email: 'Email', password: 'Password', name: 'Full name', role: 'Your role',
    forgotPassword: 'Forgot password?', noAccount: "Don't have an account?", createAccount: 'Create account', alreadyAccount: 'Already have an account?',
    homeowner: 'Homeowner', contractor: 'Contractor', builder: 'Builder', engineer: 'Engineer', supplier: 'Supplier',
    continue: 'Continue', sendReset: 'Send reset link', resetSent: 'Check your email for a password reset link.', saving: 'Saving…', saved: 'Saved',
    invalidCredentials: 'Invalid email or password.', required: 'This field is required.', somethingWrong: 'Something went wrong. Please try again.',
    constructionStages: 'Construction stages', materialItems: 'Material line items', localSuppliers: 'Local suppliers', costToStart: 'Cost to start',
    transparent: 'Transparent line items', localPricing: 'Local market pricing', supplierDiscovery: 'Supplier discovery',
    everyStage: 'Every stage from excavation to finishing — with local rates and nearby suppliers built in.',
  },
  hi: {
    language: 'भाषा', dashboard: 'डैशबोर्ड', settings: 'सेटिंग्स', suppliers: 'सप्लायर', reports: 'रिपोर्ट्स', visualizer: 'विज़ुअलाइज़र',
    features: 'सुविधाएँ', stages: 'चरण', workflow: 'कार्यप्रवाह', faq: 'सामान्य प्रश्न', signIn: 'साइन इन', getStarted: 'शुरू करें', signOut: 'साइन आउट',
    createEstimate: 'मुफ़्त अनुमान बनाएँ', startEstimate: 'अपना अनुमान शुरू करें', seeHow: 'यह कैसे काम करता है',
    accessibility: 'पहुँच और उपयोग', ratePreferences: 'दर प्राथमिकताएँ', defaultRegion: 'डिफ़ॉल्ट क्षेत्र', regionDescription: 'कोटा, राजस्थान',
    login: 'वापसी पर स्वागत है', loginSubtitle: 'BuildSpace जारी रखने के लिए साइन इन करें', email: 'ईमेल', password: 'पासवर्ड', name: 'पूरा नाम', role: 'आपकी भूमिका',
    forgotPassword: 'पासवर्ड भूल गए?', noAccount: 'खाता नहीं है?', createAccount: 'खाता बनाएँ', alreadyAccount: 'पहले से खाता है?',
    homeowner: 'गृहस्वामी', contractor: 'ठेकेदार', builder: 'बिल्डर', engineer: 'इंजीनियर', supplier: 'सप्लायर',
    continue: 'जारी रखें', sendReset: 'रीसेट लिंक भेजें', resetSent: 'पासवर्ड रीसेट लिंक के लिए अपना ईमेल देखें।', saving: 'सेव हो रहा है…', saved: 'सेव हो गया',
    invalidCredentials: 'ईमेल या पासवर्ड सही नहीं है।', required: 'यह फ़ील्ड आवश्यक है।', somethingWrong: 'कुछ गड़बड़ हुई। कृपया फिर प्रयास करें।',
    constructionStages: 'निर्माण चरण', materialItems: 'सामग्री की पंक्तियाँ', localSuppliers: 'स्थानीय सप्लायर', costToStart: 'शुरुआती लागत',
    transparent: 'पारदर्शी विवरण', localPricing: 'स्थानीय बाज़ार दरें', supplierDiscovery: 'सप्लायर खोज',
    everyStage: 'खुदाई से फिनिशिंग तक हर चरण — स्थानीय दरों और नज़दीकी सप्लायरों के साथ।',
  },
};

export const getLabel = (locale: Locale, key: string) => translations[locale][key] ?? translations.en[key] ?? key;
