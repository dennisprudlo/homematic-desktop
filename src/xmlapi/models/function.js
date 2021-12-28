export default class Function {

    /**
     * Constructs the function object
     * @param {string} name The function name
     * @param {string} description The function description
     * @param {int} iseId The internal id
     */
    constructor (name, description, iseId, channels) {
        this.name = name
        this.description = description;
        this.iseId = iseId;
        this.channels = channels;
    }
}
