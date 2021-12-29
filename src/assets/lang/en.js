export default {

    general: {
        unknown: 'Unknown',
        check: 'Check validity',
        save: 'Save',
        centralFunction: 'Central control unit',
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

    settings: {
        ccuIp: 'CCU IP',
        ccuIpChecking: 'Checking CCU IP...',
        ccuIpValid: 'The CCU IP is valid and can be saved.',
        ccuIpInvalid: 'The CCU IP is not valid or the XML-API add-on is not installed.'
    },

    footer: {
        apiVersion: 'XML-API Version {version}'
    }
}
