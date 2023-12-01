import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
// import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVendasContext } from "../../Context/VendasContext";
import { FaElementor } from "react-icons/fa";

const ModalHistoricoVendas = ({ caixaId, caixaSaldo }) => {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  const [show, setShow] = useState(false);
  const { carregaVendasUsuario, vendasUsuario } = useVendasContext();

  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  // console.log(dadosUsuario);
  // const [vendas, setVendas] = useState([]);
  console.log(vendasUsuario);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // const carregarDados = async () => {
    //   try {
        carregaVendasUsuario(dadosUsuario.id);
        // console.log(vendasUsuario)
        // setVendas(dados);
      // } catch (error) {
        // console.error("Erro ao carregar vendas:", error);
      // }
    // };
    // carregarDados();
  }, [  ]);

  const reimprimirPedido = (idVenda) => {
    console.log("reimprimir fichas", idVenda);
    // criar um get no VendasContext para buscar as vendas_produtos da venda selecionada e reimprimir
  };
  const verProdutos = (idVenda) => {
    console.log("verProdutos", idVenda);
    // criar um get no VendasContext para buscar as vendas_produtos da venda selecionada e mostrar num modal
  };
  return (
    <>
      <ToastContainer />

      <Button variant="nome" onClick={handleShow}>
        Histórico Vendas
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Histórico de Vendas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="tabela align-center">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>
                  DINHEIRO <br />
                  PIX
                </th>
                <th>
                  CREDITO
                  <br />
                  DÉBITO
                </th>
                <th>USUÁRIO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              {vendasUsuario?.map((venda, i) => (
                <tr key={i}>
                  {/* <td>{venda.id}</td> */}
                  <td>
                    R$ {venda.dinheiro}
                    <br />
                    R$ {venda.pix}
                  </td>
                  <td>
                    R$ {venda.credito}
                    <br />
                    R$ {venda.debito}
                  </td>
                  <td>
                    {venda.usuarioNome ? venda.usuarioNome : venda.usuarioId}
                  </td>
                  <td  className="d-flex">
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => verProdutos(venda.id)}
                    >
                      {isMobile() ? <FaElementor /> : "Ver produtos"}
                    </Button >{" "}
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => reimprimirPedido(venda.id)}
                      >
                        {isMobile() ? <FaElementor /> : "Reimprimir"}
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHistoricoVendas;
