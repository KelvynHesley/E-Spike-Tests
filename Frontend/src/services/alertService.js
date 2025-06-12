// services/alertService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5174/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Request interceptor para adicionar token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request config:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    error => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor para tratamento de erros
apiClient.interceptors.response.use(
    response => {
        console.log('Response received:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('Response error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Erro de autenticação - Token inválido ou expirado');
                    // Você pode adicionar lógica para redirecionar para login aqui
                    break;
                case 403:
                    throw new Error('Não autorizado para realizar esta ação');
                case 404:
                    throw new Error('Recurso não encontrado');
                case 400:
                    throw new Error(error.response.data.message || 'Dados inválidos enviados');
                default:
                    throw new Error(error.response.data.message || 'Erro no servidor');
            }
        }
        throw error;
    }
);

export default {
    // Criar um novo alerta
    async createAlert(alertData, userId) {
        try {
            console.log('Tentando criar alerta com dados:', alertData);
            console.log('Tipo do userId:', typeof userId);
            console.log('userId:', userId);

            // Validação dos dados antes de enviar
            if (!alertData.alert_message || !alertData.severity_level || !alertData.latitude || !alertData.longitude) {
                throw new Error('Dados do alerta incompletos');
            }

            // Adicionando user_id aos dados do alerta
            const alertPayload = {
                ...alertData,
                user_id: userId // Incluindo user_id aqui
            };

            const response = await apiClient.post('/alerts', alertPayload);

            console.log('Alerta criado com sucesso:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro detalhado ao criar alerta:', { message: error.message, response: error.response?.data });
            throw new Error(error.response?.data?.message || 'Erro ao criar alerta.');
        }
    },

    // Buscar todos os alertas
    async getAllAlerts() {
        try {
            console.log('Buscando todos os alertas');
            const response = await apiClient.get('/alerts');
            console.log('Alertas recebidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar alertas:', error);
            throw error;
        }
    },

    // Buscar alertas próximos
    async getNearbyAlerts(latitude, longitude, radius) {
        try {
            console.log('Buscando alertas próximos:', { latitude, longitude, radius });
            const response = await apiClient.get('/alerts/nearby', {
                params: { latitude, longitude, radius }
            });
            console.log('Alertas próximos recebidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar alertas próximos:', error);
            throw error;
        }
    },

    // Atualizar status de um alerta
    async updateAlertStatus(alertId, status) {
        try {
            console.log('Atualizando status do alerta:', { alertId, status });
            const response = await apiClient.patch(`/alerts/${alertId}/status`, { status });
            console.log('Status do alerta atualizado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar status do alerta:', error);
            throw error;
        }
    },

    // Deletar um alerta
    async deleteAlert(alertId) {
        try {
            console.log('Deletando alerta:', alertId);
            const response = await apiClient.delete(`/alerts/${alertId}`);
            console.log('Alerta deletado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar alerta:', error);
            throw error;
        }
    }
};