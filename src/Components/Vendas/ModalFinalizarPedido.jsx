import { useState, useRef } from "react";
import {
  Form,
  Button,
  Modal,
  FloatingLabel
} from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVendasContext } from "../../Context/VendasContext";

const ModalFinalizarPedido = ({
  handleRemoveAllFromCart,
  totalPedido,
  caixaAtual,
  selectedItems,
}) => {
  const { carregaVendasByUsuario, produtos } = useVendasContext();
  const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
  const dadosUsuario = JSON.parse(dadosUsuarioJSON);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValorDinheiro(0);
    setValorCredito(0);
    setValorDebito(0);
    setValorPix(0);
  };
  
  const handleShow = () => {
    setShow(true);
    setValorDinheiro(0);
    setValorCredito(0);
    setValorDebito(0);
    setValorPix(0);
  };
  
  const inputDinheiro = useRef(null);
  // const inputCredito = useRef(0);
  // const inputDebito = useRef(0);
  // const inputPix = useRef(0);

  const [valorDinheiro, setValorDinheiro] = useState(0);
  const [valorCredito, setValorCredito] = useState(0);
  const [valorDebito, setValorDebito] = useState(0);
  const [valorPix, setValorPix] = useState(0);

  // console.log(caixaAtual)
  const handleDinheiroChange = (event) => {
    setValorDinheiro(event.target.value);
    // console.log(event.target.value);
  };
  const handleCreditoChange = (event) => {
    setValorCredito(event.target.value);
  };
  const handleDebitoChange = (event) => {
    setValorDebito(event.target.value);
  };
  const handlePixChange = (event) => {
    setValorPix(event.target.value);
  };

  // console.log("produtosCarrinho", selectedItems)
  // console.log("caixaFinal", caixaAtual);
  // console.log("usuario", dadosUsuario);
  // Função que cria uma nova festa
  const salvarVenda = async (
    valorDinheiro,
    valorCredito,
    valorDebito,
    valorPix
  ) => {
    // Convertendo valores nulos ou undefined para 0
    valorDinheiro = valorDinheiro || 0;
    valorCredito = valorCredito || 0;
    valorDebito = valorDebito || 0;
    valorPix = valorPix || 0;

    if (
      valorDinheiro > 0 ||
      valorCredito > 0 ||
      valorDebito > 0 ||
      valorPix > 0
    ) {
      try {
        // Adicionando verificação para festaId
        if (dadosUsuario.festa === undefined) {
          throw new Error("festaId is undefined");
        }

        const res = await api.post(`/api/venda`, {
          dinheiro: valorDinheiro,
          credito: valorCredito,
          debito: valorDebito,
          pix: valorPix,
          caixaId: caixaAtual.id,
          usuarioId: dadosUsuario.id,
          festaId: dadosUsuario.festa,
        });

        // console.log(dadosUsuario.festa);
        toast.success(`${res.data.mensagem}.`, {
          position: toast.POSITION.TOP_LEFT,
        });
        // carregaCaixas(dadosUsuario.id);
        // console.log(dadosUsuario)
        // console.log(res);
        // carregaVendas(dadosUsuario.id);
        if (res.statusText === "Created") {
          await atualizarEstoque(selectedItems);
          
          if (valorDinheiro > 0) {
            console.log('valor dinheiro',valorDinheiro);
            console.log('valor obj caixa',caixaAtual.saldo_dinheiro);
            await atualizarSaldoDinheiro(valorDinheiro, caixaAtual.saldo_dinheiro);
          }
          await salvarVendaProdutos(
            selectedItems,
            res.data.venda.id,
            dadosUsuario.id
          );
          // console.log(selectedItems, res.data.venda.id);
          imprimirPedido(
            selectedItems,
            res.data.venda.id,
            caixaAtual.festaNome,
            dadosUsuario.nome,
            dadosUsuario.id
          );

          toast.success(`${res.data.mensagem}.`, {
            position: toast.POSITION.TOP_LEFT,
          });
        } else {
          deletaVenda(res.data.venda.id);
        }
        handleRemoveAllFromCart();
        return res.data;
      } catch (error) {
        console.log("erro salvar venda", error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      toast.warning("Somente valores positivos.");
    }
  };

  const horaAtual = () => {
    // Obtém a hora atual
    let horaAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    if (horaAtual.charAt(0) === "0") {
      horaAtual = horaAtual.replace("0", "00");
    }
    return `${horaAtual}`;
  };

  // console.log(produtosVenda);
  const dataAtual = () => {
    // Obtém a data atual
    let dataAtual = new Date().toISOString().substring(0, 10);
    return `${dataAtual}`;
  };
  const imprimirPedido = (
    produtos,
    idVenda,
    nomeFesta,
    nomeUsuario,
    idUsuario
  ) => {
    let impressoQuilograma = false;
    const janelaImpressao = window.open(
      "",
      "",
      "left=0,top=0,width=600,height=800,toolbar=1,scrollbars=1,status=1"
    );

    produtos.forEach((produto) => {
      if (produto.medida === "quilograma") {
        if (!impressoQuilograma) {
          impressoQuilograma = true;
          imprimirFicha(
            produto,
            idVenda,
            nomeFesta,
            nomeUsuario,
            idUsuario,
            janelaImpressao
          );
        }
      } else {
        for (let i = 0; i < produto.quantidade; i++) {
          imprimirFicha(
            produto,
            idVenda,
            nomeFesta,
            nomeUsuario,
            idUsuario,
            janelaImpressao
          );
        }
      }
    });
    janelaImpressao.print();
    janelaImpressao.document.close();
    janelaImpressao.close();
  };

  const imprimirFicha = (
    produto,
    idVenda,
    nomeFesta,
    nomeUsuario,
    idUsuario,
    janelaImpressao
  ) => {
    janelaImpressao.document.write(`
        <html>
          <div>
            <hr class='margens-hr'/>
            <span class='padrao'>Ped: ${idVenda}</span>
            <span class='padrao'>Caixa: ${nomeUsuario
              .split(" ")
              .slice(0, 2)
              .join(" ")}</span>
            <br/>
            <span class='padrao'>Data atual: ${dataAtual()}</span>
            <span class='padrao'>Hora atual: ${horaAtual()}</span>
    
            <div class='nome-produto'>${
              produto.nome ? produto.nome.toUpperCase() : ""
            }</div>
            <div class='preco-produto'>R$ ${
              produto.preco ? Number(produto.preco).toFixed(2) : ""
            }</div>
    
            <div class='padrao flex'>${nomeFesta}</div>
            <hr class='margens-hr'/>
          </div>
          <style>
            .padrao {
              font-size: 12px;
              padding: 7px;
            }
            .nome-produto {
              font-size: 22px;
              padding-left: 7px;
              padding-bottom: 0px;
              text-align: left;
            }
            .preco-produto {
              font-size: 15px;
              padding-right: 5px;
              padding-bottom: 0px;
              text-align: right;
            }
            .flex {
              font-size: 12px;
              padding: 0px;
              display: flex;
            }
            .margens-hr {
              padding: 0px;
            }
          </style>
        </html>
        ${"\x1D\x56\x00"}
    `);
  };

  const deletaVenda = async (idVenda) => {
    try {
      const res = await api.delete(`/api/venda/${idVenda}`);
      toast.success(`${res.data.mensagem}.`, {
        position: toast.POSITION.TOP_LEFT,
      });
      carregaVendasByUsuario(dadosUsuario.id);
      return res.data;
    } catch (error) {
      console.log("erro ao deletar", error.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const atualizarEstoque = async (vendaProdutos) => {
    console.log("atualizarEstoque", vendaProdutos);
    try {
      const promessas = vendaProdutos.map(async (vendaProduto) => {
        // Encontrar o produto correspondente com base no ID
        const produtoExistente = produtos.find(
          (produto) => produto.id === vendaProduto.id
        );

        if (produtoExistente) {
          // Calcular a nova quantidade de estoque após a subtração
          const novaQuantidadeEstoque =
            produtoExistente.estoque - vendaProduto.quantidade;

          // Atualizar o estoque do produto utilizando a API
          return await api.put(`/api/produto/${vendaProduto.id}`, {
            estoque: novaQuantidadeEstoque,
          });
        } else {
          console.log(`Produto com ID ${vendaProduto.id} não encontrado.`);
          // Você pode optar por tratar esse caso de forma específica, como rejeitar a promessa ou tomar outra ação apropriada.
        }
      });
      // Aguarda todas as chamadas API serem concluídas
      const resultados = await Promise.all(promessas);

      // resultados.forEach((res) => {
      // console.log(res)
      // toast.success(`${res.data.mensagem}.`, {
      // position: toast.POSITION.TOP_LEFT,
      // });
      // });

      return resultados.map((res) => res.data);
    } catch (error) {
      console.log("Erro em atualizar estoque", error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const salvarVendaProdutos = async (vendasProdutos, idVenda, idUsuario) => {
    // console.log('vendasProdutos',vendasProdutos)
    // console.log('idVenda',idVenda)
    console.log("idUsuario", idUsuario);
    try {
      // Mapeia o array de objetos e cria um array de promessas para as chamadas API
      const promessas = vendasProdutos.map(async (vendaProduto) => {
        return await api.post(`/api/venda_produto`, {
          nome: vendaProduto.nome,
          medida: vendaProduto.medida,
          preco: vendaProduto.preco,
          qtde_venda_produtos: vendaProduto.quantidade,
          produtoId: vendaProduto.id,
          vendaId: idVenda,
          usuarioId: idUsuario,
        });
      });

      // Aguarda todas as chamadas API serem concluídas
      const resultados = await Promise.all(promessas);

      // Exibe mensagem de sucesso para cada resposta
      // resultados.forEach((res) => {
      //   toast.success(`${res.data.mensagem}.`, {
      //     position: toast.POSITION.TOP_LEFT,
      //   });
      // });

      // Retorna os dados das respostas
      return resultados.map((res) => res.data);
    } catch (error) {
      // Em caso de erro, exibe o erro no console e uma mensagem de erro usando Toast
      console.log("erro em salvar produtos", error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  const atualizarSaldoDinheiro = async (pgtoDinheiro, saldoCaixa) => {
    const totalDinheiro = +pgtoDinheiro + +saldoCaixa
    console.log("testeAtualiza caixa", totalDinheiro)
    try {
      let res = await api.put(`/api/caixa/${caixaAtual.id}`, {
        dinheiro: totalDinheiro
      });
      res = await res.data.caixas;
      return res;
      
   
    } catch (error) {
      // Em caso de erro, exibe o erro no console e uma mensagem de erro usando Toast
      console.log("erro em atualizar saldo", error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      throw error; // Lança novamente o erro para que possa ser tratado por quem chamou esta função, se necessário.
    }
  };
  

  return (
    <>
      <ToastContainer />

      <div onClick={() => handleShow()}>Finalizar Pedido</div>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => inputDinheiro.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Escolha a forma de pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Dinheiro"
            className="mb-6 m-2"
            onChange={handleDinheiroChange}
            value={valorDinheiro ? valorDinheiro : null}
            ref={inputDinheiro}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Credito"
            className="mb-6 m-2"
            onChange={handleCreditoChange}
            value={valorCredito ? valorCredito : null}
            // ref={inputCredito}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Debito"
            className="mb-6 m-2"
            onChange={handleDebitoChange}
            value={valorDebito ? valorDebito : null}
            // ref={inputDebito}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Pix"
            className="mb-6 m-2"
            onChange={handlePixChange}
            value={valorPix ? valorPix : null}
            // ref={inputPix}
          >
            <Form.Control type="number" placeholder="Digite o valor" />
          </FloatingLabel> 
          {/* <div>
            <ToggleButtonGroup
              size="lg"
              type="radio"
              name="paymentOptions"
              defaultValue={1}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <ToggleButton
                id="tbg-dinheiro"
                onClick={() => handlePaymentSelect("dinheiro")}
              >
                Dinheiro
              </ToggleButton>
              <ToggleButton
                id="tbg-credito"
                onClick={() => handlePaymentSelect("credito")}
              >
                Crédito
              </ToggleButton>
              <ToggleButton
                id="tbg-debito"
                onClick={() => handlePaymentSelect("debito")}
              >
                Débito
              </ToggleButton>
              <ToggleButton
                id="tbg-pix"
                onClick={() => handlePaymentSelect("pix")}
              >
                PIX
              </ToggleButton>
            </ToggleButtonGroup>
            <div>
              {selectedPayment.map((payment) => (
                <>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1">
                      {payment.type.toUpperCase()}
                    </InputGroup.Text>
                    <Form.Control
                      onChange={handleDinheiroChange}
                      ref={inputRef}
                      value={valorDinheiro ? valorDinheiro : null}
                      key={payment.id}
                      type="number"
                      placeholder={`${payment.type}`}
                      className="payment-input"
                      id={payment.id}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </>
              ))}
            </div> 
          </div>*/}
        </Modal.Body>
        <hr />

        <Modal.Footer style={{ borderTop: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              Valor a Pagar: <strong>R$ {totalPedido.toFixed(2)}</strong>
            </div>

            {/* <div style={{ marginBottom: "5px" }}>
      {/* Valor total pago: R$ {totalPago.toFixed(2)} 
    </div> 
    */}

            <div>
              Troco: R${" "}
              {(() => {
                const somaTotal = (
                  Number(valorDinheiro) +
                  Number(valorCredito) +
                  Number(valorDebito) +
                  Number(valorPix)
                ).toFixed(2);

                const troco = (somaTotal - Number(totalPedido)).toFixed(2);

                if (somaTotal >= Number(totalPedido)) {
                  return <strong>{troco}</strong>;
                } else {
                  return "Sem troco";
                }
              })()}
            </div>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <Button
              disabled={
                +valorDinheiro + +valorCredito + +valorDebito + +valorPix <
                  totalPedido &&
                (+valorDinheiro >= 0 ||
                  +valorCredito >= 0 ||
                  +valorDebito >= 0 ||
                  +valorPix >= 0)
              }
              variant="primary"
              onClick={() => {
                if (
                  salvarVenda(
                    valorDinheiro,
                    valorCredito,
                    valorDebito,
                    valorPix
                  )
                ) {
                  handleClose();
                }
              }}
            >
              Efetuar o Pagamento
            </Button>

            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Sair
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFinalizarPedido;
