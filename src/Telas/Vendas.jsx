// Importações do bootstrap
import Nav from "react-bootstrap/Nav";
import { Navbar, Container, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ComponenteVendas from "../Components/Vendas/ComponenteVendas";
import { useVendasContext } from "../Context/VendasContext";
import ListagemCaixas from "../Components/Vendas/ListagemCaixas";
import ModalNovoCaixa from "../Components/Vendas/ModalNovoCaixa";
import ModalSangria from "../Components/Vendas/ModalSangria";
import ModalHistoricoVendas from "../Components/Vendas/ModalHistoricoVendas";

function Vendas() {
  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  const { carregaCaixas, caixas, carregaCaixa} = useVendasContext();
  const [selectedItem, setSelectedItem] = useState("festas");
  const caixasAbertos = caixas?.filter((caixa) => caixa.aberto);
  const caixaSaldo = caixasAbertos[0]?.saldo_dinheiro
  const caixaId = caixasAbertos[0]?.id
  const caixaAtual = caixasAbertos[0]
  
  // console.log('caixaAtual',caixaAtual)
  // console.log('saldo',caixaSaldo)
  // console.log('id',caixaId)

useEffect(() => {

  carregaCaixas(dadosUsuario.id);
},[])

  const funcCarregaCaixas = () => {
    // console.log(dadosUsuario);
    if (dadosUsuario) {
      carregaCaixa(caixaAtual);
    } 
  }

  const handleItemClick = (item) => {
    // console.log("Item selecionado", selectedItem);
    setSelectedItem(item);
  };
  return (
    <>
<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
  <Card className="d-flex w-100 m-2">
    <Card.Title className="p-1" id="titulo">
      Gestao de Caixas
    </Card.Title>
    <Card.Body className="p-0 m-0">
      <div>Saldo: {caixaSaldo}</div>
      <div id="p-0 m-0" >
        <span className="">

        Usuário:{" "}
        <b>
          {dadosUsuario.nome ? dadosUsuario.nome.toUpperCase() : ""}
        </b>
        </span>
        {" | "}
        <span>
        Festa:{" "}
        <b>
          {dadosUsuario.festa ? dadosUsuario.festa : ""}
        </b>
        </span>
        <Navbar.Toggle className="m-2" aria-controls="responsive-navbar-nav"  />
      

    <Container className="" >
    <Navbar.Collapse className="justify-content-center align-items-center" id="responsive-navbar-nav">

      <Nav className="mr-auto">
        <Nav.Link>
          <ModalHistoricoVendas/>
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link>
          <ModalSangria caixaId={caixaId} caixaSaldo={caixaSaldo}/>
        </Nav.Link>
      </Nav>
      <Nav  >
        {caixasAbertos.length > 0 ? (
          caixasAbertos.map((caixa, i) =>
            selectedItem === "AbrirCaixa" ? (
              <Nav.Link
                title="Sair deste Caixa"
                id="hovered-yellow"
                onClick={() => handleItemClick("FecharCaixa")}
                key={i}
              >
                Fechar Caixa
              </Nav.Link>
            ) : (
              <Nav.Link
                title="Abrir Caixa Existente"
                id="hovered-yellow"
                onClick={() => handleItemClick("AbrirCaixa")}
                key={i}
              >
                Abrir caixa
              </Nav.Link>
            )
          )
        ) : (
          <ModalNovoCaixa nomeBotao="Novo Caixa" />
        )}
      </Nav>
      <Nav>
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
      </Nav>
    </Navbar.Collapse>
    </Container>
    </div>
    </Card.Body>
  </Card>
</Navbar>

      {/* <div className="p-3 sub-titulo">CAIXAS</div> */}
      <div className="bg-body-tertiary d-flex" data-bs-theme="dark">
        {selectedItem === "AbrirCaixa" ? (
          <ComponenteVendas
            dadosUsuario={dadosUsuario}
            selectedItem={selectedItem}
            caixaAtual={caixaAtual}
          />
        ) : (
          <ListagemCaixas onClick={() => funcCarregaCaixas()} dadosUsuario={dadosUsuario} selectedItem={selectedItem} />
        )}
      </div>
    </>
  );
}

export default Vendas;
