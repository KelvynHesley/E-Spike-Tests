import { ref } from 'vue';
import alertService from '@/services/alertService';

export function useAlertManager() {
    const points = ref([]);
    const alert = ref({
        visible: false,
        message: "",
        severity: "",
        time: ""
    });

    const fetchPoints = async () => {
        try {
            const response = await alertService.getAllAlerts();
            points.value = response;
        } catch (error) {
            console.error('Erro ao carregar pontos no mapa', error);
            throw error;
        }
    };

    const checkLatestAlert = async () => {
        try {
            const alerts = await alertService.getAllAlerts();
            if (alerts && alerts.length > 0) {
                // Pega o alerta mais recente
                const latestAlert = alerts.sort((a, b) =>
                    new Date(b.alert_time) - new Date(a.alert_time)
                )[0];

                // Usa a estrutura existente do alert
                alert.value = {
                    visible: true,
                    message: latestAlert.alert_message,
                    severity: latestAlert.severity_level,
                    time: latestAlert.alert_time
                };

                // Define o timer para esconder o alerta após 15 segundos
                setTimeout(() => {
                    alert.value.visible = false;
                }, 15000);
            }
        } catch (error) {
            console.error('Erro ao buscar alertas:', error);
            throw error;
        }
    };

    return {
        points,
        alert,
        fetchPoints,
        checkLatestAlert
    };
}