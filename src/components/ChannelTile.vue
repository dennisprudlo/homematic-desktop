<template>
    <Panel>
        <h3 class="font-semibold text-lg">{{ channel.device().name }}</h3>
        {{ channel.device() }}
    </Panel>
</template>

<script>
import Panel from './Panel.vue'

export default {
    components: { Panel },
    props: [ 'channel' ]
}
</script>
