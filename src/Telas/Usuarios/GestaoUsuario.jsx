// import { useState } from "react";
// import { Card, Row, Col, Button, Nav } from "react-bootstrap";
// import { api } from "../../services/api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CarregarFestas } from "../../Funcoes/carregarFestas";
// import { CarregarUsuarios } from "../../Funcoes/carregarUsuarios";

// const GestaoUsuario = () => {
//   const festas = CarregarFestas();
//   console.log("Festas", festas);
//   const usuarios = CarregarUsuarios();
//   console.log("Usuarios", usuarios);

//   const urlParams = new URLSearchParams(window.location.search);
//   const id = +urlParams.get("id");

//   const paramNome = urlParams.get("nome");
//   const paramLogin = urlParams.get("login");
//   const paramFestumId = urlParams.get("festumId");

//   const [nome, setNome] = useState(id ? paramNome : "");
//   const [login, setLogin] = useState(id ? paramLogin : "");
//   const [festumId, setFestumId] = useState(id ? paramFestumId : "");
//   const [senha, setSenha] = useState("");
//   const [senha2, setSenha2] = useState("");

//   // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
//   const handleNomeChange = (event) => {
//     setNome(event.target.value);
//   };
//   const handleLoginChange = (event) => {
//     setLogin(event.target.value);
//   };
//   const handleSenhaChange = (event) => {
//     setSenha(event.target.value);
//   };
//   const handleSenha2Change = (event) => {
//     setSenha2(event.target.value);
//   };
//   const handleIdFestaChange = (event) => {
//     setFestumId(event.target.value);
//   };

//   // Função que cria um usuario produto
//   const novoUsuario = async (id, nome, login, senha, senha2, festaumId) => {
//     console.log("idfesta", festaumId);
//     const usuarioEncontrado = usuarios.find(
//       (usuario) =>
//         usuario.nome.toLowerCase() === nome.toLowerCase() && usuario.id !== id
//     );
//     if (usuarioEncontrado) {
//       toast.error("Já tem um usuário com este nome!", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       return;
//     }

//     if (!nome || !login || !senha || !senha2 || !festaumId) {
//       toast.error("Todos os campos devem estar preenchidos!", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       return;
//     }
//     if (senha.length < 6) {
//       toast.error("A senha deve ter mais de seis caracteres!", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       return;
//     }
//     if (senha !== senha2) {
//       console.log(senha, senha2);
//       toast.error("As senhas devem ser iguais!", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       return;
//     }
//     try {
//       const res = await api.post("/api/usuario", {
//         nome,
//         login,
//         senha,
//         festaumId,
//       });
//       toast.success(`${res.data} salvo com sucesso`, {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       return res.data, (window.location.href = "/login");
//     } catch (error) {
//       toast.error(error);
//     }
//   };
//   // Função que altera o usuario
//   /// !!!! esta com algum problema no back ou no front
//   // const alteraUsuario = async (id, nome, login, festaumId, tipo) => {
//   //     const usuarioEncontrado = usuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase()
//   //         && usuario.id !== id)
//   //     if (usuarioEncontrado) {
//   //         toast.error('Já tem um item com este nome!', {
//   //             position: toast.POSITION.TOP_CENTER,
//   //         })
//   //         return
//   //     }
//   //     if (!nome || !login || !tipo) {
//   //         toast.error('Todos os campos devem estar preenchidos!', {
//   //             position: toast.POSITION.TOP_CENTER,
//   //         })
//   //         return
//   //     }
//   //     try {
//   //         const res = await api.put(`/usuarios/${id}`, {
//   //             id,
//   //             nome,
//   //             login,
//   //             festaumId,
//   //             tipo,
//   //         })
//   //         toast.success(`${nome} alterado com sucesso`, {
//   //             position: toast.POSITION.TOP_CENTER,
//   //         })
//   //         return (res.data, (window.location.href = '/cadastros/usuarios'))
//   //     } catch (error) {
//   //         console.error(error)
//   //     }
//   // }

//   return (
//           <Nav variant="tabs" defaultActiveKey="/listar-usuarios">
//             <Nav.Item>
//               <Nav.Link href="/listar-usuarios">Listar Usuarios</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link href="/alterar-usuario">Alterar</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link href="/novo-usuario">Novo</Nav.Link>
//             </Nav.Item>
//           </Nav>
//         );
//       }
      
// //     <Card fluid="true">
// //       <ToastContainer />
// //       <Row>
// //         <div className="title">Cadastro de Usuario</div>
// //       </Row>
// //       <br />
// //       <Row>
// //         <Col>
// //           <div>Digite o nome do usuário:</div>

// //           <input
// //             className="nomeUsuario"
// //             type="text"
// //             placeholder="Insira seu nome completo"
// //             onChange={handleNomeChange}
// //             value={nome}
// //           />
// //         </Col>
// //       </Row>
// //       <br />
// //       <Row>
// //         <Col>
// //           <div>Digite o login do usuário:</div>

// //           <input
// //             className="loginUsuario"
// //             type="text"
// //             placeholder="Cadastre um login"
// //             onChange={handleLoginChange}
// //             value={login}
// //           />
// //         </Col>
// //       </Row>
// //       <br />
// //       {!id && (
// //         <>
// //           <Row>
// //             <Col>
// //               <div>Digite a senha:</div>
// //               <input
// //                 className="senhaUsuario"
// //                 type="password"
// //                 placeholder="Digite a senha"
// //                 onChange={handleSenhaChange}
// //                 value={senha}
// //               />
// //             </Col>
// //           </Row>
// //           <br />
// //           <Row>
// //             <Col>
// //               <div>Repita a senha:</div>
// //               <input
// //                 className="senhaUsuario"
// //                 type="password"
// //                 placeholder="Repita a senha"
// //                 onChange={handleSenha2Change}
// //                 value={senha2}
// //               />
// //             </Col>
// //           </Row>
// //         </>
// //       )}
// //       <Row>
// //         <Col>
// //           <div>Selecione a festa:</div>

// //           <select onChange={handleIdFestaChange} value={festumId}>
// //             {festas
// //               ? festas.map((festa, i) => {
// //                   return (
// //                     <option key={i} value={festa.festaumId}>
// //                       {festa.nome}
// //                     </option>
// //                   );
// //                 })
// //               : "Carregando..."}
// //           </select>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col>
// //           {!id && (
// //             <Button
// //               className="button-primary md-1"
// //               onClick={() => {
// //                 novoUsuario(id, nome, login, senha, senha2, festumId);
// //                 // console.log('novo', id)
// //               }}
// //             >
// //               Salvar
// //             </Button>
// //             // )) || (id && (
// //             //     <Button className='botao' onClick={() => {
// //             //         alteraUsuario(id, nome, login, festumId)
// //             //         // console.log('editado', id, nome, login, tipo)
// //             //     }}>Salvar
// //             //     </Button>
// //           )}

// //           <Button
// //             className="button-danger md-1"
// //             onClick={() => (window.location.href = "/login")}
// //           >
// //             Voltar
// //           </Button>
// //         </Col>
// //       </Row>
// //     </Card>
// //   );
// // };

// export default GestaoUsuario;
