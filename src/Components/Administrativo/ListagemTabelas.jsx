import { Table, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";
import ModalFesta from "./ModalFesta";
import ModalUsuario from "./ModalUsuario";
import ModalProduto from "./ModalProduto";
import { useDataContext } from "../../Context/DataContext";
// import { format } from "date-fns";

const ListagemTabelas = (props) => {
  const { atualizaFestas, atualizaProdutos, atualizaUsuarios, dados } =
    useDataContext();
  if (!dados || dados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const colunas = Object.keys(dados[0]);

  const encerrar = async (id, nome, seletor, login) => {
    if (window.confirm("Tem certeza de que deseja encerrar este item?")) {
      try {
        let endpoint = "";
        let body = {};

        if (seletor === "festas") {
          endpoint = `/api/festa/${id}`;
          body = {
            id: id,
            nome: nome,
            ativa: 0,
          };
        } else if (seletor === "usuarios") {
          endpoint = `/api/usuario/${id}`;
          body = {
            id: id,
            login: login,
            nome: nome,
            ativo: 0,
          };
        } else if (seletor === "produtos") {
          endpoint = `/api/produto/${id}`;
          body = {
            id: id,
            ativo: 0,
          };
        }

        const res = await api.put(endpoint, body);
       

        if (seletor === "festas") {
          await atualizaFestas();
        } else if (seletor === "usuarios") {
          await atualizaUsuarios(props.festa);
        } else if (seletor === "produtos") {
          await atualizaProdutos(props.festa);
        }
        toast.success(res.data.mensagem, {
          position: toast.POSITION.TOP_CENTER,
        });
        return res.data;
      } catch (error) {
        toast.error(error.response.data.mensagem, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const excluir = async (id, seletor) => {
    if (window.confirm("Tem certeza de que deseja excluir este item?")) {
      // console.log(id, seletor);
      try {
        let endpoint = "";

        if (seletor === "festas") {
          endpoint = `/api/festa/${id}`;
        } else if (seletor === "usuarios") {
          endpoint = `/api/usuario/${id}`;
        } else if (seletor === "produtos") {
          endpoint = `/api/produto/${id}`;
        }
        const res = await api.delete(endpoint);
        if (seletor === "festas") {
          await atualizaFestas();
        } else if (seletor === "usuarios") {
          await atualizaUsuarios(props.festa);
        } else if (seletor === "produtos") {
          await atualizaProdutos(props.festa);
        }
        toast.success(`${res.data.mensagem}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        return res.data;
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  return (
    <Container>
      <Table className="tabela align-center">
        <thead>
          <tr>
            {/* <ToastContainer /> */}
            {colunas &&
              colunas.map((coluna, i) =>
                coluna === "administrador" ||
                coluna === "updatedAt" ||
                coluna === "createdAt" 
                ? null : (
                  <th key={i}>{coluna.toUpperCase()}</th>
                )
              )}
            <th style={{ width: "35%" }}>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {dados &&
            dados.map((dado, i) =>
              dado.nome === "festaMaster" || dado.nome === "Master User" ? null : (
                <>
                  <tr key={i} className={i % 2 === 0 ? "Par" : "Impar"}>
                    {colunas &&
                      colunas.map((coluna, i) =>
                        coluna === "administrador" ||
                        coluna === "updatedAt" ||
                        coluna === "createdAt"
                         ? null : (
                          <td key={i}>
                            {coluna === "ativa" || 
                             coluna === "ativo"
                              ? dado[coluna] === true
                                ? "Sim"
                                : "Não"
                              : dado[coluna]}
                          </td>
                        )
                      )}

                    {/* Trecho com logica dos botões */}
                    <td style={{ textAlign: "center", width: "35%" }}>
                       {(
                        props.seletor === "festas" ? (
                          <ModalFesta
                            festa={props.festa}
                            nomeBotao="Alterar"
                            dado={dado}
                            seletor={props.seletor}
                          />
                        ) : props.seletor === "usuarios" ? (
                          <ModalUsuario
                            festa={props.festa}
                            nomeBotao="Alterar"
                            dado={dado}
                            seletor={props.seletor}
                          />
                        ) : props.seletor === "produtos" ? (
                          <ModalProduto
                            festa={props.festa}
                            nomeBotao="Alterar"
                            dado={dado}
                            seletor={props.seletor}
                          />
                        ) : null
                         )} {" "}

                      {props.seletor === "festas" ? (
                        <Button variant="success">Detalhes</Button>
                      ) : null}{" "}

                      {dado.ativo === true || dado.ativa === true ? (
                        <Button
                          variant="warning"
                          onClick={() =>
                            encerrar(
                              dado.id,
                              dado.nome,
                              props.seletor,
                              dado.login
                            )
                          }
                        >
                          Encerrar
                        </Button>
                      ) : null}{" "}
                      <Button
                        variant="danger"
                        onClick={() => excluir(dado.id, props.seletor)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                </>
              )
            )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListagemTabelas;
