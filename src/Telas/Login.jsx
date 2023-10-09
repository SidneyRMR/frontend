import { api } from "../services/api";
import { useState } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log(
  "fazer logof do usuario quando sair-- localStorage.removeItem('token');"
);
const Login = () => {
  const VerificaUsuario = async (login, senha) => {
    // let uss = { login: 'srafael', senha: 'srafael' };
    let uss = { login: login, senha: senha };

    try {
      // Fazer a solicitação de login
      const response = await api.post("/api/usuario/login", uss);

      if (response.status === 200) {
        // Se a resposta for bem-sucedida, armazene o token no localStorage
        const { token } = response.data; // Certifique-se de que a resposta contenha o token
        localStorage.setItem("token", token);

        // Configurar o cabeçalho Authorization com o token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirecionar para a página desejada após o login (opcional)
        console.log("Logado com sucesso!");
        // history.push('/login'); // Substitua '/abertura-caixa' pela rota desejada
        return (window.location.href = "/administrativo");
      } else {
        throw new Error("Verifique sua conexão ou credenciais inválidas!");
      }
    } catch (error) {
      //   console.error(error);
      return toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePasswordChange = (event) => {
    // Hash the password before storing it in the state
    setPassword(event.target.value);
  };
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      {/* <Col md={3} className="mx-auto col-md-3 m-md-3">
        <Image src={planoFundo} alt="Background" fluid className="rounded-2" />
      </Col> */}
      <ToastContainer />
      <Col md={5}>
        <Card title="Login" className="login-card">
          <Card.Header>Sistema de Gestão</Card.Header>

          <Card.Body>
            <Form>
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
              <Button
                className="botao mb-2"
                onClick={() => VerificaUsuario(user, password)}
              >
                Fazer Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

// <Container fluid='true'>

//     <ToastContainer/>

//     <Row>
//         <Col>
//             <div className="title">Sistema de gestão de vendas</div>
//         </Col>
//     </Row>
//     <br />
//     <Row>
//         <Col>
//             <div>Insira seu login:</div>
//         </Col>
//     </Row>
//     <Row>
//         <Col>
//         <input className="user" type="text" placeholder="Login" onChange={handleUserChange} />
//         </Col>
//     </Row>
//     <br />
//     <Row>
//         <Col>
//             <div>Insira sua senha:</div>
//         </Col>
//     </Row>
//     <Row>
//         <Col>
//             <input className="password" id="password" type="password" placeholder="Senha" onChange={handlePasswordChange} />
//         </Col>
//     </Row>
//     <br />
//     <Row>
//         <Col >
//             <Button className='botao' onClick={() => VerificaUsuario(user, password)}
//                 >Fazer Login
//             </Button>
//         </Col>
//     </Row>
// </Container>
//     )
// }
export default Login;
