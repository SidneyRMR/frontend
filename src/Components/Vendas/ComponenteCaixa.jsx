import { Container, Stack } from "react-bootstrap";

// import { useVendasContext } from "../../Context/VendasContext";
import ModalNovoCaixa from "./ModalNovoCaixa";
import ListagemCaixas from "./ListagemCaixas";
function ComponenteCaixa(props) {
// const { carregaCaixas, caixas } = useVendasContext();
// const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
// const dadosUsuario = JSON.parse(dadosUsuarioJSON);

  return (
    <Container>
      <Stack direction="horizontal">
        <ModalNovoCaixa nomeBotao='Novo Caixa' />
          <div className="p-3 sub-titulo">
            LISTAGEM DE CAIXAS
          </div>
      </Stack>

      <ListagemCaixas
        dadosUsuario={props.dadosUsuario}
      />
    </Container>
  );
}

export default ComponenteCaixa;
