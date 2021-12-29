<template>
    <Title>{{ $t('sidebar.functions') }}</Title>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <a v-on:click="selectFunction(func)" class="cursor-pointer block group" v-for="func in functions" :key="func.iseId">
            <Panel class="group-hover:text-primary group-hover:border-primary" :class="{ 'text-primary': currentFunction === func.iseId, 'border-primary': currentFunction === func.iseId }">
                <h3 class="font-semibold">{{ func.name }}</h3>
                <p v-if="func.description.length > 0">{{ func.description }}</p>
            </Panel>
        </a>
    </div>

    <div v-if="currentFunctionChannels.length > 0" class="mt-12">
        <Title type="subheading">
            {{ $t('functions.channels') }}
            <span class="text-gray-400 text-sm">{{ $t('functions.inFunction', { func: currentFunctionName }) }}</span>
        </Title>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
            <ChannelTile v-for="channel in currentFunctionChannels" :key="channel.iseId" :channel="channel" />
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Panel from '../Panel.vue'
import ChannelTile from '../ChannelTile.vue'
import xmlapi from '../../xmlapi/api.js'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default {
    components: { Title, Panel, ChannelTile },
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
        currentFunctionName () {
            const currentFunc = this.functions.find(func => func.iseId === this.currentFunction);
            return currentFunc ? currentFunc.name : t('general.unknown');
        },
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
