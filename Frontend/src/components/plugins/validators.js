import alertValidator from '../validators/alertValidator.js';
import occurrenceValidator from '../validators/ocurrenceValidator.js';

export default {
    install(app) {
        app.config.globalProperties.$validators = {
            alert: alertValidator,
            occurrence: occurrenceValidator
        };
    }
};