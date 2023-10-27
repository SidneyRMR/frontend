import  api  from "../services/api";
import { useState } from "react";
import { Container, Col, Button, Form, Card  } from "react-bootstrap";
import axios from "axios";
import ModalQrCode from "./ModalQrCode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  function IsMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const VerificaUsuario = async (login, senha) => {
    // let uss = { login: 'srafael', senha: 'srafael' };
    let uss = { login: login, senha: senha };

    try {
      // Fazer a solicitação de login
      const response = await api.post("/api/usuario/login", uss);
      if (response.status === 200) {
        const {
          token,
          expiresIn,
          isAdmin,
          usuarioNome,
          usuarioId,
          usuarioFesta,
        } = response.data; // Certifique-se de que a resposta contenha o token e se o usuário é administrador
        localStorage.setItem("token", token);
        localStorage.setItem("expiresIn", expiresIn);
        const dadosUsuario = {
          nome: usuarioNome,
          id: usuarioId,
          festa: usuarioFesta,
        };
        // console.log(dadosUsuario);
        sessionStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (isAdmin) {
          window.location.href = "/administrativo";
        } else {
          window.location.href = "/vendas";
          // console.log('não é admin - entrar na tela de vendas',isAdmin);
        }
      } else {
        throw new Error("Verifique sua conexão ou credenciais inválidas!");
      }
    } catch (error) {
      return toast.error(error.response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  // const [apiUrl, setApiUrl] = useState('');
  // const GeraQrCode = async () => {
  //     try {
  //       const res = await api.get('/api/getIpAddress');
  //       const ipAddress = res.data.ipAddress;
  //       const url = `${ipAddress}:3000/login`;
  //     setApiUrl(url);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     console.log(`${apiUrl.ipAddress}/login`);
  //   };
  

  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Para evitar o envio de formulário, se aplicável
      VerificaUsuario(user, password);
    }
  };
  return (
    <Container
      className="vh-100 d-flex align-items-center justify-content-center"
      data-bs-theme="dark"
    >
      <ToastContainer />
      <Col md={5}>
        <Card title="Login" className="login-card">
          <Card.Header>Sistema de Gestão</Card.Header>

          <Card.Body >
            <Form onKeyDown={handleKeyPress}>
              <Form.Group className="mb-6" controlId="loginForm.ControlInput1">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira seu login"
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="loginForm.ControlTextarea1"
              >
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Insira sua senha"
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Form.Group>
                <Button
                    // onKeyDown ={handleKeyPress}
                    className="botao mb-2"
                    onClick={() => VerificaUsuario(user, password)}
                  >
                    Fazer Login
                </Button>
                {!IsMobile() ? 
                <ModalQrCode/>
                :
                null
                }
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};
export default Login;
