<template>
    <aside class="p-3 xs:p-4 lg:p-5 xl:p-8 w-56 bg-gray-100 border-r">
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
</template>

<script>
import SidebarItem from './SidebarItem.vue'

export default {
    components: { SidebarItem }
}
</script>
