import { api } from "./api";


const buscaIpAdress = async () => {
  try {
    const res = await api.get('/api/getIpAddress');
    const ipAddress = res.data.ipAddress;
    const urlFront = `${ipAddress}:3000/login`;
    const urlApi = `${ipAddress}:8800`;
    return [urlFront, urlApi]
  } catch (error) {
    console.error(error);
  }
};

export default buscaIpAdress