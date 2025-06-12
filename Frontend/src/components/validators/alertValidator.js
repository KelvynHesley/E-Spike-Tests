export class AlertValidator {
    validate(alertData) {
        const validationErrors = [];

        if (!alertData.alert_message?.trim()) {
            validationErrors.push('Mensagem do alerta é obrigatória');
        }

        if (!alertData.severity_level) {
            validationErrors.push('Nível de severidade é obrigatório');
        }

        if (!alertData.alert_radius || alertData.alert_radius <= 0) {
            validationErrors.push('Raio do alerta deve ser maior que zero');
        }

        return validationErrors;
    }
}

export default new AlertValidator();