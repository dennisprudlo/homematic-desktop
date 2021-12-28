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
