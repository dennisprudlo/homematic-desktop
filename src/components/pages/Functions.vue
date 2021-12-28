<template>
    <Title>{{ $t('sidebar.functions') }}</Title>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <a v-on:click="selectFunction(func)" class="cursor-pointer block group" v-for="func in functions" :key="func.iseId">
            <Panel class="border-2 group-hover:text-primary group-hover:border-primary" :class="{ 'text-primary': currentFunction === func.iseId, 'border-primary': currentFunction === func.iseId }">
                <h3 class="font-semibold">{{ func.name }}</h3>
                <p v-if="func.description.length > 0">{{ func.description }}</p>
            </Panel>
        </a>
    </div>

    <Title type="subheading">Kanäle</Title>
    <ul>
        <li v-for="channel in currentFunctionChannels" :key="channel.iseId">
            {{ channel.name }}
        </li>
    </ul>
</template>

<script>
import Title from '../Title.vue'
import Panel from '../Panel.vue'
import xmlapi from '../../xmlapi/api.js'

export default {
    components: { Title, Panel },
    data () {
        return {
            currentFunction: null,
            functions: []
        }
    },
    created () {
        this.functions = xmlapi.functions().then(functions => {
            this.functions = functions
            if (this.functions.length > 0) {
                this.selectFunction(this.functions[0])
            }
        });
    },
    computed: {
        currentFunctionChannels () {
            if (this.currentFunction === null) {
                return [];
            }

            const func = this.functions.find(func => func.iseId === this.currentFunction);
            return func ? func.channels : [];
        }
    },
    methods: {
        selectFunction (func) {
            this.currentFunction = func.iseId;
        }
    }
}
</script>
