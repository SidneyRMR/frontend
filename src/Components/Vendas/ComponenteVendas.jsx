import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, Nav, Modal } from "react-bootstrap";
import { useVendasContext } from "../../Context/VendasContext";
import ResumoPedido from "../Vendas/ResumoPedido";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function ComponenteVendas({ dadosUsuario, caixaAtual }) {
  const { carregaProdutos, produtos } = useVendasContext();
  const produtosAtivos = produtos?.filter((produto) => produto.ativo === true);
  const [tipoSelecionado, setTipoSelecionado] = useState("comida");
  const [precoPeso, setPrecoPeso] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalPedido, setShowModalPedido] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [existingItemChanged, setExistingItemChanged] = useState(false);

  useEffect(() => {
    // Carrega os produtos quando o componente for montado
    dadosUsuario && carregaProdutos(dadosUsuario.festa);
  }, [existingItemChanged]);

  const produtosExibidos = () => {
    if (tipoSelecionado === "comida") {
      return produtosAtivos?.filter(
        (produto) => produto.tipo === "comida" && produto.medida === "unidade"
      );
    } else if (tipoSelecionado === "bebida") {
      return produtosAtivos?.filter(
        (produto) => produto.tipo === "bebida" && produto.medida === "unidade"
      );
    } else if (tipoSelecionado === "quilograma") {
      return produtosAtivos?.filter(
        (produto) => produto.medida === "quilograma"
      );
    }
    // return produtosAtivos; // Exibe todos os produtos por padrão
  };

  const handlePrecoPesoChange = (event) => {
    setPrecoPeso(event.target.value);
  };
  useEffect(() => {
    // Carrega os produtos quando o componente for montado
    dadosUsuario && carregaProdutos(dadosUsuario.festa);
  }, [selectedItems]);

  const handleAddToCart = (produto) => {
    setExistingItemChanged(!existingItemChanged);
    if (produto.medida === "quilograma") {
      // Show the modal for entering the weight
      setSelectedProduct(produto);
      setShowModal(true);
    } else {
      const existingItem = selectedItems.find(
        (item) => item.nome === produto.nome
      );
      if (existingItem) {
        // Increment the quantity
        existingItem.quantidade += 1;
        existingItem.precoTotal = existingItem.preco * existingItem.quantidade;
      } else {
        // Add the selected product to the cart
        setSelectedItems([
          ...selectedItems,
          {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            medida: produto.medida,
            quantidade: 1,
            precoTotal: produto.preco,
          },
        ]);
      }
      // Clear the input field
      setPrecoPeso("");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowModalPedido(false);
  };

  const handleModalAdd = () => {
    if (precoPeso !== "") {
      // Add the selected product with the weight to the cart
      setSelectedItems([
        ...selectedItems,
        {
          id: selectedProduct.id,
          nome: selectedProduct.nome,
          preco: selectedProduct.preco,
          medida: selectedProduct.medida,
          quantidade: parseFloat(precoPeso),
          precoTotal: parseFloat(precoPeso) * selectedProduct.preco,
        },
      ]);
      // Clear the input field
      setPrecoPeso("");
      setShowModal(false);
    }
  };

  const handleRemoveAllFromCart = () => {
    setSelectedItems([]);
  };

  const handleRemoveFromCart = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.nome === item.nome) {
        if (selectedItem.quantidade > 1) {
          selectedItem.quantidade -= 1;
          selectedItem.precoTotal =
            selectedItem.preco * selectedItem.quantidade;
        } else {
          return null; // Remove the item if quantity is 1 or less
        }
      }
      return selectedItem;
    });
    setSelectedItems(updatedItems.filter((item) => item !== null));
  };
  const inputPrecoPeso = useRef(null);

  return (
    <Container className="bg-body-tertiary">
      {isMobile() ? (
        <>
          <Card>
            Total de itens:{" "}
            {selectedItems.reduce(
              (acc, item) => acc + parseFloat(item.quantidade),
              0
            )}
          </Card>
          <Card>
            Valor Total R${" "}
            {selectedItems
              .reduce((acc, item) => acc + parseFloat(item.precoTotal), 0)
              .toFixed(2)}
          </Card>
        </>
      ) : null}
      <div className="row">
        <div className="col-md-7">
          <Card>
            <Card.Header>
              <Nav fill variant="tabs" defaultActiveKey="#comida">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setTipoSelecionado("comida")}
                    href="#comida"
                  >
                    Comidas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setTipoSelecionado("quilograma")}
                    href="#quilograma"
                  >
                    Por Quilo
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setTipoSelecionado("bebida")}
                    href="#bebida"
                  >
                    Bebidas
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <div className="row" style={{ margin: "3px" }}>
              {produtosExibidos()?.map((produto, i) => (
                <div className="col-md-3" key={i}>
                  <Card
                    style={{ width: "100%", cursor: "pointer" }}
                    className={`mb-2 bg-dark text-white`}
                    onClick={() => handleAddToCart(produto)}
                  >
                    <Card.Header>{produto.nome.slice(0, 15)}</Card.Header>
                    <Card.Body id="HoverCard" >
                      <Card.Title>R$ {produto.preco} </Card.Title>
                      Estoque:{" "}
                      <span>
                        {(() => {
                          const itemSelecionado = selectedItems.find(
                            (item) => item.nome === produto.nome
                          );
                          const estoqueAtualizado =
                            itemSelecionado
                              ? produto.estoque - itemSelecionado.quantidade
                              : produto.estoque;

                          if (estoqueAtualizado === 0) {
                            return estoqueAtualizado;
                          } else {
                            return estoqueAtualizado;
                          }
                        })()}
                      </span>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* criar componente deste trecho */}
        <>
          {isMobile() ? (
            <div className="floating-button">
              <Button onClick={() => setShowModalPedido(true)}>
                Ver Pedido
              </Button>
            </div>
          ) : (
            <div className="col-sm-5">
              <ResumoPedido
                caixaAtual={caixaAtual}
                selectedItems={selectedItems}
                handleRemoveFromCart={handleRemoveFromCart}
                handleRemoveAllFromCart={handleRemoveAllFromCart}
              />
            </div>
          )}

          <Modal
            show={showModalPedido}
            onHide={() => setShowModalPedido(false)}
          >
            <ResumoPedido
              caixaAtual={caixaAtual}
              selectedItems={selectedItems}
              handleRemoveFromCart={handleRemoveFromCart}
              handleModalClose={handleModalClose}
              handleRemoveAllFromCart={handleRemoveAllFromCart}
            />
          </Modal>
        </>
      </div>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        onEntered={() => inputPrecoPeso.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Digite o peso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Quilograma (kg)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Digite o peso em quilograma (kg)"
              onChange={handlePrecoPesoChange}
              value={precoPeso}
              ref={inputPrecoPeso}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleModalAdd}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ComponenteVendas;
