<template>
    <Title>{{ $t('sidebar.devices') }}</Title>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <ChannelTile v-for="channel in allChannels" :key="channel.iseId" :channel="channel" />
    </div>
</template>

<script>
import Title from '../Title.vue'
import ChannelTile from '../ChannelTile.vue'
import xmlapi from '../../xmlapi/api.js'

export default {
    components: { Title, ChannelTile },
    data () {
        return {
            devices: []
        }
    },
    created () {
        this.devices = xmlapi.cache.devices;
    },
    computed: {
        allChannels () {
            return this.devices.flatMap(device => device.channels);
        }
    }
}
</script>
