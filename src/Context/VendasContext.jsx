import React, { createContext, useContext, useState } from 'react';
import { api } from "../services/api";

const VendasContext = createContext();

export function useVendasContext() {
  return useContext(VendasContext);
}

export function VendasContextProvider({ children }) {
  const [caixa, setCaixa] = useState();
  const [caixas, setCaixas] = useState([]);
  const [produtos, setProdutos] = useState();
  const [vendas, setVendas] = useState();
  
  const carregaCaixa = async (caixa) => {
    setCaixa(caixa);
    console.log('carregaCaixaDoContext',caixa);
  }
  const carregaCaixas = async (usuarioId) => {
    try {
      let res = await api.get(`/api/caixa/${usuarioId}`);
      res = await res.data.caixas;
      // console.log(res);
      setCaixas(res);
    } catch (error) {
      console.error(error);
    }
  };
  const carregaProdutos = async (festaId) => {
    try {
      let res = await api.get(`/api/produto/${festaId}`);
      res = await res.data.produtos;
      setProdutos(res);
    } catch (error) {
      console.error(error);
    }
  };
  const carregaVendas = async (festaId) => {
    try {
      let res = await api.get(`/api/venda/${festaId}`);
      res = await res.data.venda;
      setVendas(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VendasContext.Provider value={{ caixa, carregaCaixa, caixas, carregaCaixas, produtos, carregaProdutos, vendas, carregaVendas}}>
      {children}
    </VendasContext.Provider>
  );
}
