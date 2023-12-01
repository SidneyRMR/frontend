import axios from "axios";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Defina a URL da API com base no tipo de dispositivo
const apiUrlDefault = process.env.REACT_APP_API_URL; // URL padrão da API

// console.log('default',apiUrlDefault);
// console.log('mobile',apiUrl);
const baseURL = isMobile() ? 'http://192.168.190.39:8800' : apiUrlDefault;
// const baseURL =  apiUrl 

export const api = axios.create({
  baseURL ,
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
    window.location.href = "/login"; // Corrigido: era window.href, deve ser window.location.href
    return Promise.reject(error);
  }
);

export default api;
