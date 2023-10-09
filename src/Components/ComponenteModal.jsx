import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComponenteModal = (props) => {
  //   const festas = props.festas
  const { nome, setNome } = useState();
  const { login, setLogin } = useState();
  const { senha, setSenha } = useState();
  // const {festumId, setFestumId} = useState(props.festa)
  console.log("idfesta", props.festa.id);

  // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  //   // Função que cria um usuario
  const novoUsuario = async (nome, login, senha, festaumId) => {
    try {
      const res = await api.post("/api/usuario", {
        nome,
        login,
        senha,
        festaumId,
      });
      toast.success(`${res.data} salvo com sucesso`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data;
    } catch (error) {
      toast.error(error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ToastContainer />
      
        <Button variant="primary" onClick={handleShow}>
          {props.nomeBotao}
        </Button>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" controlId="usuarioForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira seu nome"
                onChange={handleNomeChange}
                value={nome}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="passtextword"
                placeholder="Insira seu Login"
                onChange={handleLoginChange}
                value={login}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="passtextword"
                placeholder="Insira sua senha"
                onChange={handleSenhaChange}
                value={senha}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => novoUsuario(nome, login, senha)}
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

export default ComponenteModal;
