import SystemNotification from "./models/system-notification";
import Device from "./models/device";
import Channel from "./models/channel";
import Function from "./models/function";
import XmlParser from "./xml-parser";

/**
 * Accessor to the xml api
 */
class XMLAPI {

    /**
     * Constructs the xml api object
     */
    constructor () {
        this._loadIp();

        this.cache = {
            devices: null
        };
    }

    /**
     * Get the device for a channel
     * @param {int} iseId The ise id of the channel
     */
    getDeviceForChannel(iseId) {
        if (this.cache.devices !== null) {
            return this.cache.devices.find(device => {
                return device.channels.filter(channel => channel.iseId === iseId).length > 0;
            });
        }
    }

    /**
     * Checks the ip validity
     * @param {string} ip The ip address to check
     * @returns Whether the ip is valid or not
     */
    async checkValidity (ip) {
        try {
            await fetch(this._url('version', ip));
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if the api has a connection
     */
    async _loadIp () {
        this.ccuIp = window.store.get('settings.ccuIp') || '127.0.0.1';
    }

    /**
     * Generates an api url
     * @param {string} script The name of the api script
     * @returns The full qualified url with query parameters
     */
    _url (script, ip = undefined) {
        return `http://${ ip || this.ccuIp }/addons/xmlapi/${ script }.cgi`;
    }

    /**
     * Get the current xml api version
     * @returns The xml api version
     */
    async version () {
        const response = await fetch(this._url('version'));
        const parser = new XmlParser(await response.text());
        return parser.document.documentElement.innerHTML;
    }

    /**
     * Loads all system notifications
     * @returns The system notifications
     */
    async systemNotifications () {
        const response = await fetch(this._url('systemNotification'));
        const parser = new XmlParser(await response.text());
        const notifications = parser.document.documentElement.querySelectorAll('notification');
        return Array.from(notifications).map(node => {
            return new SystemNotification(
                node.getAttribute('ise_id'),
                node.getAttribute('name'),
                node.getAttribute('type'),
                node.getAttribute('timestamp')
            )
        });
    }

    /**
     * Clears the system notifications
     */
    async clearSystemNotifications () {
        return fetch(this._url('systemNotificationClear'));
    }

    /**
     * Loads all devices
     * @returns The devices
     */
    async devices () {
        const response = await fetch(this._url('devicelist'));
        const parser = new XmlParser(await response.text());
        const devices = parser.document.documentElement.querySelectorAll('device');
        this.cache.devices = Array.from(devices).map(deviceNode => {
            const channels = Array.from(deviceNode.querySelectorAll('channel')).map(channelNode => {
                return new Channel(
                    channelNode.getAttribute('name'),
                    channelNode.getAttribute('type'),
                    channelNode.getAttribute('address'),
                    channelNode.getAttribute('ise_id'),
                    channelNode.getAttribute('direction'),
                    channelNode.getAttribute('parent_device'),
                    channelNode.getAttribute('index'),
                    channelNode.getAttribute('group_partner'),
                    channelNode.getAttribute('aes_available'),
                    channelNode.getAttribute('transmission_mode'),
                    channelNode.getAttribute('visible'),
                    channelNode.getAttribute('ready_config'),
                    channelNode.getAttribute('operate')
                );
            });

            return new Device(
                deviceNode.getAttribute('name'),
                deviceNode.getAttribute('address'),
                deviceNode.getAttribute('ise_id'),
                deviceNode.getAttribute('interface'),
                deviceNode.getAttribute('device_type'),
                deviceNode.getAttribute('ready_config'),
                channels
            );
        });

        return this.cache.devices;
    }

    /**
     * Loads all functions
     * @returns The functions
     */
    async functions () {
        const response = await fetch(this._url('functionlist'));
        const parser = new XmlParser(await response.text());
        const functions = parser.document.documentElement.querySelectorAll('function');
        const allChannels = (this.cache.devices).flatMap(device => device.channels);

        return Array.from(functions).map(functionNode => {
            const channels = Array.from(functionNode.querySelectorAll('channel')).map(channelNode => {
                const channelIseId = channelNode.getAttribute('ise_id');
                return allChannels.find(channel => channel.iseId === channelIseId);
            }).filter(channel => channel !== undefined);

            return new Function(
                functionNode.getAttribute('name'),
                functionNode.getAttribute('description'),
                functionNode.getAttribute('ise_id'),
                channels
            );
        });
    }
}

const xmlapi = new XMLAPI;
export default xmlapi;
