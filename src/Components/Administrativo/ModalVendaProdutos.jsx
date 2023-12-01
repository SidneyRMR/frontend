import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDataContext } from "../../Context/DataContext";
import { FaElementor } from "react-icons/fa";

const ModalVendaProdutos = ({usuarioId}) => {
  const { vendaProdutosUsuario, atualizaVendasProdutosUsuario } = useDataContext();
  const [show, setShow] = useState(false);

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  useEffect(() => {

    atualizaVendasProdutosUsuario(usuarioId)
    
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        {isMobile() ? <FaElementor/> : 'Detalhes'}
      </Button>

      <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
          <Modal.Title>Histórico de Vendas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="tabela align-center">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>
                  NOME 
                </th>
                <th>
                  MEDIDA
                </th>
                <th>QUANTIDADE</th>
                <th>ID VENDA</th>
              </tr>
            </thead>

            <tbody>
              {vendaProdutosUsuario?.map((venda, i) => (
                <tr key={i}>
                  {/* <td>{venda.id}</td> */}
                  <td>
                    R$ {venda?.nome}
                  </td>
                  <td>
                    R$ {venda?.medida}
                  </td>
                  <td>
                    {venda?.preco}
                  </td>
                  <td>
                    {venda?.qtde_venda_produtos}
                  </td>
                  <td>
                    {venda?.vendaId}
                  </td>
                  <td  className="d-flex">
                    <Button
                      size="sm"
                      variant="success"
                      // onClick={() => verProdutos(venda.id)}
                    >
                      {isMobile() ? <FaElementor /> : "Imprimir Relatório"}
                    </Button >{" "}
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

export default ModalVendaProdutos;
