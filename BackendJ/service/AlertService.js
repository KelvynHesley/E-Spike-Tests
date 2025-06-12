const Alert = require('../model/Alert');

class AlertService {
    // Criar novo alerta
    async createAlert(alertData, userId) {
        try {
            console.log('Dados recebidos', { alertData, userId });
            console.log('user_id:', userId);

            // Validação dos dados obrigatórios
            if (
                !alertData.alert_message ||
                !alertData.severity_level ||
                alertData.latitude === undefined ||
                alertData.longitude === undefined ||
                !userId
            ) {
                throw new Error('Dados do alerta incompletos');
            }

            console.log('Criando alerta com userId:', userId);

            const alert = new Alert({
                ...alertData,
                user_id: userId,
                alert_time: new Date()
            });

            const savedAlert = await alert.save(); // ✅ Corrigido
            return savedAlert;
        } catch (error) {
            console.error('Erro ao criar alerta:', error);
            throw error;
        }
    }

    // Buscar todos os alertas ativos
    async getAllAlerts() {
        try {
            const alerts = await Alert.find({ active: true })
                .sort({ alert_time: -1 })
                .populate('user_id', 'name'); // Popula o nome do usuário
            return alerts;
        } catch (error) {
            console.error('Erro ao buscar alertas:', error);
            throw error;
        }
    }

    // Buscar alertas próximos
    async getNearbyAlerts(latitude, longitude, radius = 1000) {
        try {
            const radiusInDegrees = radius / 111320; // Aproximação

            const alerts = await Alert.find({
                active: true,
                latitude: {
                    $gte: latitude - radiusInDegrees,
                    $lte: latitude + radiusInDegrees
                },
                longitude: {
                    $gte: longitude - radiusInDegrees,
                    $lte: longitude + radiusInDegrees
                }
            }).sort({ alert_time: -1 });

            return alerts;
        } catch (error) {
            console.error('Erro ao buscar alertas próximos:', error);
            throw error;
        }
    }

    // Atualizar status do alerta
    async updateAlertStatus(alertId, userId, status) {
        try {
            const alert = await Alert.findOne({ _id: alertId, user_id: userId });

            if (!alert) {
                throw new Error('Alerta não encontrado ou não autorizado');
            }

            alert.active = status;
            await alert.save();
            return alert;
        } catch (error) {
            console.error('Erro ao atualizar status do alerta:', error);
            throw error;
        }
    }

    // Deletar alerta
    async deleteAlert(alertId, userId) {
        try {
            const alert = await Alert.findOneAndDelete({
                _id: alertId,
                user_id: userId
            });

            if (!alert) {
                throw new Error('Alerta não encontrado ou não autorizado');
            }

            return alert;
        } catch (error) {
            console.error('Erro ao deletar alerta:', error);
            throw error;
        }
    }
}

module.exports = new AlertService();
