import { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVendasContext } from "../../Context/VendasContext";

const ModalNovoCaixa = (props) => {
  const [saldoDinheiro, setSaldoDinheiro] = useState(null);
  const [show, setShow] = useState(false);
  const { carregaCaixas } = useVendasContext();

  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  // console.log(dadosUsuario);
  const handleSaldoDinheiroChange = (event) => {
    setSaldoDinheiro(event.target.value);
  };

  // Função que cria uma nova festa
  const novoCaixa = async (saldoDinheiro) => {
    try {
      const res = await api.post("/api/caixa", {
        saldo_dinheiro: saldoDinheiro,
        aberto: 1,
        festaId: dadosUsuario.festa,
        usuarioId: dadosUsuario.id,
      });
      toast.success(`${res.data.mensagem}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      carregaCaixas(dadosUsuario.id);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputSaldoDinheiro = useRef(null);
  return (
    <>
      <ToastContainer />

      <Button type="button" variant="primary" onClick={handleShow}>
        {props.nomeBotao}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => inputSaldoDinheiro.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo Caixa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" id="usuarioForm.ControlInput1">
              <Form.Label>Digite o Saldo Inicial</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o caixa inicial"
                onChange={handleSaldoDinheiroChange}
                value={saldoDinheiro}
                ref={inputSaldoDinheiro}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              novoCaixa(saldoDinheiro) && handleClose();
            }}
          >
            Abrir Caixa
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNovoCaixa;
