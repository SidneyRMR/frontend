import { useState, useRef, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDataContext } from "../../Context/DataContext";
const ModalUsuario = (props) => {
  const { atualizaUsuarios } = useDataContext();
  const [show, setShow] = useState(false);

  const [nome, setNome] = useState(props.dado && props.dado.nome ? props.dado.nome :  '');
  const [login, setLogin] = useState(props.dado && props.dado.login ? props.dado.login :  '');
  const [senha, setSenha] = useState();
  
  useEffect(() => {
    // Este código será executado toda vez que 'show' for alterado
    if (props.dado && props.dado.nome) {
      setNome(props.dado.nome);
      setLogin(props.dado.login);
    } else {
      setNome('');
      setLogin('');
    }
  }, [show, props.dado]);

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
        festaId: props.festa,
      });
      atualizaUsuarios(props.festa)
      toast.success(`${res.data.mensagem} `, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data;
    } catch (error) {
      toast.error(error.response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER,
      });
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
        atualizaUsuarios(props.festa)
        // console.log(res.data);
        toast.success(`${res.data.mensagem}`, {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Form.Group className="mb-6" >
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
                : alterarUsuario(props.dado.id, nome, login);
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
