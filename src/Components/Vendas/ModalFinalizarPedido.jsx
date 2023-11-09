import { useState, useRef } from "react";
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVendasContext } from "../../Context/VendasContext";

const ModalFinalizarPedido = ({ handleRemoveAllFromCart, totalPedido }) => {
  const { carregaCaixas, carregaVendas, caixa } = useVendasContext();
  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  const [show, setShow] = useState(false);

  const handleClose = () =>
    setShow(false) &
    setValorDinheiro(0) &
    setValorCredito(0) &
    setValorDebito(0) &
    setValorPix(0);
  const handleShow = () =>
    setShow(true) &
    setValorDinheiro(0) &
    setValorCredito(0) &
    setValorDebito(0) &
    setValorPix(0);
  const inputDinheiro = useRef(0);
  // const inputCredito = useRef(null);
  // const inputDebito = useRef(null);
  // const inputPix = useRef(null);

  const [valorDinheiro, setValorDinheiro] = useState(0);
  const [valorCredito, setValorCredito] = useState(0);
  const [valorDebito, setValorDebito] = useState(0);
  const [valorPix, setValorPix] = useState(0);

  // console.log(caixa.id)
  const handleDinheiroChange = (event) => {
    setValorDinheiro(event.target.value);
    // console.log(event.target.value);
  };
  const handleCreditoChange = (event) => {
    setValorCredito(event.target.value);
  };
  const handleDebitoChange = (event) => {
    setValorDebito(event.target.value);
  };
  const handlePixChange = (event) => {
    setValorPix(event.target.value);
  };
  console.log("caixa", caixa);
  console.log("usuario", dadosUsuario);
  // Função que cria uma nova festa
  const salvarVenda = async (
    valorDinheiro,
    valorCredito,
    valorDebito,
    valorPix
  ) => {
    // Convertendo valores nulos ou undefined para 0
    valorDinheiro = valorDinheiro || 0;
    valorCredito = valorCredito || 0;
    valorDebito = valorDebito || 0;
    valorPix = valorPix || 0;

    if (
      valorDinheiro > 0 ||
      valorCredito > 0 ||
      valorDebito > 0 ||
      valorPix > 0
    ) {
      try {
        // Adicionando verificação para festaId
        if (dadosUsuario.festa === undefined) {
          throw new Error("festaId is undefined");
        }

        const res = await api.post(`/api/venda`, {
          dinheiro: valorDinheiro,
          credito: valorCredito,
          debito: valorDebito,
          pix: valorPix,
          caixaId: caixa.id,
          usuarioId: dadosUsuario.id,
          festaId: dadosUsuario.festa,
        });

        // console.log(dadosUsuario.festa);
        toast.success(`${res.data.mensagem}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        // carregaCaixas(dadosUsuario.id);
        carregaVendas(dadosUsuario.id);
        console.log(res);
        handleRemoveAllFromCart();
        return res.data;
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.warning("Somente valores positivos.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div type="button" variant="primary" onClick={handleShow}>
        Finalizar Pedido
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => inputDinheiro.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Escolha a forma de pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Dinheiro"
            className="mb-6 m-2"
            onChange={handleDinheiroChange}
            value={valorDinheiro ? valorDinheiro : null}
            ref={inputDinheiro}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Credito"
            className="mb-6 m-2"
            onChange={handleCreditoChange}
            value={valorCredito ? valorCredito : null}
            // ref={inputCredito}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Debito"
            className="mb-6 m-2"
            onChange={handleDebitoChange}
            value={valorDebito ? valorDebito : null}
            // ref={inputDebito}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Pix"
            className="mb-6 m-2"
            onChange={handlePixChange}
            value={valorPix ? valorPix : null}
            // ref={inputPix}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <div>
            <div>Valor total do pedido: R$ {totalPedido.toFixed(2)}</div>
            <div>
              Valor total pago: R${" "}
              {(Number(valorDinheiro) +
                Number(valorCredito) +
                Number(valorDebito) +
                Number(valorPix)
                ).toFixed(2)}
            </div>
            <div>
              Troco: R${" "}
              {(
                Number(valorDinheiro) +
                Number(valorCredito) +
                Number(valorDebito) +
                Number(valorPix) -
                Number(totalPedido)
              ).toFixed(2)}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              valorDinheiro > 0 ||
              valorCredito > 0 ||
              valorDebito > 0 ||
              valorPix > 0
                ? false
                : true
            }
            variant="primary"
            onClick={() => {
              salvarVenda(valorDinheiro, valorCredito, valorDebito, valorPix) &&
                handleClose();
            }}
          >
            Efetuar o Pagamento
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFinalizarPedido;
