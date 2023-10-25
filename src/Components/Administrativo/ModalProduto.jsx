import { useEffect, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useDataContext } from "../../Context/DataContext";
const ModalProduto = (props) => {
  const { atualizaProdutos } = useDataContext();
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState(props.dado && props.dado.nome ? props.dado.nome :  null);
  const [preco, setPreco] = useState(props.dado && props.dado.preco ? props.dado.preco :  null);
  const [estoque, setEstoque] = useState(props.dado && props.dado.estoque ? props.dado.estoque :  null);
  const [medida, setMedida] = useState(props.dado && props.dado.medida ? props.dado.medida :  'unidade');
  const [tipo, setTipo] = useState(props.dado && props.dado.tipo ? props.dado.tipo :  'comida');


  useEffect(() => {
    // Este código será executado toda vez que 'show' for alterado
    if (props.dado && props.dado.nome) {
      setNome(props.dado.nome);
      setPreco(props.dado.preco);
      setEstoque(props.dado.estoque);
      setMedida(props.dado.medida);
      setTipo(props.dado.tipo);
    } else {
      setNome('');
      setPreco('');
      setEstoque('');
      setMedida('unidade');
      setTipo('comida');
    }
  }, [show, props.dado]);

  // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };
  const handleMedidaChange = (event) => {
    setMedida(event.target.value);
  };
  const handleEstoqueChange = (event) => {
    setEstoque(event.target.value);
  };
  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  //   // Função que cria um usuario
  const novoProduto = async (nome, preco, medida, estoque, tipo) => {
    try {
      const res = await api.post("/api/produto", {
        nome,
        preco,
        medida,
        estoque,
        tipo,
        festaId: props.festa,
      });
      atualizaProdutos(props.festa)
      toast.success(`${res.data.mensagem}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data;
    } catch (error) {
      toast.error(error.response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  


  const alteraProduto = async (
    id,
    nome,
    preco,
    medida,
    estoque,
    tipo,
  ) => {
    if (window.confirm("Tem certeza de que alterar este produto?")) {
      // console.log(id, nome);
      try {
        const res = await api.put(`/api/produto/${id}`, {
          id,
          nome,
          preco,
          medida,
          estoque,
          tipo,
        });
        // console.log(res.data);
        atualizaProdutos(props.festa)
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

      <Button variant="primary" onClick={handleShow}>
        {props.nomeBotao}
      </Button>

      <Modal show={show} onHide={handleClose} onEntered={() => inputNome.current.focus()}>
        <Modal.Header closeButton>
          <Modal.Title>Criar novo produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-6" id="usuarioForm.ControlInput1">
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
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Label>Preco</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o preço"
                onChange={handlePrecoChange}
                value={preco}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Group
                className="mb-3"
                controlId="usuarioForm.ControlTextarea1"
              >
                <Form.Label>Estoque</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o estoque"
                  onChange={handleEstoqueChange}
                  value={estoque}
                />
              </Form.Group>
              <Form.Label>Medida</Form.Label>
              <Form.Select
                aria-label="Escolha uma opção"
                onChange={handleMedidaChange}
                value={medida}
              >
                <option default value="unidade">Unidade</option>
                <option value="quilograma">Quilograma</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="usuarioForm.ControlTextarea1"
            >
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                aria-label="Escolha uma opção"
                onChange={handleTipoChange}
                value={tipo}
              >
                <option default value="comida">Comida</option>
                <option value="bebida">Bebida</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.nomeBotao === "Novo Produto"
                ? novoProduto(nome, preco, medida, estoque, tipo)
                : alteraProduto(props.dado.id, nome, preco, medida, estoque, tipo);
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

export default ModalProduto;
