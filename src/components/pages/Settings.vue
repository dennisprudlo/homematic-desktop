<template>
    <Title>{{ $t('sidebar.settings') }}</Title>
    <div class="text-xs text-gray-400 italic -mt-3 mb-8">{{ window.store.path }}</div>

    <!-- CCU settings -->
    <div class="space-y-4">
        <Input :label="$t('settings.ccuIp')" v-model="ccuIp" placeholder="192.168.178.2" />
        <div class="flex items-center space-x-2">
            <Button btnstyle="secondary" v-on:click="checkCcuIpValidity()">{{ $t('general.check') }}</Button>
            <Button v-on:click="saveSettings()">{{ $t('general.save') }}</Button>
            <span v-if="validityCheckText" class="text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden !ml-4">{{ validityCheckText }}</span>
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Input from '../Input.vue'
import Button from '../Button.vue'
import xmlapi from '../../xmlapi/api.js'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default {
    components: { Title, Input, Button },
    data () {
        return {
            ccuIp: '',
            validityCheckText: ''
        }
    },
    created () {
        this.ccuIp = window.store.get('settings.ccuIp') || '';
    },
    methods: {
        async checkCcuIpValidity () {
            this.validityCheckText = t('settings.ccuIpChecking');
            const isValid = await xmlapi.checkValidity(this.ccuIp);
            this.validityCheckText = isValid
                ? t('settings.ccuIpValid')
                : t('settings.ccuIpInvalid');
        },
        async saveSettings () {
            window.store.set('settings', {
                ccuIp: this.ccuIp
            });

            await xmlapi._loadIp();

            this.$emit('reload-data')
        }
    }
}
</script>
