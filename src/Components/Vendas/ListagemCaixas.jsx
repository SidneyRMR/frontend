import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";
import { useVendasContext } from "../../Context/VendasContext";
// import { useEffect } from "react";

const ListagemCaixas = (props) => {
  const { caixas, carregaCaixas } = useVendasContext();

  const abrirVenda = async (id, nome, seletor, login) => {
      // logica de entrar na venda à fazer
      // try {
      //   let endpoint = "";
      //   let body = {};
      //   endpoint = `/api/caixa/${id}`;
      //   body = {
      //     aberto: 0,
      //   };
      //   const res = await api.put(endpoint, body);
      //   carregaCaixas(props.dadosUsuario.id);
      //   toast.success(res.data.mensagem, {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      //   return res.data;
      // } catch (error) {
      //   toast.error(error.response.data.mensagem, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      // }
  };
  const encerrar = async (id, nome, seletor, login) => {
    if (window.confirm("Tem certeza de que deseja encerrar este item?")) {
      try {
        let endpoint = "";
        let body = {};
        endpoint = `/api/caixa/${id}`;
        body = {
          aberto: 0,
        };
        const res = await api.put(endpoint, body);
        carregaCaixas(props.dadosUsuario.id);
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

  // const excluir = async (id, seletor) => {
  //   if (window.confirm("Tem certeza de que deseja excluir este item?")) {
  //   }
  // };

  return (
    <>
      <Table className="tabela align-center">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>DATA ABERTURA</th>
            <th>SALDO</th>
            <th>SITUAÇÃO</th>
            <th>FESTA</th>
            <th>USUÁRIO</th>

            <th style={{ width: "35%" }}>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {caixas?.map((caixa, i) => (
            <tr key={i}>
              {/* <td>{caixa.id}</td> */}
              <td>{caixa.createdAt}</td>
              <td>{caixa.saldo_dinheiro}</td>
              <td>{caixa.aberto === true ? "ABERTO" : "FECHADO"}</td>
              <td>{caixa.festaNome?.toUpperCase()}</td>
              <td>{caixa.usuarioNome?.toUpperCase()}</td>
              <td>
                {" "}
                {caixa.aberto === true ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() =>
                        abrirVenda(
                          caixa.id,
                          caixa.nome,
                          props.seletor,
                          caixa.login
                        )
                      }
                    >
                      Abrir Caixa
                    </Button>{" "}
                  </>
                ) : null}
                {" "}
                <Button
                  variant="warning"
                  // onClick={() =>
                  //   encerrar(caixa.id, caixa.nome, props.seletor, caixa.login)
                  // }
                  >
                  Detalhes
                </Button>
                {" "}
                  {caixa.aberto === true ? (
                    <>
                      <Button
                        variant="danger"
                        onClick={() =>
                          encerrar(
                            caixa.id,
                            caixa.nome,
                            props.seletor,
                            caixa.login
                          )
                        }
                      >
                        Encerrar
                      </Button>
                    </>
                  ) : null}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListagemCaixas;
