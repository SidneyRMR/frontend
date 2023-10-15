// Importações do bootstrap
import Nav from "react-bootstrap/Nav";
import { Navbar, FloatingLabel, Form, Container } from "react-bootstrap";
import { api } from "../services/api";
import { useState, useEffect } from "react";
import ComponenteAdministrativo from "../Components/ComponenteAdministrativo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

function Administrativo() {
  const [dados, setDados] = useState([]);
  const [festas, setFestas] = useState([]);
  const [festa, setFesta] = useState();
  const [selectedItem, setSelectedItem] = useState("festas");

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedItem === "festas") {
          let res = await api.get(`/api/festa`);
          res = await res.data.festa;
          // console.log("FESTA: ", res);
          setDados(res);
          setFestas(res);
        } else if (selectedItem === "vendas") {
          let res = await api.get(`/api/venda`);
          res = await res.data.venda;
          // console.log("VENDAS: ", res);
          setDados(res);
        } else if (selectedItem === "usuarios") {
          let res = await api.get(`/api/usuario`);
          res = await res.data.usuario;
          // console.log("USUARIOS: ", res);
          setDados(res);
        } else if (selectedItem === "produtos") {
          let res = await api.get(`/api/produto`);
          res = await res.data.produto;
          // console.log("PRODUTOS: ", res);
          setDados(res);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.mensagem);
      }
    }
    fetchData();
  }, [selectedItem]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // console.log(item);
  };
  const handleFestaChange = (e) => {
    const selectedFesta = e.target.value;
    if (selectedFesta === 'Escolha uma festa') {
      window.location.href = "/administrativo";
    } else {
    setFesta(selectedFesta);
    }
}
  return (
    <Container
      className="bg-body-tertiary"
      data-bs-theme="dark"
    >
      <ToastContainer />
      <Navbar collapseOnSelect  className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/administrativo">Gestão de Vendas</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-2"
              style={{ maxHeight: "100px" }}
              navbarScroll
              variant="tabs"
            >
              <Nav.Item>
                <Nav.Link onClick={() => handleItemClick("festas")}>
                  Festas
                </Nav.Link>
              </Nav.Item>
              {/* <span className="me-auto my-2 my-lg-2 divisa">|</span> */}

              <Nav.Item>
                <Nav.Link
                  disabled={festa === 'Escolha uma festa' || festa === undefined }
                  onClick={() => handleItemClick("usuarios")}
                >
                  Usuários
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={festa === 'Escolha uma festa' || festa === undefined}
                  onClick={() => handleItemClick("produtos")}
                >
                  Produtos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={festa === 'Escolha uma festa' || festa === undefined}
                  onClick={() => handleItemClick("vendas")}
                >
                  Vendas
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  Sair
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <FloatingLabel controlId="floatingSelect" label="Escolha qual festa gerir" >
            <Form.Select onChange={handleFestaChange}
              value={festa}
            >
              <option value={null}>Escolha uma festa</option>
              {festas &&
                festas.map((festa, i) => ( 
                  festa.nome === 'master' || festa.ativa === false? null :
                  <option key={i} value={festa.id}>
                    {festa.nome.toUpperCase()}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>
        </Container>
      </Navbar>

      <ComponenteAdministrativo
        seletor={selectedItem}
        festas={festas}
        dados={dados}
        festa={festa}
      />
    </Container>
  );
}

export default Administrativo;
