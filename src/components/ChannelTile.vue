<template>
    <Panel>
        {{ channel }}
    </Panel>
</template>

<script>
import Panel from './Panel.vue'

export default {
    components: { Panel },
    props: [ 'channel' ]
}
</script>
