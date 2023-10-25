// Importações do bootstrap
import Nav from "react-bootstrap/Nav";
import { Navbar, FloatingLabel, Form, Container } from "react-bootstrap";
import { useState } from "react";
import ComponenteAdministrativo from "../Components/Administrativo/ComponenteAdministrativo";
import { ToastContainer } from "react-toastify";
import { useDataContext } from "../Context/DataContext";

function Administrativo() {
  const { festas } = useDataContext();
  const [festa, setFesta] = useState();
  const [selectedItem, setSelectedItem] = useState("festas");
  const [activeItem, setActiveItem] = useState(null);

  const handleFestaChange = (e) => {
    const selectedFesta = e.target.value;
    if (selectedFesta === "Escolha uma festa" || selectedFesta === null) {
      handleItemClick("festas");
    } else {
      setFesta(selectedFesta);
      handleItemClick("festas");
      console.log(selectedFesta);
    }
  };
  const handleItemClick = (item) => {
    console.log("Item selecionado", selectedItem);
    setSelectedItem(item);
    setActiveItem(item);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        collapseOnSelect
      >
        <ToastContainer />
        <Container className="bg-body-tertiary" data-bs-theme="dark">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Brand href="/administrativo">Gestão de Vendas</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              // className="me-auto my-2 my-lg-2"
              // style={{ maxHeight: "100px" }}
              navbarScroll
              variant="tabs"
            >
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleItemClick("festas")}
                  id={activeItem === "festas" ? "active" : ""}
                  className={activeItem === "festas" ? "active" : ""}
                >
                  Festas
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={
                    festa === "Escolha uma festa" || festa === undefined
                  }
                  onClick={() => handleItemClick("usuarios")}
                  id={activeItem === "usuarios" ? "active" : ""}
                  className={activeItem === "usuarios" ? "active" : ""}
                >
                  Usuários
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={
                    festa === "Escolha uma festa" || festa === undefined
                  }
                  onClick={() => handleItemClick("produtos")}
                  id={activeItem === "produtos" ? "active" : ""}
                  className={activeItem === "produtos" ? "active" : ""}
                >
                  Produtos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={
                    festa === "Escolha uma festa" || festa === undefined
                  }
                  onClick={() => handleItemClick("vendas")}
                  id={activeItem === "vendas" ? "active" : ""}
                  className={activeItem === "vendas" ? "active" : ""}
                >
                  Vendas
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Item>
              <Nav.Link
                id="hovered-link"
                onClick={() => {
                  localStorage.removeItem("usuario");
                  localStorage.removeItem("token");
                  localStorage.removeItem("expiresIn");
                  window.location.href = "/login";
                }}
              >
                Encerrar Sessão
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <FloatingLabel
            controlId="floatingSelect"
            label="Escolha qual festa gerir"
          >
            <Form.Select onChange={handleFestaChange} value={festa}>
              <option value={null}>Escolha uma festa</option>
              {festas &&
                festas.map((festa, i) =>
                  festa.nome === "festaMaster" || // festaMaster é festa padrao que o usuario master precisa pra ser criado
                  festa.ativa === false ? null : (
                    <option key={i} value={festa.id}>
                      {festa.nome.toUpperCase()}
                    </option>
                  )
                )}
            </Form.Select>
          </FloatingLabel>
        </Container>
      </Navbar>
      <div className="bg-body-tertiary" data-bs-theme="dark">
        <ComponenteAdministrativo seletor={selectedItem} festa={festa} />
      </div>
    </>
  );
}

export default Administrativo;
