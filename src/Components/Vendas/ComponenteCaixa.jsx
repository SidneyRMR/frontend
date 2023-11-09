// import { Button, Container, Stack } from "react-bootstrap";

// // import { useVendasContext } from "../../Context/VendasContext";
// import ModalNovoCaixa from "./ModalNovoCaixa";
// import ListagemCaixas from "./ListagemCaixas";
// import ComponenteVendas from "./ComponenteVendas";
// // import { FaFolderOpen } from "react-icons/fa";
// function ComponenteCaixa(props) {
//   // const { carregaCaixas, caixas } = useVendasContext();
//   // const dadosUsuarioJSON = sessionStorage.getItem("dadosUsuario");
//   // const dadosUsuario = JSON.parse(dadosUsuarioJSON);
//   const abrirCaixa = async (dadosCaixa) => {
//     <ComponenteVendas dadosCaixa={dadosCaixa} />;
//   };
//   const caixasAbertos = props.caixas?.filter((caixa) => caixa.aberto);
//   return (
//     <Container>
//       <Stack direction="horizontal">
//         {caixasAbertos.length > 0 ? (
//           caixasAbertos.map((caixa, i) => (
//             <Button
//               title="Abrir Caixa Existente"
//               variant="success"
//               onClick={() => abrirCaixa(caixa)}
//               key={i}
//             >
//               Abrir caixa
//             </Button>
//           ))
//         ) : (
//           <ModalNovoCaixa nomeBotao="Novo Caixa" />
//         )}

//         <div className="p-3 sub-titulo">LISTAGEM DE CAIXAS</div>
//       </Stack>

//       <ListagemCaixas dadosUsuario={props.dadosUsuario} />
//     </Container>
//   );
// }

// export default ComponenteCaixa;
