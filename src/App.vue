<template>

    <!-- Title Bar -->
    <header class="fixed w-full z-50 h-12 bg-primary text-white flex items-center justify-center" style="-webkit-app-region: drag; -webkit-user-select: none;">

        <!-- Links -->
        <div class="absolute left-24" v-if="hasCcuIp">
            <TitlebarButton v-on:click="openCcuInBrowser()">
                <div class="flex items-center text-sm space-x-2">
                    {{ $t('sidebar.ccu') }} &rarr;
                </div>
            </TitlebarButton>
        </div>

        <!-- Title -->
        <div class="flex items-center">
            <span class="font-light">home</span><span class="font-semibold">matic</span>
            <span class="bg-white/30 rounded px-1 ml-1 text-[10px]">mac</span>
        </div>

        <!-- Actions -->
        <div class="absolute right-5 flex items-center space-x-2" v-if="hasCcuIp">

            <!-- Notifications -->
            <div v-if="baseDataLoaded">
                <TitlebarButton v-on:click="dSystemNotificationsOpen = !dSystemNotificationsOpen">
                    <div class="flex items-center text-sm space-x-2">

                        <!-- Notification Ping -->
                        <span class="relative flex h-3 w-3">
                            <span v-if="hasSystemNotifications()" :class="{ 'bg-green-500': !hasSystemNotifications(), 'bg-yellow-400': hasSystemNotifications() }" class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-100"></span>
                            <span :class="{ 'bg-green-500': !hasSystemNotifications(), 'bg-yellow-400': hasSystemNotifications() }" class="absolute inline-flex rounded-full h-3 w-3"></span>
                        </span>

                        <!-- Message -->
                        <span>{{ $tc('titleBar.systemNotifications.button', systemNotifications.length, { count: systemNotifications.length }) }}</span>
                    </div>
                </TitlebarButton>

                <!-- Dropdown -->
                <Dropdown class="w-96" v-show="dSystemNotificationsOpen">
                    <div v-if="systemNotifications.length === 0" class="text-gray-400 text-sm text-center italic py-4">
                        {{ $t('titleBar.systemNotifications.empty') }}
                    </div>
                    <div v-else>
                        <div class="divide-y">
                            <div v-for="systemNotification in systemNotifications" :key="systemNotification.iseId" class="text-left flex flex-col text-sm py-3 first:pt-0 last:pb-0">
                                <div>{{ systemNotification.getDeviceName() }}</div>
                                <div class="text-xs text-gray-400 italic mt-1">{{ systemNotification.getType() }} - {{ systemNotification.datetime.fromNow() }}</div>
                            </div>
                        </div>

                        <!-- Quit Messages -->
                        <Button :disabled="!hasClearableSystemNotifications()" class="mt-4" v-on:click="clearSystemNotifications()">{{ $t('titleBar.systemNotifications.clear') }}</Button>
                    </div>
                </Dropdown>
            </div>
        </div>
    </header>

    <!-- Application -->
    <main class="bg-white pt-12">

        <!-- Sidebar -->
        <aside v-if="hasCcuIp" class="fixed top-12 bottom-0 p-5 xl:p-8 w-56 bg-gray-100 border-r overflow-scroll flex flex-col justify-between select-none">
            <div class="space-y-6">
                <ul class="space-y-1">
                    <SidebarItem page="overview">{{ $t('sidebar.overview') }}</SidebarItem>
                </ul>

                <!-- Status and control -->
                <div>
                    <h4 class="uppercase text-gray-400 font-semibold text-sm mb-1">{{ $t('sidebar.statusAndControl') }}</h4>
                    <ul class="space-y-1">
                        <SidebarItem page="devices">{{ $t('sidebar.devices') }}</SidebarItem>
                        <SidebarItem page="rooms">{{ $t('sidebar.rooms') }}</SidebarItem>
                        <SidebarItem page="functions">{{ $t('sidebar.functions') }}</SidebarItem>
                        <SidebarItem page="favorites">{{ $t('sidebar.favorites') }}</SidebarItem>
                        <SidebarItem page="system-variables">{{ $t('sidebar.systemVariables') }}</SidebarItem>
                    </ul>
                </div>

                <!-- Extensions -->
                <div>
                    <h4 class="uppercase text-gray-400 font-semibold text-sm mb-1">{{ $t('sidebar.extensions') }}</h4>
                    <ul class="space-y-1">
                        <SidebarItem page="ext-dreambox">{{ $t('sidebar.dreambox') }}</SidebarItem>
                    </ul>
                </div>
            </div>

            <!-- Trailing sidebar actions -->
            <div class="mt-12 select-none">
                <ul class="space-y-1">
                    <SidebarItem page="settings">{{ $t('sidebar.settings') }}</SidebarItem>
                </ul>
                <div class="mt-4 text-sm text-gray-400">
                    {{ $t('sidebar.version', { version: applicationVersion }) }}
                </div>
            </div>
        </aside>

        <!-- Content -->
        <div class="fixed bg-white right-0 bottom-0 top-12 overflow-scroll" :class="{ 'left-56': hasCcuIp, 'left-0': !hasCcuIp }">
            <div class="h-full p-5 xl:p-8 !pb-0 flex flex-col justify-between">
                <div class="flex-grow">
                    <Settings v-if="!hasCcuIp" @reload-data="reloadData()" />
                    <component :is="currentComponent" @reload-data="reloadData()" v-else-if="baseDataLoaded || alwaysLoadPages.includes(currentComponent)"></component>
                    <GoToSettings v-else-if="errorsInBaseData" />
                    <div v-else class="h-full flex justify-center">
                        <Spinner />
                    </div>
                </div>

                <!-- Footer -->
                <footer class="border-t pt-2 text-xs text-gray-400 mt-12 select-none">
                    {{ $t('footer.apiVersion', { version: apiVersion }) }}
                    <div class="h-5 xl:h-8"></div>
                </footer>
            </div>
        </div>
    </main>
