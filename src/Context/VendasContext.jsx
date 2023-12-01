import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const VendasContext = createContext();

export function useVendasContext() {
  return useContext(VendasContext);
}

export function VendasContextProvider({ children }) {
  const [caixa, setCaixa] = useState();
  const [caixas, setCaixas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendasFesta, setVendasFesta] = useState([]);
  const [vendasUsuario, setVendasUsuario] = useState([]);

  const carregaCaixa = async (caixa) => {
    setCaixa(caixa);
    // console.log("carregaCaixaDoContext", caixa);
  };
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
  // const carregaVendasFesta = async (festaId) => {
  //   try {
  //     let res = await api.get(`/api/venda/${festaId}`);
  //     res = await res.data.vendas;
  //     // console.log(res);
  //     setVendasFesta(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const carregaVendasUsuario = async (usuarioId) => {
    try {
      let res = await api.get(`/api/venda/${usuarioId}`);
      res = await res.data.vendas;
      // console.log(res);
      setVendasFesta(res);
    } catch (error) {
      console.error(error);
    }
  };
  
  // const carregaVendasUsuario = async (usuarioId) => {
  //   try {
  //     // console.log('idUsuarioCarregaVendas',usuarioId);
  //     let res = await api.get(`/api/venda/${usuarioId}`);
  //     res = await res.data.vendas;
  //     console.log('requisição esta funcionando',res);
  //     setVendasUsuario(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <VendasContext.Provider
      value={{
        caixa,
        carregaCaixa,
        caixas,
        carregaCaixas,
        produtos,
        carregaProdutos,
        vendasFesta,
        vendasUsuario,
        // carregaVendasFesta,
        carregaVendasUsuario,
      }}
    >
      {children}
    </VendasContext.Provider>
  );
}
