<template>

    <!-- Title Bar -->
    <header class="fixed w-full h-12 bg-primary text-white flex items-center justify-center" style="-webkit-app-region: drag; -webkit-user-select: none;">

        <!-- Title -->
        <div>
            <span class="font-light">
                h<span class="hidden sm:inline">ome</span>m<span class="hidden sm:inline">atic</span>
            </span>
            <span class="font-semibold">desktop</span>
        </div>

        <!-- Actions -->
        <div class="absolute right-5 flex items-center space-x-2">

            <!-- Notifications -->
            <div>
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
                    <div v-if="systemNotifications.length === 0" class="text-gray-500 text-sm italic">
                        {{ $t('titleBar.systemNotifications.empty') }}
                    </div>
                    <div v-else>
                        <div class="divide-y">
                            <div v-for="systemNotification in systemNotifications" :key="systemNotification.iseId" class="text-left flex flex-col text-sm py-3 first:pt-0 last:pb-0">
                                <div>{{ systemNotification.name }}</div>
                                <div class="text-xs text-gray-500 italic mt-1">{{ systemNotification.getType() }} - {{ systemNotification.datetime.fromNow() }}</div>
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
    <main class="bg-white flex pt-12">

        <!-- Sidebar -->
        <aside class="p-4 lg:p-5 xl:p-8 w-56 bg-gray-100 border-r">
            <ul>
                <SidebarItem>{{ $t('sidebar.dashboard') }}</SidebarItem>
            </ul>

            <ul>
                <SidebarItem>{{ $t('sidebar.devices') }}</SidebarItem>
                <SidebarItem>{{ $t('sidebar.rooms') }}</SidebarItem>
                <SidebarItem>{{ $t('sidebar.functions') }}</SidebarItem>
                <SidebarItem>{{ $t('sidebar.favorites') }}</SidebarItem>
                <SidebarItem>{{ $t('sidebar.sysvars') }}</SidebarItem>
            </ul>
        </aside>

        <!-- Content -->
        <div class="p-4 lg:p-5 xl:p-8 min-h-[100vh] flex flex-col justify-between">
            <div>
                Content
            </div>

            <!-- Footer -->
            <footer class="border-t pt-2 text-xs text-gray-500">
                {{ $t('footer.apiVersion', { version: apiVersion }) }}
            </footer>
        </div>
    </main>
</template>

<script>
import SidebarItem from './components/SidebarItem.vue'
import Dropdown from './components/Dropdown.vue'
import Button from './components/Button.vue'
import TitlebarButton from './components/TitlebarButton.vue'
import xmlapi from './xmlapi/api.js'

export default {
    components: { SidebarItem, TitlebarButton, Dropdown, Button },
    data () {
        return {
            apiVersion: '',
            systemNotifications: [],
            dSystemNotificationsOpen: false
        }
    },
    async created () {
        this.apiVersion = await xmlapi.version();
        this.systemNotifications = await xmlapi.systemNotifications();
    },
    methods: {
        hasSystemNotifications () {
            return this.systemNotifications !== null && this.systemNotifications.length > 0;
        },
        hasClearableSystemNotifications () {
            return this.hasSystemNotifications() && this.systemNotifications
                .map(notif => notif.isClearable())
                .reduce((previous, current) => previous && current);
        },
        async clearSystemNotifications () {
            await xmlapi.clearSystemNotifications();
            this.systemNotifications = await xmlapi.systemNotifications();
            this.dSystemNotificationsOpen = false;
        }
    }
}
</script>
