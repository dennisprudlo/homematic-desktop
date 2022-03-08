export default {

    general: {
        unknown: 'Unknown',
        unknownDeviceType: 'Unknown device type',
        check: 'Check validity',
        save: 'Save',
        centralFunction: 'Central control unit',
        transferData: 'Transfer settings'
    },

    configure: {
        title: 'Oops!',
        description: 'It looks like the application is not configured properly. Go to the settings to configure the application.',
    },

    titleBar: {
        systemNotifications: {
            button: '{count} notification | {count} notifications',
            empty: 'No system notifications',
            clear: 'Clear notifications'
        }
    },

    systemNotifications: {
        types: {
            configPending: 'Configuration data ready for transmission',
            unreach: 'Device communication disturbed',
            stickyUnreach: 'Device communication has been disturbed'
        }
    },

    sidebar: {
        overview: 'Overview',
        ccu: 'CCU',

        statusAndControl: 'Homematic',
        devices: 'Devices',
        rooms: 'Rooms',
        functions: 'Functions',
        favorites: 'Favorites',
        systemVariables: 'System variables',
        settings: 'Settings',
        version: 'Version {version}',

        extensions: 'Extensions',
        dreambox: 'Dreambox'
    },

    functions: {
        channels: 'Channels',
        inFunction: 'in {func}'
    },

    favorites: {
        channels: 'Channels',
        inFunction: 'in {favorite}'
    },

    systemVariables: {
        defaults: {
            presence: 'Presence',
            rainToday: 'Rain Today',
            rainTomorrow: 'Rain Tomorrow'
        }
    },

    extensions: {
        dreambox: {
            description: 'With this extension devices can be controlled from a Dreambox receiver. For this a plugin must be installed on the receiver. Subsequently, the devices to controll must be selected and the selection must be transferred.',

            settingsShow: 'Show connection settings',
            settingsHide: 'Hide connection settings',

            ftp: 'FTP settings',
            ftpIp: 'Server',
            ftpPort: 'Port',
            ftpUser: 'Username',
            ftpPassword: 'Password',

            pluginPath: 'Path to the HomematicDreambox plugin',

            devices: 'Channels',
            devicesDescription: 'Currently {count}/{total} channel is selected, which can be transferred.|Currently {count}/{total} channels are selected, which can be transferred.',
            devicesListShow: 'Show channel list',
            devicesListHide: 'Hide channel list',

            transfer: 'Transfer',
            transferDescription: 'When transferring data the current CCU IP ({ccuIp}) and the selected channels will be stored on the Dreambox.',
            uploadConfigTitle: 'Upload of the plugin configuration',
            messages: {
                localFileWritten: 'The local file has been created. Connecting to the Dreambox...',
                accessed: 'The connection to the Dreambox was successful. Uploading file...',
                successful: 'The file was transferred!',
                error: 'There was an error: {message} (Is the path to the plugin folder correct?)'
            }
        }
    },

    settings: {
        ccu: 'CCU settings',
        ccuIp: 'CCU IP',
        ccuIpChecking: 'Checking CCU IP...',
        ccuIpValid: 'The CCU IP is valid and can be saved.',
        ccuIpInvalid: 'The CCU IP is not valid or the XML-API add-on is not installed.'
    },

    footer: {
        apiVersion: 'XML-API Version {version}'
    }
}
