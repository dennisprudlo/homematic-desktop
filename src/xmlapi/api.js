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
        const xml = await response.text();
        const parser = new XmlParser(xml);
        return parser.document.documentElement.innerHTML;
    }
}

const xmlapi = new XMLAPI;
export default xmlapi;
