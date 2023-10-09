import { Table, Container, Button, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import ComponenteModal from "../Components/ComponenteModal";
function ComponenteAdministrativo(props) {
    console.log("DADOS", props.dados[0]);
    console.log("FESTAS", props.festas);
    console.log("FESTA", props.festa);
    console.log("selectedItem", props.seletor);
    
    const [nomeBotao, setNomeBotao] = useState("Nova Festa");
  useEffect(() => {
    if (props.seletor === undefined) {
      setNomeBotao(null);
    } else if (props.seletor === "festas") {
      setNomeBotao("Nova Festa");
    } else if (props.seletor === "usuarios") {
      setNomeBotao("Novo Usuário");
    } else if (props.seletor === "vendas") {
      setNomeBotao(null);
    } else if (props.seletor === "produtos") {
      setNomeBotao("Novo Produto");
    }
  }, [props.seletor]);

  if (!props.dados || props.dados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }
  const colunas = Object.keys(props.dados[0]);

  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          {nomeBotao === null ? null : (
            <ComponenteModal
              nomeBotao={nomeBotao}
              festa={props.festa}
              variant="success"
            />
          )}
        </div>
        <div className="p-2 sub-titulo">
          LISTAGEM DE {props.seletor.toUpperCase()}
        </div>
      </Stack>
      <Table className="tabela align-center">
        <thead>
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna}>{coluna}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.dados.map((dado, i) =>
            (dado.nome === "master") | (dado.nome === "Master User") ? null : (
              <>
                <tr key={i} className={i % 2 === 0 ? "Par" : "Impar"}>
                  {colunas.map((coluna) => (
                    <td key={coluna}>{dado[coluna]}</td>
                  ))}
                  <td>
                    {props.seletor === "festas" ? (
                      <Button variant="primary" className="">
                        Detalhes
                      </Button>
                    ) : (
                      <Button variant="primary" className="">
                        Alterar
                      </Button>
                    )}
                    {"  "}
                    {props.seletor === "festas" ? (
                      <Button variant="danger" className="">
                        Encerrar
                      </Button>
                    ) : (
                      <Button variant="danger" className="">
                        Bloquear
                      </Button>
                    )}
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ComponenteAdministrativo;
