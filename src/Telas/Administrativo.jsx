// Importações do bootstrap
import Nav from "react-bootstrap/Nav";
import { Navbar, FloatingLabel, Form, Container } from "react-bootstrap";
import { useState, } from "react";
import ComponenteAdministrativo from "../Components/ComponenteAdministrativo";
import { ToastContainer } from "react-toastify";
import { useDataContext } from "../Context/DataContext";

function Administrativo() {
  const { festas, atualizaFestas, atualizaUsuarios, atualizaProdutos } = useDataContext();
  const [festa, setFesta] = useState();
  const [selectedItem, setSelectedItem] = useState("festas");

  const handleFestaChange = (e) => {
    const selectedFesta = e.target.value;
    if (selectedFesta === 'Escolha uma festa' || selectedFesta === null) {
      handleItemClick("festas")
      // atualizaFestas()
    } else {
      setFesta(selectedFesta);
      console.log("Id da festa selecionada",selectedFesta);
    }
  }
  const handleItemClick = (item) => {
    // if (item === 'festas') {
    //   return atualizaFestas(); 
    // } else if (item === 'usuarios') {
    //   return atualizaUsuarios()
    // }
    // console.log('Item selecionado = ',item)
    setSelectedItem(item);
  };

  return (
    <Container
      className="bg-body-tertiary"
      data-bs-theme="dark"
    ><ToastContainer/>
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
                  festa.nome === 'festaMaster' || festa.ativa === false ? null :
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
        festa={festa}
      />
    </Container>
  );
}

export default Administrativo;
