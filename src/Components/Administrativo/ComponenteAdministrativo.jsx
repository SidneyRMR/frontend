import { Container, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";

import ModalUsuario from "./ModalUsuario";
import ModalFesta from "./ModalFesta";
import ModalProduto from "./ModalProduto";
import ListagemTabelas from "./ListagemTabelas";

import { useDataContext } from "../../Context/DataContext";

function ComponenteAdministrativo(props) {
  const { atualizaFestas, atualizaProdutos, atualizaVendas, atualizaUsuarios, totalVendas} =
    useDataContext();

  const [nomeBotao, setNomeBotao] = useState("Nova Festa");

  useEffect(() => {
    if (props.seletor === undefined) {
      setNomeBotao(null);
    } else if (props.seletor === "festas") {
      setNomeBotao("Nova Festa");
      atualizaFestas();
    } else if (props.seletor === "usuarios") {
      setNomeBotao("Novo Usuário");
      atualizaUsuarios(props.festa);
    } else if (props.seletor === "produtos") {
      atualizaProdutos(props.festa);
      setNomeBotao("Novo Produto");
    } else if (props.seletor === "vendas") {
      setNomeBotao(null);
      atualizaVendas(props.festa);
    }
  }, [props.seletor]);
  
  // console.log(props.festa);
  return (
    <Container>
      <Stack direction="horizontal">
        <div className="p-2">
          {props.seletor === "festas" ? (
            <ModalFesta nomeBotao={nomeBotao} festa={props.festa} />
          ) : props.seletor === "usuarios" ? (
            // Preciso passar a festa pois é uma dependencia do usuario
            <ModalUsuario nomeBotao={nomeBotao} festa={props.festa} />
          ) : props.seletor === "produtos" ? (
            // Preciso passar a festa pois é uma dependencia do produto
            <ModalProduto nomeBotao={nomeBotao} festa={props.festa} />
          ) : null}
        </div>
        <div className="p-2 sub-titulo">
          LISTAGEM DE {props.seletor.toUpperCase()}
        </div>
      </Stack>
      <ListagemTabelas
        seletor={props.seletor}
        dados={props.dados}
        festa={props.festa}
      />
    </Container>
  );
}

export default ComponenteAdministrativo;
