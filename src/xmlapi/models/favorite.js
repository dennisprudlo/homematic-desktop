export default class Favorite {

    /**
     * Constructs the favorite object
     * @param {string} name The favorite name
     * @param {int} iseId The internal id
     * @param {Channel[]} channels The list of channels
     */
    constructor (name, iseId, channels) {
        this.name = name;
        this.iseId = parseInt(iseId);
        this.channels = channels;
    }
}
