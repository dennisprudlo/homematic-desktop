export default {

    general: {
        unknown: 'Unbekannt',
        unknownDeviceType: 'Unbekannter Gerätetyp',
        check: 'Überprüfen',
        save: 'Speichern',
        centralFunction: 'Zentrale Kontrolleinheit',
        transferData: 'Daten übertragen'
    },

    configure: {
        title: 'Oops!',
        description: 'Wie es aussieht ist die Anwendung nicht richtig konfiguriert. Gehe in die Einstellungen, um die richtigen Daten zu hinterlegen.',
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
        ccu: 'CCU',

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

    systemVariables: {
        defaults: {
            presence: 'Anwesenheit',
            rainToday: 'Regen Heute',
            rainTomorrow: 'Regen Morgen'
        }
    },

    extensions: {
        dreambox: {
            description: 'Mit dieser Erweiterung lassen sich Geräte von einem Dreambox-Receiver schalten. Dafür muss ein Plugin auf dem Receiver installiert werden. Im Anschluss müssen die schaltbaren Geräte ausgewählt und die Auswahl übertragen werden.',

            settingsShow: 'Verbindungseinstellungen anzeigen',
            settingsHide: 'Verbindungseinstellungen verstecken',

            ftp: 'FTP-Daten',
            ftpIp: 'Server',
            ftpPort: 'Port',
            ftpUser: 'Benutzername',
            ftpPassword: 'Passwort',

            pluginPath: 'Pfad zum HomematicDreambox Plugin',

            devices: 'Kanäle',
            devicesDescription: 'Aktuell ist {count}/{total} Kanal ausgewählt, das übertragen werden kann.|Aktuell sind {count}/{total} Kanäle ausgewählt, die übertragen werden können.',
            devicesListShow: 'Kanalliste aufklappen',
            devicesListHide: 'Kanalliste einklappen',

            transfer: 'Übertragung',
            transferDescription: 'Beim Übertragen der Daten wird die aktuelle CCU IP ({ccuIp}) und die ausgewählten Kanäle auf der Dreambox abgelegt.',
            uploadConfigTitle: 'Upload der Plugin-Konfiguration',
            messages: {
                localFileWritten: 'Die lokalen Dateien wurden angelegt. Verbindung zur Dreambox herstellen...',
                accessed: 'Die Verbindung zur Dreambox war erfolgreich. Upload der Dateien...',
                successful: 'Der Datentransfer war erfolgreich!',
                error: 'Es ist ein Fehler aufgetreten!'
            }
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
