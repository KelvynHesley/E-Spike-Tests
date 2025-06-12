import axios from 'axios';

// --- Instância do Axios Corrigida ---
const apiClient = axios.create({
    // baseURL deve ser apenas a raiz da sua API no backend
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5174', // <-- CORRIGIDO
    headers: {
        'Content-Type': 'application/json',
        // O header de autorização foi REMOVIDO daqui. O interceptor abaixo é a forma correta.
    },
    timeout: 10000
});


// --- Interceptor de Requisição ---
// Esta é a forma CORRETA de adicionar o token dinamicamente a cada requisição.
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            // Adiciona o cabeçalho apenas se o token existir
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


export default {
    /**
     * Registra um novo usuário.
     * Aponta para a rota PÚBLICA /register. Não precisa de token.
     */
    async createUser(userData) {
        try {
            // Aponta para a rota de registro pública que criamos no backend
            const response = await apiClient.post('/register', userData); // <-- CORRIGIDO
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Busca os dados do usuário logado.
     * Aponta para a rota PROTEGIDA /api/users/me. Precisa de token.
     */
    async getUser() {
        try {
            // Adiciona o caminho completo da API, pois a baseURL agora é a raiz
            const response = await apiClient.get('/api/users/me'); // <-- CORRIGIDO
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Atualiza os dados do usuário por email.
     * Aponta para a rota PROTEGIDA. Precisa de token.
     */
    async updateUser(email, userData) {
        try {
            // Adiciona o caminho completo da API
            const response = await apiClient.put(`/api/users/email/${email}`, userData); // <-- CORRIGIDO
            console.log('Resposta do servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    },

    /**
     * Deleta um usuário por email.
     * Aponta para a rota PROTEGIDA. Precisa de token.
     */
    async deleteUserByEmail(email) {
        try {
            // Adiciona o caminho completo da API
            const response = await apiClient.delete(`/api/users/email/${email}`); // <-- CORRIGIDO
            console.log('Resposta da deleção:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.response?.data || error.message);
            throw error;
        }
    }
};