</template>

<script>
import SidebarItem from './components/SidebarItem.vue'
import Dropdown from './components/Dropdown.vue'
import Button from './components/Button.vue'
import Spinner from './components/Spinner.vue'
import TitlebarButton from './components/TitlebarButton.vue'
import GoToSettings from './components/pages/GoToSettings.vue'
import Settings from './components/pages/Settings.vue'
import xmlapi from './xmlapi/api.js'
const packageJson = require('../package.json');

export default {
    components: { SidebarItem, TitlebarButton, Dropdown, Button, GoToSettings, Settings, Spinner },
    data () {
        return {
            ccuIp: '',
            apiVersion: '',
            systemNotifications: [],
            baseDataLoaded: false,
            errorsInBaseData: false,
            dSystemNotificationsOpen: false,
            applicationVersion: packageJson.version,
            currentPage: 'overview',
            alwaysLoadPages: [ 'page-settings', 'page-ext-dreambox' ]
        }
    },
    created () {
        this.ccuIp = window.store.get('settings.ccuIp') || '';
        this.reloadData();
    },
    computed: {
        hasCcuIp () {
            return this.ccuIp.length > 0;
        },
        currentComponent () {
            return 'page-' + this.currentPage;
        }
    },
    methods: {
        reloadData () {
            this.apiVersion = '';
            this.systemNotifications = [];
            this.baseDataLoaded = false;
            this.errorsInBaseData = false;

            xmlapi.version().then(version => this.apiVersion = version);
            xmlapi.systemNotifications().then(notifications => {
                xmlapi.devices().then(() => {
                    this.systemNotifications = notifications;
                    this.baseDataLoaded = true;
                }).catch(() => this.errorsInBaseData = true);
            }).catch(() => this.errorsInBaseData = true);
        },
        hasSystemNotifications () {
            return this.systemNotifications !== null && this.systemNotifications.length > 0;
        },
        hasClearableSystemNotifications () {
            return this.hasSystemNotifications() && this.systemNotifications
                .map(notif => notif.isClearable())
                .reduce((previous, current) => previous || current);
        },
        async clearSystemNotifications () {
            await xmlapi.clearSystemNotifications();
            this.systemNotifications = await xmlapi.systemNotifications();
            this.dSystemNotificationsOpen = false;
        },
        openCcuInBrowser () {
            const ccuIp = window.store.get('settings.ccuIp');
            if (ccuIp && ccuIp.length > 0) {
                window.openURL(`http://${ ccuIp }`);
            } else {
                this.currentPage = 'settings';
            }
        }
    }
}
</script>
