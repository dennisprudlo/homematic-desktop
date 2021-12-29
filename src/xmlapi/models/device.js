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
        this.iseId = iseId;
        this.radioInterface = radioInterface;
        this.deviceType = deviceType;
        this.readyConfig = readyConfig;
        this.channels = channels;
    }
}

export const deviceTypes = {
    'HM-LC-Sw1-Ba-PCB': 'unknown',
    'HM-LC-Sw1-FM': 'unknown',
    'HM-TC-IT-WM-W-EU': 'unknown',
    'HM-LC-Sw1-Pl-DN-R1': 'unknown',
    'HM-Sen-MDIR-O': 'unknown',
    'HM-Sen-MDIR-SM': 'unknown',
    'HM-Sen-MDIR-O-2': 'unknown',
    'HM-Sen-MDIR-WM55': 'unknown',
    'HmIP-SMO': 'unknown',
    'HM-LC-Sw1-Pl-2': 'unknown',
    'HM-Sec-SCo': 'unknown',
    'HM-LC-Dim1T-FM': 'unknown',
    'HM-LC-Sw2-FM': 'unknown',
    'HM-PB-2-WM55-2': 'unknown',
    'HM-Sec-SD-2-Team': 'unknown',
    'HM-OU-CFM-TW': 'unknown',
    'HM-PB-4Dis-WM': 'unknown',
    'HmIP-FAL230-C6': 'unknown',
    'HM-RC-4-3': 'unknown',
    'HM-RC-Sec4-3': 'unknown',
    'HM-LC-Sw1-Pl-CT-R1': 'unknown',
    'HM-PB-2-WM55': 'unknown',
    'HM-LC-Sw4-DR-2': 'unknown',
    'HM-CC-RT-DN': 'unknown',
    'HM-Sec-SD-Team': 'unknown',
    'HmIP-RCV-50': 'unknown',
    'HM-LC-Bl1-FM': 'unknown',
    'HM-PB-6-WM55': 'unknown',
    'HM-Sec-MDIR-2': 'unknown',
    'HM-Sec-SD': 'unknown',
    'HM-Sec-SD-2': 'unknown',
    'HM-OU-LED16': 'led-display-16-slots',
    'HmIP-SWDO-I': 'unknown',
    'HmIP-BSM': 'unknown',
    'HmIP-WTH-2': 'unknown',
    'HM-ES-PMSw1-Pl': 'unknown',
    'HmIP-SWD': 'unknown',
    'HM-WDS100-C6-O': 'unknown'
};
