<template>
    <li :class="{ 'bg-gray-200': isActive }" class="hover:bg-gray-200 rounded -mx-3 font-medium">
        <a href="#" class="px-3 py-1 block" v-on:click="setPage(page ?? 'overview')">
            <slot />
        </a>
    </li>
</template>

<script>
export default {
    props: [ 'page' ],
    computed: {
        isActive () {
            return this.$parent.currentPage === this.page;
        }
    },
    methods: {
        setPage (page) {
            this.$parent.currentPage = page;
        }
    }
}
</script>
