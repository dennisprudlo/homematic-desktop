<template>
    <Title>
        <span class="text-gray-400">{{ $t('sidebar.extensions') }} /</span>
        {{ $t('sidebar.dreambox') }}
    </Title>
    <Subtitle>{{ $t('extensions.dreambox.description') }}</Subtitle>

    <span class="cursor-pointer text-primary hover:underline inline-block mb-4" v-on:click="showSettingsPanels = !showSettingsPanels">
        <span v-show="!showSettingsPanels">{{ $t('extensions.dreambox.settingsShow') }}</span>
        <span v-show="showSettingsPanels">{{ $t('extensions.dreambox.settingsHide') }}</span>
    </span>

    <div v-show="showSettingsPanels">

        <!-- FTP settings -->
        <div class="flex">
            <div class="w-56 shrink-0">
                <h4 class="font-semibold text-lg flex items-center">
                    <div class="shrink-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-sm">1</div>
                    {{ $t('extensions.dreambox.ftp') }}
                </h4>
            </div>
            <div class="flex-grow space-y-4">
                <Input :label="$t('extensions.dreambox.ftpIp')" v-model="ftpIp" placeholder="192.168.178.2" />
                <Input :label="$t('extensions.dreambox.ftpPort')" v-model="ftpPort" placeholder="21" />
                <Input :label="$t('extensions.dreambox.ftpUser')" v-model="ftpUser" placeholder="root" />
                <Input :label="$t('extensions.dreambox.ftpPassword')" v-model="ftpPassword" placeholder="root" />
                <div class="flex items-center space-x-2">
                    <Button v-on:click="saveFtpSettings()">{{ $t('general.save') }}</Button>
                </div>
            </div>
        </div>

        <!-- Plugin path -->
        <div class="flex mt-12">
            <div class="w-56 shrink-0">
                <div class="flex items-center">
                    <div class="shrink-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-sm">2</div>
                    <div class="flex items-center">
                        <span class="font-light">home</span><span class="font-semibold">matic</span>
                        <span class="bg-primary/20 text-primary rounded px-1 ml-1 text-[10px] inline-block">dreambox</span>
                    </div>
                </div>
            </div>
            <div class="flex-grow space-y-4">
                <Input :label="$t('extensions.dreambox.pluginPath')" v-model="pluginPath" placeholder="/usr/lib/enigma2/python/Plugins/Extensions/HomematicDreambox" />
                <div class="flex items-center space-x-2">
                    <Button v-on:click="savePluginSettings()">{{ $t('general.save') }}</Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Devices -->
    <div class="flex" :class="{ 'mt-12': showSettingsPanels }">
        <div class="w-56 shrink-0">
            <h4 class="font-semibold text-lg flex items-center">
                <div class="shrink-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-sm">{{ showSettingsPanels ? '3' : '1' }}</div>
                {{ $t('extensions.dreambox.devices') }}
            </h4>
        </div>
        <div class="flex-grow space-y-4">
            <p>
                {{ $tc('extensions.dreambox.devicesDescription', this.selectedChannels.length, { count: this.selectedChannels.length })}}
            </p>
            <span class="cursor-pointer text-primary hover:underline" v-on:click="channelListOpen = !channelListOpen">
                <span v-show="!channelListOpen">{{ $t('extensions.dreambox.devicesListShow') }}</span>
                <span v-show="channelListOpen">{{ $t('extensions.dreambox.devicesListHide') }}</span>
            </span>
            <div v-show="channelListOpen">
                <a v-on:click="selectChannel(channel)" class="cursor-pointer block group" v-for="channel in channelsForDreambox" :key="channel.iseId">
                    <Panel type="small" class="group-hover:text-primary group-hover:border-primary group-hover:bg-primary-50"
                        :class="{ 'text-primary border-primary bg-primary-50': this.selectedChannels.includes(channel.iseId) }">
                        {{ channel.name }}
                    </Panel>
                </a>
            </div>
        </div>
    </div>

    <!-- Transfer data -->
    <div class="flex mt-12">
        <div class="w-56 shrink-0">
            <h4 class="font-semibold text-lg flex items-center">
                <div class="shrink-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-sm">{{ showSettingsPanels ? '4' : '2' }}</div>
                {{ $t('extensions.dreambox.transfer') }}
            </h4>
        </div>
        <div class="flex-grow space-y-4">
            {{ $t('extensions.dreambox.transferDescription', { ccuIp: this.ccuIp })}}
            <div>
                <Button v-on:click="transferSettings()" class="mt-4">{{ $t('general.transferData') }}</Button>
            </div>

            <div v-show="ccuIpUploadMessages.length > 0 || channelsUploadMessages.length > 0">
                <h4 class="font-semibold">{{ $t('extensions.dreambox.uploadCcuIpTitle') }}</h4>
                <ul>
                    <li v-for="message in ccuIpUploadMessages" :key="message">
                        {{ message }}
                    </li>
                </ul>

                <h4 class="font-semibold mt-4">{{ $t('extensions.dreambox.uploadChannelsTitle') }}</h4>
                <ul>
                    <li v-for="message in channelsUploadMessages" :key="message">
                        {{ message }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Input from '../Input.vue'
import Button from '../Button.vue'
import Panel from '../Panel.vue'
import Subtitle from '../Subtitle.vue'
import xmlapi from '../../xmlapi/api'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default {
    components: { Title, Input, Button, Subtitle, Panel },
    data () {
        return {
            showSettingsPanels: false,

            ccuIp: '',

            ftpIp: '',
            ftpPort: '',
            ftpUser: '',
            ftpPassword: '',

            pluginPath: '',

            channelListOpen: false,
            channelsForDreambox: [],
            selectedChannels: [],

            ccuIpUploadMessages: [],
            channelsUploadMessages: []
        }
    },
    created () {
        this.ccuIp = window.store.get('settings.ccuIp') || '';

        this.ftpIp = window.store.get('extensions.dreambox.ftp.ip') || '';
        this.ftpPort = window.store.get('extensions.dreambox.ftp.port') || '';
        this.ftpUser = window.store.get('extensions.dreambox.ftp.user') || '';
        this.ftpPassword = window.store.get('extensions.dreambox.ftp.password') || '';

        this.pluginPath = window.store.get('extensions.dreambox.plugin.path') || '';

        this.channelsForDreambox = xmlapi.cache.devices.flatMap(d => d.channels);
        this.selectedChannels = window.store.get('extensions.dreambox.channels') || [];

        this.ccuIpUploadMessages = [];
        this.channelsUploadMessages = [];
    },
    methods: {
        selectChannel (channel) {
            let channels = [...new Set(this.selectedChannels)];
            if (channels.includes(channel.iseId)) {
                channels.filter(c => c.iseId !== channel.iseId);
            } else {
                channels.push(channel.iseId);
            }

            this.selectedChannels = channels;
            window.store.set('extensions.dreambox.channels', channels);
        },
        async saveFtpSettings () {
            window.store.set('extensions.dreambox.ftp', {
                ip: this.ftpIp,
                port: this.ftpPort,
                user: this.ftpUser,
                password: this.ftpPassword
            });
        },
        async savePluginSettings () {
            window.store.set('extensions.dreambox.plugin', {
                path: this.pluginPath
            });
        },
        async transferSettings () {
            const settings = {
                host: this.ftpIp,
                port: this.ftpPort,
                user: this.ftpUser,
                password: this.ftpPassword,
                secure: false
            };

            this.ccuIpUploadMessages = [];
            this.channelsUploadMessages = [];

            //
            // Upload ccu ip file
            window.ftp.writeLocal('ccu_ip', this.ccuIp, () => {
                this.ccuIpUploadMessages.push(t('extensions.dreambox.messages.localFileWritten'));

                window.ftp.upload(settings, 'ccu_ip', `${ this.pluginPath }/resources/ccu_ip`, (step) => {
                    this.ccuIpUploadMessages.push(t('extensions.dreambox.messages.' + step));
                });
            });

            //
            // Upload channels file
            window.ftp.writeLocal('channels', 'test', () => {
                this.channelsUploadMessages.push(t('extensions.dreambox.messages.localFileWritten'));

                window.ftp.upload(settings, 'channels', `${ this.pluginPath }/resources/channels_test`, (step) => {
                    this.channelsUploadMessages.push(t('extensions.dreambox.messages.' + step));
                });
            });
        }
    }
}
</script>
