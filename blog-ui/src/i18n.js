import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import Cookies from 'js-cookie';

export default i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: Cookies.get('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'),
        backend: {
            /* translation file path */
            loadPath: '/locales/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        // debug: process.env.NODE_ENV === "development",
         ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            useSuspense: false,
        },
    });
