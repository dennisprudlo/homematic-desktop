import moment from 'moment'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default class SystemNotification {

    /**
     *
     * @param {int} iseId The internal id
     * @param {string} name The notification name
     * @param {string} type The notification type
     * @param {int} timestamp The timestamp
     */
    constructor (iseId, name, type, timestamp) {
        this.iseId = iseId;
        this.name = name;

        const parts = name.split('.');
        this.protocol = parts.shift();
        this.serial = parts.shift();
        this.type = type;
        this.datetime = moment(timestamp * 1000);
    }

    /**
     * Gets the readable notification type
     * @returns The readable tyoe
     */
    getType () {
        switch (this.type) {
            case 'CONFIG_PENDING': return t('systemNotifications.types.configPending');
        }

        return t('general.unknown');
    }

    /**
     * Checks if the notification type can be cleared
     * @returns Whether the notification type can be cleared
     */
    isClearable () {
        return [  ].includes(this.type)
    }
}
