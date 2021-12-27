<template>

    <!-- Title Bar -->
    <header class="fixed w-full h-12 bg-blue-700 text-white flex items-center justify-center" style="-webkit-app-region: drag; -webkit-user-select: none;">

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
            <TitlebarButton>
                <div class="flex items-center text-sm space-x-2">

                    <!-- Notification Ping -->
                    <span class="relative flex h-3 w-3">
                        <span v-if="hasSystemNotifications()" :class="{ 'bg-green-500': !hasSystemNotifications(), 'bg-yellow-400': hasSystemNotifications() }" class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-100"></span>
                        <span :class="{ 'bg-green-500': !hasSystemNotifications(), 'bg-yellow-400': hasSystemNotifications() }" class="absolute inline-flex rounded-full h-3 w-3"></span>
                    </span>

                    <!-- Message -->
                    <span>{{ this.systemNotifications.length }} notifications</span>
                </div>
            </TitlebarButton>

            <!-- <span>settings</span> -->
        </div>
    </header>

    <!-- Application -->
    <main class="bg-white flex pt-12">

        <!-- Sidebar -->
        <aside class="p-4 lg:p-5 xl:p-8 w-56 bg-gray-100 border-r">
            <ul>
                <SidebarItem>Dashboard</SidebarItem>
            </ul>

            <ul>
                <SidebarItem>Devices</SidebarItem>
                <SidebarItem>Rooms</SidebarItem>
                <SidebarItem>Functions</SidebarItem>
                <SidebarItem>Favorites</SidebarItem>
                <SidebarItem>Sysvars</SidebarItem>
            </ul>
        </aside>

        <!-- Content -->
        <div class="p-4 lg:p-5 xl:p-8 min-h-[100vh] flex flex-col justify-between">
            <div class="border border-red-500">
                content
            </div>

            <!-- Footer -->
            <footer class="border-t pt-2 text-xs text-gray-500">
                XML-API Version {{ apiVersion }}
            </footer>
        </div>
    </main>
</template>

<script>
import SidebarItem from './components/SidebarItem.vue'
import TitlebarButton from './components/TitlebarButton.vue'
import xmlapi from './xmlapi/api.js'

export default {
    components: { SidebarItem, TitlebarButton },
    data () {
        return {
            apiVersion: '',
            systemNotifications: []
        }
    },
    async created () {
        this.apiVersion = await xmlapi.version();
        this.systemNotifications = await xmlapi.systemNotifications();
    },
    methods: {
        hasSystemNotifications () {
            return this.systemNotifications.length > 0;
        }
    }
}
</script>
