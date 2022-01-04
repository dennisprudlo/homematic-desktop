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
                {{ $tc('extensions.dreambox.devicesDescription', this.selectedChannels.length, { count: this.selectedChannels.length, total: this.channelsForDreambox.length })}}
            </p>
            <span class="cursor-pointer text-primary hover:underline" v-on:click="channelListOpen = !channelListOpen">
                <span v-show="!channelListOpen">{{ $t('extensions.dreambox.devicesListShow') }}</span>
                <span v-show="channelListOpen">{{ $t('extensions.dreambox.devicesListHide') }}</span>
            </span>
            <div v-show="channelListOpen" class="flex flex-col gap-y-2">
                <Input placeholder="Search channels..." v-model="channelSearchQuery" />
                <a v-on:click="selectChannel(channel)" class="cursor-pointer block group" v-for="channel in channelsForDreambox" :key="channel.iseId" v-show="channel.matchSearch(channelSearchQuery)">
                    <Panel type="small" class="group-hover:text-primary group-hover:border-primary group-hover:bg-primary-50"
                        :class="{ 'text-primary border-primary bg-primary-50': this.selectedChannels.includes(channel.iseId) }">
                        <div>{{ channel.name }}</div>
                        <div class="text-sm text-gray-400 group-hover:text-primary"
                            :class="{ 'text-primary border-primary bg-primary-50': this.selectedChannels.includes(channel.iseId) }">
                            {{ channel.device().name }} ({{ channel.device().typeName() }})
                        </div>
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

            <div v-show="pluginUploadMessages.length > 0 || pluginUploadMessages.length > 0">
                <h4 class="font-semibold">{{ $t('extensions.dreambox.uploadConfigTitle') }}</h4>
                <ul>
                    <li v-for="message in pluginUploadMessages" :key="message">
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
const packageJson = require('../../../package.json');

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
            channelSearchQuery: '',
            channelsForDreambox: [],
            selectedChannels: [],

            pluginUploadMessages: []
        }
    },
    created () {
        this.ccuIp = window.store.get('settings.ccuIp') || '';

        this.ftpIp = window.store.get('extensions.dreambox.ftp.ip') || '';
        this.ftpPort = window.store.get('extensions.dreambox.ftp.port') || '';
        this.ftpUser = window.store.get('extensions.dreambox.ftp.user') || '';
        this.ftpPassword = window.store.get('extensions.dreambox.ftp.password') || '';

        this.pluginPath = window.store.get('extensions.dreambox.plugin.path') || '';

        this.channelsForDreambox = xmlapi.cache.devices
            .flatMap(d => d.channels)
            .filter(c => c.supportsDreamboxExtension());

        this.selectedChannels = (window.store.get('extensions.dreambox.channels') || [])
            .filter(channelIseId => this.channelsForDreambox.findIndex(c => c.iseId == channelIseId) !== -1);

        this.pluginUploadMessages = [];
    },
    methods: {
        selectChannel (channel) {
            let channels = [...new Set(this.selectedChannels)];
            if (channels.includes(channel.iseId)) {
                channels = channels.filter(iseId => iseId !== channel.iseId);
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
            // const settings = {
            //     host: this.ftpIp,
            //     port: this.ftpPort,
            //     user: this.ftpUser,
            //     password: this.ftpPassword,
            //     secure: false
            // };

            this.pluginUploadMessages = [];

            const now = new Date();
            const configuration = {
                generatedBy: `homematic mac/${ packageJson.version } – XML-API/${ await xmlapi.version() }`,
                generatedAt: Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                    now.getUTCHours(),
                    now.getUTCMinutes(),
                    now.getUTCSeconds(),
                    now.getUTCMilliseconds()
                ),
                ccuIp: this.ccuIp,
                channels: this.selectedChannels
                    .map(iseId => this.channelsForDreambox.find(channel => channel.iseId === iseId))
                    .filter(channel => channel !== undefined)
                    .map(channel => {
                        const device = channel.device();
                        return {
                            channel: channel,
                            device: device.withoutChannels(),
                            meta: {
                                // plugin metadata such as datapoint to switch
                            }
                        }
                    })
            };

            //
            // Upload ccu ip file
            window.ftp.writeLocal('ext-dreambox-config.json', JSON.stringify(configuration, null, 2), () => {
                this.pluginUploadMessages.push(t('extensions.dreambox.messages.localFileWritten'));

                // window.ftp.upload(settings, 'ext-dreambox-config.json', `${ this.pluginPath }/resources/config.json`, (step) => {
                //     this.pluginUploadMessages.push(t('extensions.dreambox.messages.' + step));
                // });
            });
        }
    }
}
</script>
