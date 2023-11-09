import { Button, Card, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ModalFinalizarPedido from "./ModalFinalizarPedido";
import { useEffect, useState } from "react";

function ResumoPedido({
  selectedItems,
  handleRemoveFromCart,
  handleModalClose,
  handleRemoveAllFromCart
}) {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  const [totalPedido, setTotalPedido] = useState(0);

  const calcularTotalPedido = () => {
    const total = selectedItems.reduce((acc, item) => acc + parseFloat(item.precoTotal), 0);
    setTotalPedido(total);
  };
  useEffect(() => {
    calcularTotalPedido();
  }, [calcularTotalPedido]);
  return (
    <>
      <Card>
        <Card.Header className="p-3 ">Resumo do pedido</Card.Header>
        <Table striped bordered hover style={{ width: "100%", margin: "1px" }}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>{isMobile() ? "Unidade" : "V. Unitário"}</th>
              <th>{isMobile() ? "Qtd" : "Quantidade"}</th>
              <th>{isMobile() ? "Total" : "V. Total"}</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems &&
              selectedItems?.map((item, i) => (
                <tr key={i}>
                  <td>{item.nome}</td>
                  {/* {console.log(typeof item.preco)} */}
                  <td>
                    {typeof item.preco === "string"
                      ? `R$ ${parseFloat(item.preco).toFixed(2)}`
                      : `R$ ${parseFloat(item.preco).toFixed(2)}`}
                  </td>
                  <td>{item.quantidade}</td>
                  <td>
                    {typeof item.precoTotal === "string"
                      ? `R$ ${parseFloat(item.precoTotal).toFixed(2)}`
                      : `R$ ${parseFloat(item.precoTotal).toFixed(2)}`}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Card.Body>
          Valor Total do Pedido: R${" "}
          {totalPedido.toFixed(2)}
        </Card.Body>
        <div className={isMobile() ? 'd-flex justify-content-end' :"d-grid gap-2"}>
          <Button
            // onClick={handleModalClose}
            className="m-1"
            disabled={selectedItems?.length === 0 ? true : false}
            variant="success"
          >
            <ModalFinalizarPedido handleRemoveAllFromCart={handleRemoveAllFromCart} totalPedido={totalPedido}/>
          </Button>
          {isMobile() ? 
          <Button
            onClick={handleModalClose}
            className="m-1"
            variant="secondary"
          >
            Sair
          </Button> : null}
        </div>
      </Card>
    </>
  );
}

export default ResumoPedido;
