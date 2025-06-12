import axios from 'axios';

const BASE_URL = 'http://localhost:5174/api/occurrences'; // Substitua pela URL real da API

const OcurrenceService = {
    /**
     * Cria uma ocorrência no backend.
     * @param {Object} ocurrenceData - Dados da ocorrência.
     * @returns {Promise<Object>} - Resposta do backend.
     */
    createOcurrence: async (ocurrenceData) => {
        try {
            const response = await axios.post(BASE_URL, ocurrenceData);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar ocorrência:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Busca todas as ocorrências no backend.
     * @returns {Promise<Array>} - Lista de ocorrências.
     */
    getAllOcurrences: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar ocorrências:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Busca uma ocorrência por ID.
     * @param {string} ocurrenceId - ID da ocorrência.
     * @returns {Promise<Object>} - Dados da ocorrência.
     */
    getOcurrenceById: async (ocurrenceId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${ocurrenceId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar ocorrência por ID:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Atualiza uma ocorrência por ID.
     * @param {string} ocurrenceId - ID da ocorrência.
     * @param {Object} ocurrenceData - Dados atualizados da ocorrência.
     * @returns {Promise<Object>} - Dados atualizados da ocorrência.
     */
    updateOcurrence: async (ocurrenceId, ocurrenceData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${ocurrenceId}`, ocurrenceData);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar ocorrência:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Deleta uma ocorrência por ID.
     * @param {string} ocurrenceId - ID da ocorrência.
     * @returns {Promise<void>} - Confirmação de deleção.
     */
    deleteOcurrence: async (ocurrenceId) => {
        try {
            await axios.delete(`${BASE_URL}/${ocurrenceId}`);
        } catch (error) {
            console.error('Erro ao deletar ocorrência:', error);
            throw error.response?.data || error;
        }
    },
};

export default OcurrenceService;
