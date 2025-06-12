import axios from 'axios';

const BASE_URL = 'http://localhost:5174/api/markers'; // Substitua pela URL real da API

const MarkerService = {
    /**
     * Cria um marcador no backend.
     * @param {Object} markerData - Dados do marcador.
     * @returns {Promise<Object>} - Resposta do backend.
     */
    async createMarker(markerData) {
        try {
            const response = await axios.post(BASE_URL, markerData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar marcador:", error);
            throw error.response?.data || error;
        }
    },

    /**
     * Busca todos os marcadores no backend.
     * @returns {Promise<Array>} - Lista de marcadores.
     */
    async getAllMarkers() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar marcadores:", error);
            throw error.response?.data || error;
        }
    },

    /**
     * Busca um marcador por ID.
     * @param {string} markerId - ID do marcador.
     * @returns {Promise<Object>} - Dados do marcador.
     */
    async getMarkerById(markerId) {
        try {
            console.log(`Buscando marcador por ID: ${markerId}`); // Log para depuração
            const response = await axios.get(`${BASE_URL}/${markerId}`);
            console.log('Resposta ao buscar marcador por ID:', response.data); // Log para depuração
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar marcador por ID:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Busca marcadores por ID de ocorrência.
     * @param {string} ocurrenceId - ID da ocorrência associada.
     * @returns {Promise<Array>} - Lista de marcadores.
     */
    async getMarkersByOcurrence(ocurrenceId) {
        try {
            const response = await axios.get(`${BASE_URL}/ocurrence/${ocurrenceId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar marcadores por ID de ocorrência:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Deleta um marcador por ID.
     * @param {string} markerId - ID do marcador.
     * @returns {Promise<void>} - Confirmação de deleção.
     */
    async deleteMarker(markerId) {
        try {
            await axios.delete(`${BASE_URL}/${markerId}`);
        } catch (error) {
            console.error('Erro ao deletar marcador:', error);
            throw error.response?.data || error;
        }
    },
};

export default MarkerService;
