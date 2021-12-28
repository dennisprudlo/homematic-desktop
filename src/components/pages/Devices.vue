<template>
    <Title>{{ $t('sidebar.devices') }}</Title>

    <ul>
        <li v-for="device in devices" :key="device.iseId">
            {{ device.name }}
        </li>
    </ul>
</template>

<script>
import Title from '../Title.vue'
import xmlapi from '../../xmlapi/api.js'

export default {
    components: { Title },
    data () {
        return {
            devices: []
        }
    },
    created () {
        this.devices = xmlapi.devices().then(devices => this.devices = devices);
    },
}
</script>
