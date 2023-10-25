import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:8800'
  baseURL: process.env.REACT_APP_API_URL,
});

// Adicione um interceptor para todas as solicitações
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ou de onde você obtém o token
    if (token){
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    window.href="/login"
    return Promise.reject(error);

  }
);

export default api;
