import React, { createContext, useContext, useState } from 'react';
import { api } from "../services/api";

const VendasContext = createContext();

export function useVendasContext() {
  return useContext(VendasContext);
}

export function VendasContextProvider({ children }) {
  const [caixas, setCaixas] = useState([]);
  // const [festa, setFesta] = useState();

  const carregaCaixas = async (usuarioId) => {
    try {
      let res = await api.get(`/api/caixa/${usuarioId}`);
      res = await res.data.caixas;
      console.log(res);
      setCaixas(res);
    } catch (error) {
      console.error(error);
    }
  };
  // const carregaProdutos = async (festaId) => {
  //   try {
  //     let res = await api.get(`/api/produto/${festaId}`);
  //     res = await res.data.produtos;
  //     setDados(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const carregaVendas = async () => {
  //   try {
  //     let res = await api.get(`/api/venda`);
  //     res = await res.data.venda;
  //     setDados(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <VendasContext.Provider value={{ caixas, carregaCaixas}}>
      {children}
    </VendasContext.Provider>
  );
}
