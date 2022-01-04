<template>
    <Title>{{ $t('sidebar.systemVariables') }}</Title>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <a class="block" v-for="systemVariable in systemVariables" :key="systemVariable.iseId">
            <Panel>
                <h3 class="font-semibold">{{ systemVariable.displayName() }}</h3>
            </Panel>
        </a>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Panel from '../Panel.vue'
import xmlapi from '../../xmlapi/api.js'

export default {
    components: { Title, Panel },
    data () {
        return {
            systemVariables: []
        }
    },
    created () {
        xmlapi.systemVariables().then(systemVariables => {
            this.systemVariables = systemVariables;
        });
    },
}
</script>
