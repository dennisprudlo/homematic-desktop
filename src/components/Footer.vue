<template>
    <footer class="border-t pt-2 text-xs text-gray-500">
        XML-API Version {{ apiVersion }}
    </footer>
</template>

<script>
import xmlapi from '../xmlapi/api.js'

export default {
    data () {
        return {
            apiVersion: ''
        }
    },
    async created () {
        this.apiVersion = await xmlapi.version();
    },
}
</script>
