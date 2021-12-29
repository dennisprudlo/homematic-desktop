<template>
    <Title>
        <span class="text-gray-400">{{ $t('sidebar.extensions') }} /</span>
        {{ $t('sidebar.dreambox') }}
    </Title>
    <Subtitle>{{ $t('extensions.dreambox.description') }}</Subtitle>

    <!-- FTP settings -->
    <div class="flex">
        <div class="w-56">
            <h4 class="font-semibold text-lg">{{ $t('extensions.dreambox.ftp') }}</h4>
        </div>
        <div class="flex-grow space-y-4">
            <Input :label="$t('extensions.dreambox.ftpIp')" v-model="ftpIp" placeholder="192.168.178.2" />
            <Input :label="$t('extensions.dreambox.ftpPort')" v-model="ftpPort" placeholder="22" />
            <Input :label="$t('extensions.dreambox.ftpUser')" v-model="ftpUser" placeholder="root" />
            <Input :label="$t('extensions.dreambox.ftpPassword')" v-model="ftpPassword" placeholder="root" />
            <div class="flex items-center space-x-2">
                <Button v-on:click="saveSettings()">{{ $t('general.save') }}</Button>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Input from '../Input.vue'
import Button from '../Button.vue'
import Subtitle from '../Subtitle.vue'

export default {
    components: { Title, Input, Button, Subtitle },
    data () {
        return {
            ftpIp: '',
            ftpPort: '',
            ftpUser: '',
            ftpPassword: '',
        }
    },
    created () {
        this.ftpIp = window.store.get('settings.extensions.dreambox.ftpIp') || '';
        this.ftpPort = window.store.get('settings.extensions.dreambox.ftpPort') || '';
        this.ftpUser = window.store.get('settings.extensions.dreambox.ftpUser') || '';
        this.ftpPassword = window.store.get('settings.extensions.dreambox.ftpPassword') || '';
    },
    methods: {
        async saveSettings () {
            window.store.set('settings.extensions.dreambox', {
                ftpIp: this.ftpIp,
                ftpPort: this.ftpPort,
                ftpUser: this.ftpUser,
                ftpPassword: this.ftpPassword,
            });
        }
    }
}
</script>
