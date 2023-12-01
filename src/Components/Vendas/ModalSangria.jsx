import { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVendasContext } from "../../Context/VendasContext";

const ModalSangria = ({caixaId, caixaSaldo}) => {
  const [valorSangria, setValorSangria] = useState("");
  const [show, setShow] = useState(false);
  const { carregaCaixas } = useVendasContext();

  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  // console.log(dadosUsuario);
  const handleSangriaChange = (event) => {
    setValorSangria(event.target.value);
  };

  // Função que cria uma nova festa
  const fazerSangria = async (valorSangria) => {
    const saldo = caixaSaldo - valorSangria;
    
    if (saldo > 0) {
      try {
        const res = await api.put(`/api/caixa/${caixaId}`, {
          id: caixaId,
          saldo_dinheiro: saldo,
        });
        toast.success(`${res.data.mensagem}. Retirada de R$ ${valorSangria} efetuada com sucesso.`, {
          position: toast.POSITION.TOP_LEFT,
        });
        carregaCaixas(dadosUsuario.id);
        return res.data;
      } catch (error) {
        toast.error(error.response.data.mensagem, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      toast.warning('Digite um valor menor que o saldo em caixa.');
    }
  };
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputSangria = useRef(null);
  return (
    <>
      <ToastContainer />

      <div type="button" variant="primary" onClick={handleShow}>
        Retirada
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => inputSangria.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Retirada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" id="usuarioForm.ControlInput1">
              <Form.Label>Digite o valor da Sangria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o valor da retirada"
                onChange={handleSangriaChange}
                value={valorSangria ? valorSangria : ''}
                ref={inputSangria}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              fazerSangria(valorSangria) && handleClose();
            }}
          >
            Fazer Retirada
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSangria;
