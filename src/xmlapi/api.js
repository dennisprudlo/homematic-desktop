import SystemNotification from "./models/system-notification";
import XmlParser from "./xml-parser";

/**
 * Accessor to the xml api
 */
class XMLAPI {

    /**
     * Constructs the xml api object
     */
    constructor () {
        this.ccuIp = '192.168.178.106';
    }

    /**
     * Generates an api url
     * @param {string} script The name of the api script
     * @returns The full qualified url with query parameters
     */
    _url (script) {
        return `http://${ this.ccuIp }/addons/xmlapi/${ script }.cgi`;
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
}

const xmlapi = new XMLAPI;
export default xmlapi;
