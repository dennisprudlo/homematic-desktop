export default {

    general: {
        unknown: 'Unknown',
        check: 'Check validity',
        save: 'Save',
        centralFunction: 'Central control unit',
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

    extensions: {
        dreambox: {
            description: 'With this extension devices can be controlled from a Dreambox receiver. For this a plugin must be installed on the receiver. Subsequently, the devices to controll must be selected and the selection must be transferred.',
            ftp: 'FTP settings',
            ftpIp: 'Server',
            ftpPort: 'Port',
            ftpUser: 'Username',
            ftpPassword: 'Password',
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
