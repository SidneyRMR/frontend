import { useState, useEffect } from 'react';
import { api } from "../services/api";

export function CarregarUsuarios() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/api/usuario");
        setUsuarios(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return usuarios.usuarios;
}
