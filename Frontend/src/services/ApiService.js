import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174';

const apiClient = axios.create({
    baseURL: API_URL, // Usando API_URL de forma centralizada
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Interceptor de resposta para tratamento de erro
apiClient.interceptors.response.use(
    response => response,
    error => {
        const customError = new Error(
            error.response?.data?.message || 'Um erro ocorreu'
        );
        customError.statusCode = error.response?.status;
        throw customError;
    }
);

// Interceptor de requisição para autenticação
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Funções de autenticação
const authService = {
    login(credentials) {
        return apiClient.post('/auth/login', credentials);
    },
    register(userData) {
        return apiClient.post('/auth/register', userData);
    }
};

// Funções de usuário
const userService = {
    create(userData) {
        return apiClient.post('/api/users', userData);
    },
    get(id) {
        return apiClient.get(`/api/users/${id}`);
    },
    update(id, userData) {
        return apiClient.put(`/api/users/${id}`, userData);
    },
    delete(id) {
        return apiClient.delete(`/api/users/${id}`);
    }
};

export { apiClient, authService, userService };
