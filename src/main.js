import { createApp } from 'vue';
import App from './App.vue';
import i18n from './assets/i18n';

const app = createApp(App);
app.use(i18n);

import Overview from './components/pages/Overview'
import Devices from './components/pages/Devices'
import Rooms from './components/pages/Rooms'
import Functions from './components/pages/Functions'
import Favorites from './components/pages/Favorites'
import SystemVariables from './components/pages/SystemVariables'
import ExtensionDreambox from './components/pages/ExtensionDreambox'
import Settings from './components/pages/Settings'

app.component('page-overview', Overview);
app.component('page-devices', Devices);
app.component('page-rooms', Rooms);
app.component('page-functions', Functions);
app.component('page-favorites', Favorites);
app.component('page-system-variables', SystemVariables);
app.component('page-ext-dreambox', ExtensionDreambox);
app.component('page-settings', Settings);

app.mount('#app');
