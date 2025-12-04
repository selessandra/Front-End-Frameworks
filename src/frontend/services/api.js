import axios from 'axios';

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Cria uma instância configurada do axios para comunicação com o backend
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 segundos
});

/**
 * Interceptor para adicionar token de autenticação em todas as requisições
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Erro na configuração da requisição:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor para tratamento de respostas
 */
api.interceptors.response.use(
  (response) => {
    // Sucesso - pode adicionar logs se necessário
    return response;
  },
  (error) => {
    // Tratamento de erros comuns
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Token expirado ou inválido
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          window.location.href = '/login';
          break;
          
        case 403:
          console.warn('Acesso não autorizado');
          break;
          
        case 404:
          console.warn('Recurso não encontrado');
          break;
          
        case 500:
          console.error('Erro interno do servidor');
          break;
          
        default:
          console.error(`Erro ${status}:`, error.response.data);
      }
    } else if (error.request) {
      console.error('Servidor não respondeu:', error.message);
    } else {
      console.error('Erro ao configurar requisição:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;