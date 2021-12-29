export default {

    general: {
        unknown: 'Unbekannt',
        check: 'Überprüfen',
        save: 'Speichern',
        centralFunction: 'Zentrale Kontrolleinheit'
    },

    titleBar: {
        systemNotifications: {
            button: '{count} Meldung | {count} Meldungen',
            empty: 'Keine Systemmeldungen',
            clear: 'Meldungen löschen'
        }
    },

    systemNotifications: {
        types: {
            configPending: 'Konfigurationsdaten für die Übertragung bereit',
            unreach: 'Gerätekommunikation gestört',
            stickyUnreach: 'Gerätekommunikation wurde gestört'
        }
    },

    sidebar: {
        overview: 'Übersicht',

        statusAndControl: 'Homematic',
        devices: 'Geräte',
        rooms: 'Räume',
        functions: 'Gewerke',
        favorites: 'Favoriten',
        systemVariables: 'Systemvariablen',
        settings: 'Einstellungen',
        version: 'Version {version}',

        extensions: 'Erweiterungen',
        dreambox: 'Dreambox'
    },

    functions: {
        channels: 'Kanäle',
        inFunction: 'in {func}'
    },

    favorites: {
        channels: 'Kanäle',
        inFunction: 'in {favorite}'
    },

    extensions: {
        dreambox: {
            description: 'Mit dieser Erweiterung lassen sich Geräte von einem Dreambox-Receiver schalten. Dafür muss ein Plugin auf dem Receiver installiert werden. Im Anschluss müssen die schaltbaren Geräte ausgewählt und die Auswahl übertragen werden.',
            ftp: 'FTP-Daten',
            ftpIp: 'Server',
            ftpPort: 'Port',
            ftpUser: 'Benutzername',
            ftpPassword: 'Passwort',
        }
    },

    settings: {
        ccu: 'CCU-Daten',
        ccuIp: 'CCU IP',
        ccuIpChecking: 'Überprüfe die CCU IP...',
        ccuIpValid: 'Die CCU IP ist gültig und kann gespeichert werden.',
        ccuIpInvalid: 'Die CCU IP ist nicht richtig, oder das XML-API Add-on ist nicht installiert.'
    },

    footer: {
        apiVersion: 'XML-API Version {version}'
    }
}
