import xmlapi from "../api";
import i18n from '../../assets/i18n';
const { t } = i18n.global

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
        this.type = parseInt(type);
        this.address = address;
        this.iseId = parseInt(iseId);
        this.direction = direction;
        this.parentDevice = parseInt(parentDevice);
        this.index = index;
        this.groupPartner = groupPartner;
        this.aesAvailable = aesAvailable;
        this.transmissionMode = transmissionMode;
        this.visible = visible;
        this.readyConfig = readyConfig;
        this.operate = operate;
    }

    /**
     * Get the device of the channel
     * @returns The device
     */
    device () {
        return xmlapi.getDeviceForChannel(this.iseId);
    }

    /**
     * Gets the channel type name
     * @returns The channel type name
     */
    typeName () {
        return channelTypes[this.type] || t('general.unknown');
    }

    /**
     * Checks whether the channel is supported by the dreambox extension
     * @returns Whether dreambox is supported
     */
    supportsDreamboxExtension () {
        return [ 26 ].includes(this.type);
    }

    /**
     * Checks whether a query string matches the channel
     * @param {string} query The query string
     * @returns Whether the channel matches the search query
     */
    matchSearch (query) {
        return `${this.name} ${this.device().name}`.toLowerCase().includes(query.toLowerCase());
    }
}

export const channelTypes = {
    26: 'On-Off-Switch'
};
