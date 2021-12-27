import { createI18n } from 'vue-i18n';
import moment from 'moment'

import locale_en from './lang/en';
import locale_de from './lang/de';

const locale = navigator.language.split('-')[0] || 'en';
export default createI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages: {
        en: locale_en,
        de: locale_de
    }
});

moment.locale(locale);
