import { Table, Container, Row, Col, Button, Stack } from "react-bootstrap";

function ComponenteAdministrativo(props) {
  // console.log(props.dados)
  if (!props.dados || props.dados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }
  const colunas = Object.keys(props.dados[0]);
  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <Button variant="success">Adicionar</Button>
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
            dado.nome === "master" | dado.nome === "Master User"? null : (
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
