// Importações do bootstrap
import Nav from "react-bootstrap/Nav";
import { Navbar, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ComponenteCaixa from "../Components/Vendas/ComponenteCaixa";
import ComponenteVendas from "../Components/Vendas/ComponenteVendas";
import ComponenteRelatorios from "../Components/Vendas/ComponenteRelatorios";
import { useVendasContext } from "../Context/VendasContext";

function Vendas() {
  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);

  const { carregaCaixas } = useVendasContext();

  useEffect(() => {
    console.log(dadosUsuario);
    dadosUsuario && carregaCaixas(dadosUsuario.id); // Chama carregaCaixas ao montar o componente
  }, [dadosUsuario, carregaCaixas]);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        // collapseOnSelect
      >
        <ToastContainer />
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Brand href="/vendas">Gestao de Caixas</Navbar.Brand>
          <Nav id="navbarScroll">
            <Nav.Item title="Usuário Logado">
              <Navbar.Text id="usuario-logado">
                Usuário Logado:{" "}
                <b>
                  {dadosUsuario.nome ? dadosUsuario.nome.toUpperCase() : ""}
                </b>
              </Navbar.Text>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link
                id="hovered-link"
                onClick={() => {
                  if (window.confirm("Tem certeza de que deseja sair?")) {
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("token");
                    localStorage.removeItem("expiresIn");
                    window.location.href = "/login";
                  }
                }}
              >
                Encerrar Sessão
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <div className="bg-body-tertiary" data-bs-theme="dark">
        <ComponenteCaixa dadosUsuario={dadosUsuario} />
      </div>
    </>
  );
}

export default Vendas;
