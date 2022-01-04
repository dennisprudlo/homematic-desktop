import moment from 'moment'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default class SystemVariable {

    /**
     * Constructs the system variable object
     * @param {string} name The name
     * @param {string} variable The variable
     * @param {string} value The value
     * @param {string} valueList The value list
     * @param {int} iseId the internal id
     * @param {float} min The min value
     * @param {float} max The max value
     * @param {string} unit The unit
     * @param {int} type The type
     * @param {int} subtype The subtype
     * @param {bool} logged Whether the var is logged
     * @param {bool} visible Whether the var is visible
     * @param {int} timestamp The timestamp of the last change
     * @param {string} valueNameTrue The name of the true value
     * @param {string} valueNameFalse The name of the false value
     */
    constructor (name, variable, value, valueList, iseId, min, max, unit, type, subtype, logged, visible, timestamp, valueNameTrue, valueNameFalse) {
        this.name = name;
        this.variable = variable;
        this.value = value;
        this.valueList = valueList;
        this.iseId = parseInt(iseId);
        this.min = parseFloat(min);
        this.max = parseFloat(max);
        this.unit = unit;
        this.type = parseInt(type);
        this.subtype = parseInt(subtype);
        this.logged = logged === 'true';
        this.visible = visible === 'true';
        this.timestamp = moment(timestamp * 1000);
        this.valueNameTrue = valueNameTrue;
        this.valueNameFalse = valueNameFalse;
    }

    /**
     * Gets the display name for the system variable
     * @returns The system vars display name
     */
    displayName () {
        switch (this.name) {
            case '${sysVarPresence}': return t('systemVariables.defaults.presence');
            case '${sysVarRainToday}': return t('systemVariables.defaults.rainToday');
            case '${sysVarRainYesterday}': return t('systemVariables.defaults.rainTomorrow');
            default: return this.name;
        }
    }
}
