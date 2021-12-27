import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';

import locale_en from './assets/lang/en';

const i18n = createI18n({
    locale: navigator.language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages: {
        en: locale_en
    }
});

const app = createApp(App)
app.use(i18n);
app.mount('#app')
