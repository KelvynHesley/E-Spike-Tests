import alertService from '@/services/alertService';
import MarkerService from '@/services/markerService';
import OcurrenceService from '@/services/ocurrenceService';

export default {
    install(app) {
        app.config.globalProperties.$services = {
            alert: alertService,
            marker: MarkerService,
            occurrence: OcurrenceService
        };
    }
};