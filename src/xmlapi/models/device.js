import i18n from '../../assets/i18n';
const { t } = i18n.global

export default class Device {

    /**
     * Constructs the device object
     * @param {string} name The name
     * @param {string} address The device address
     * @param {int} iseId The internal id
     * @param {string} radioInterface The interface
     * @param {string} deviceType The device type
     * @param {bool} readyConfig Whether the configuration is ready
     * @param {Channel[]} channels The list of channels
     */
    constructor (name, address, iseId, radioInterface, deviceType, readyConfig, channels) {
        this.name = name
        this.address = address;
        this.iseId = parseInt(iseId);
        this.radioInterface = radioInterface;
        this.deviceType = deviceType;
        this.readyConfig = readyConfig;
        this.channels = channels;
    }

    /**
     * Gets the device type name
     * @returns The device type name
     */
     typeName () {
        return deviceTypes[this.deviceType] || t('general.unknownDeviceType');
    }

    /**
     * Gets a clone of the device without channel data
     * @returns A device clone without channels
     */
    withoutChannels () {
        return new Device(this.name, this.address, this.iseId, this.radioInterface, this.deviceType, this.readyConfig, []);
    }
}

export const deviceTypes = {
    'HM-LC-Sw1-Ba-PCB': 'Funk-Schaltaktor für Batteriebetrieb',
    'HM-LC-Sw1-FM': '1-Fach Funk-Schaltaktor',
    'HM-TC-IT-WM-W-EU': 'Funk-Wandthermostat',
    'HM-LC-Sw1-Pl-DN-R1': '1-Fach Funk-Zwischenstecker-Schaltaktor',
    'HM-Sen-MDIR-O': 'Funk-IR-Bewegungsmelder AußenWM55',
    'HM-Sen-MDIR-SM': t('general.unknownDeviceType'),
    'HM-Sen-MDIR-O-2': 'Funk-IR-Bewegungsmelder Außen',
    'HM-Sen-MDIR-WM55': t('general.unknownDeviceType'),
    'HmIP-SMO': t('general.unknownDeviceType'),
    'HM-LC-Sw1-Pl-2': '1-Fach Funk-Zwischenstecker-Schaltaktor',
    'HM-Sec-SCo': 'Funk-Tür-/Fensterkontakt',
    'HM-LC-Dim1T-FM': '1-Fach Funk-Dimmaktor',
    'HM-LC-Sw2-FM': '2-Fach Funk-Schaltaktor',
    'HM-PB-2-WM55-2': '2-Fach Funk-Wandsender',
    'HM-Sec-SD-2-Team': t('general.unknownDeviceType'),
    'HM-OU-CFM-TW': t('general.unknownDeviceType'),
    'HM-OU-CM-PCB': 'Funk-Gong-Modul MP3',
    'HM-PB-4Dis-WM': 'Funk-Wandsender mit Display',
    'HmIP-FAL230-C6': t('general.unknownDeviceType'),
    'HM-RC-4-3': t('general.unknownDeviceType'),
    'HM-RC-Sec4-3': t('general.unknownDeviceType'),
    'HM-LC-Sw1-Pl-CT-R1': t('general.unknownDeviceType'),
    'HM-PB-2-WM55': t('general.unknownDeviceType'),
    'HM-LC-Sw4-DR-2': '4-Fach Funk-Schaltaktor',
    'HM-CC-RT-DN': 'Funk-Heizkörperthermostat',
    'HM-Sec-SD-Team': t('general.unknownDeviceType'),
    'HmIP-RCV-50': t('general.unknownDeviceType'),
    'HM-LC-Bl1-FM': '1-Fach Funk-Rolladenaktor',
    'HM-PB-6-WM55': t('general.unknownDeviceType'),
    'HM-Sec-MDIR-2': 'Funk-IR-Bewegungsmelder Innen',
    'HM-Sec-SD': t('general.unknownDeviceType'),
    'HM-Sec-SD-2': t('general.unknownDeviceType'),
    'HM-OU-LED16': 'led-display-16-slots',
    'HmIP-SWDO-I': t('general.unknownDeviceType'),
    'HmIP-BSM': t('general.unknownDeviceType'),
    'HmIP-WTH-2': t('general.unknownDeviceType'),
    'HM-ES-PMSw1-Pl': '1-Fach Funk-Schaltaktor Leistungsmesser',
    'HmIP-SWD': t('general.unknownDeviceType'),
    'HM-WDS100-C6-O': 'Funk-Kombi-Sensor'
};
