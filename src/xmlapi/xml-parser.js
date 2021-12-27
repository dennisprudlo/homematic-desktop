export default class XmlParser {

    constructor (content) {
        this.content = content;
        this.parser = new DOMParser;
        this.document = this.parser.parseFromString(this.content, 'text/xml');
    }
}
