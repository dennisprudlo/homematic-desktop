<template>
    <Title>{{ $t('sidebar.settings') }}</Title>
    <Subtitle>{{ window.store.path }}</Subtitle>

    <!-- CCU settings -->
    <div class="flex mt-12">
        <div class="w-56">
            <h4 class="font-semibold text-lg">{{ $t('settings.ccu') }}</h4>
        </div>
        <div class="flex-grow space-y-4">
            <Input :label="$t('settings.ccuIp')" v-model="ccuIp" placeholder="192.168.178.2" />
            <div class="flex items-center space-x-2">
                <Button btnstyle="secondary" v-on:click="checkCcuIpValidity()">{{ $t('general.check') }}</Button>
                <Button v-on:click="saveSettings()">{{ $t('general.save') }}</Button>
                <span v-if="validityCheckText" class="text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden !ml-4">{{ validityCheckText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Input from '../Input.vue'
import Button from '../Button.vue'
import Subtitle from '../Subtitle.vue'
import xmlapi from '../../xmlapi/api.js'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default {
    components: { Title, Input, Button, Subtitle },
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

            if (this.$parent.ccuIp.length === 0) {
                this.$parent.currentPage = 'overview';
            }

            this.$parent.ccuIp = this.ccuIp;
            this.$emit('reload-data');
        }
    }
}
</script>
