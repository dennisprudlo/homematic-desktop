export default class Channel {

    /**
     * Constructs the channel object
     * @param {string} name The channel name
     * @param {int} type The channel type
     * @param {string} address The channel address
     * @param {int} iseId The internale channel id
     * @param {string} direction The radio direction
     * @param {int} parentDevice The internale id of the parent device
     * @param {int} index The index
     * @param {string} groupPartner The group partner
     * @param {bool} aesAvailable Whether aes is available
     * @param {string} transmissionMode The transmission mode
     * @param {bool} visible Whether the device is visible
     * @param {bool} readyConfig Whether the configuration is ready
     * @param {bool} operate Whether the channel operates
     */
    constructor (name, type, address, iseId, direction, parentDevice, index, groupPartner, aesAvailable, transmissionMode, visible, readyConfig, operate) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.iseId = iseId;
        this.direction = direction;
        this.parentDevice = parentDevice;
        this.index = index;
        this.groupPartner = groupPartner;
        this.aesAvailable = aesAvailable;
        this.transmissionMode = transmissionMode;
        this.visible = visible;
        this.readyConfig = readyConfig;
        this.operate = operate;
    }
}
