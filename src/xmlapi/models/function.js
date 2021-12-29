import i18n from '../../assets/i18n';
const { t } = i18n.global

export default class Function {

    /**
     * Constructs the function object
     * @param {string} name The function name
     * @param {string} description The function description
     * @param {int} iseId The internal id
     * @param {Channel[]} channels The list of channels
     */
    constructor (name, description, iseId, channels) {
        this.name = name === 'funcCentral' ? t('general.centralFunction') : name;
        this.description = description;
        this.iseId = iseId;
        this.channels = channels;
    }
}
