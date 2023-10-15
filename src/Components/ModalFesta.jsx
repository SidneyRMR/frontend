import { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalFesta = (props) => {
  const [ nome, setNome ] = useState();
  // console.log("idfesta-modalfesta", props.festa);
  
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  //   // Função que cria uma nova festa
  const novaFesta = async (nome) => {
    try {
      const res = await api.post("/api/festa", {
        nome,
        ativa: 1,
      });
      toast.success(`${res.data.mensagem}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data ;
    } catch (error) {
      toast.error(error.response.data.mensagem);
    }
  };

  const alterarFesta = async (id, nome) => {
    // console.log(id,nome)
    if (window.confirm("Tem certeza de que alterar esta festa?")) {
      // console.log(id, nome);
      try {
        const res = await api.put(`/api/festa/${id}`, {
          id: id,
          nome: nome,
          ativa: 1,
        });
        // console.log(res.data);
        toast.success(`${res.data.mensagem}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        return res.data;
      } catch (error) {
        toast.error(error.response.data.mensagem);
      }
    }
  };
  console.log('festaModalFesta',props.festa)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputNome = useRef(null);
  return (
    <>
      <ToastContainer />
      
        <Button type='button' variant="primary" onClick={handleShow}>
          {props.nomeBotao}
        </Button>

      <Modal show={show} onHide={handleClose} onEntered={() => inputNome.current.focus()}>
        <Modal.Header closeButton>
          <Modal.Title>Edição da festa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" controlId="usuarioForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome da festa"
                onChange={handleNomeChange}
                value={nome}
                ref={inputNome}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.nomeBotao === "Nova Festa" ? (
                novaFesta(nome) ) : (
                alterarFesta(props.festa, nome))
              handleClose()}
            }
          >
            Salvar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFesta;
