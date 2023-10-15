import { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalUsuario = (props) => {
  const [nome, setNome] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();
  // console.log("idFesta-ModalUsuario", props.festa);
  // console.log("idUsuario-ModalUsuario", props.dado);

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
  const novoUsuario = async (nome, login, senha) => {
    try {
      const res = await api.post("/api/usuario", {
        nome,
        login,
        senha,
        festumId: props.festa,
      });
      toast.success(`${res.data.mensagem} `, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data;
    } catch (error) {
      toast.error(error.response.data.mensagem);
    }
  };

  const alterarUsuario = async (id, nome) => {
    if (window.confirm("Tem certeza de que alterar este usuário?")) {
      // console.log(id, nome);
      try {
        const res = await api.put(`/api/usuario/${id}`, {
          id,
          nome,
          login,
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("festaModalUsuario", props.festa);

  const inputNome = useRef(null);
  return (
    <>
      <ToastContainer />

      <Button type="button" variant="primary" onClick={handleShow}>
        {props.nomeBotao}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => inputNome.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edição de usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" controlId="usuarioForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome"
                onChange={handleNomeChange}
                value={nome}
                ref={inputNome}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira seu Login"
                onChange={handleLoginChange}
                value={login}
              />
            </Form.Group>
            {props.seletor === "usuarios" ? null : (
              <Form.Group
                className="mb-3"
                controlId="usuarioForm.ControlTextarea1"
              >
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Insira sua senha"
                  onChange={handleSenhaChange}
                  value={senha}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.nomeBotao === "Novo Usuário"
                ? novoUsuario(nome, login, senha)
                : alterarUsuario(props.dado, nome, login);
              handleClose();
            }}
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
///////////////////////

export default ModalUsuario;
