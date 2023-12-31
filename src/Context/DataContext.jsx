import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataContextProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [festas, setFestas] = useState([]);
  const [vendaProdutosUsuario, setVendaProdutosUsuario] = useState([]);
  // const [festa, setFesta] = useState();

  const atualizaFestas = async () => {
    try {
      let res = await api.get(`/api/festa`);
      res = await res.data.festa;
      setFestas(res);
      setDados(res);
    } catch (error) {
      console.error(error);
    }
  };
  const atualizaUsuarios = async (festaId) => {
    // console.log('festaId',festaId)
    try {
      // let res = await api.get(`/api/usuario`);
      let res = await api.get(`/api/usuario/${festaId}`);
      res = await res.data.usuarios;
      // console.log('usuario',res)
      setDados(res);
    } catch (error) {
      console.error(error);
    }
  };
  const atualizaProdutos = async (festaId) => {
    try {
      let res = await api.get(`/api/produto/${festaId}`);
      res = await res.data.produtos;
      setDados(res);
    } catch (error) {
      console.error(error);
    }
  };
  const atualizaVendas = async (festaId) => {
    console.log("festaId", festaId);
    try {
      let res = await api.get(`/api/venda/${festaId}`);
      res = await res.data.vendas;
      setDados(res);
    } catch (error) {
      console.error(error);
    }
  };
  const atualizaVendasProdutosUsuario = async (usuarioId) => {
    console.log("usuarioId", usuarioId);
    try {
      let res = await api.get(`/api/venda/${usuarioId}`);
      res = await res.data.vendas;
      setVendaProdutosUsuario(res);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   atualizaFestas();
  // }, []);

  return (
    <DataContext.Provider
      value={{
        dados,
        festas,
        vendaProdutosUsuario,
        atualizaFestas,
        atualizaVendas,
        atualizaProdutos,
        atualizaUsuarios,
        atualizaVendasProdutosUsuario,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
