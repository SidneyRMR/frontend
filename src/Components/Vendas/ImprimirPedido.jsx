import { useState, useEffect } from "react"
import { api } from "../services/api"
import { Button } from "react-bootstrap";

export default function FuncoesVenda(props) {
    
    // const caixa = JSON.parse(sessionStorage.getItem("caixa"));
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    // const idVenda = props.idVenda;
      //esta certo, não esta aparecendo pois nao tem nada igual com o id venda  pois não esta salvando no banco de dados 
    const [produtosVenda, setProdutosVenda] = useState([])
    useEffect(() => {
        const getProdutosVenda = async () => {
            try {
                const res = await api.get("/vendasprodutos")
                setProdutosVenda(res.data.filter(item => item.id_venda === props.idVenda).sort((a, b) => (a.id_venda_produto  > b.id_venda_produto  ? 1 : -1)))
                //filtra todos os pedidos deste id_venda
                // console.log(res.data.filter(item => item.id_venda === props.idVenda))
                // console.log(produtosVenda)
                
            } catch (error) {
                console.error(error)
            }
        };
        getProdutosVenda();
    },[setProdutosVenda,props.idVenda]);
    // console.log(produtosVenda);

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

    const imprimirPedido = () => {
        // console.log(produtosVenda)
        const janelaImpressao = window.open('', '', 'left=0,top=0,width=600,height=800,toolbar=1,scrollbars=1 ,status=1')
        produtosVenda.forEach((produto) => {
          for (let i = 0; i < produto.qtde_venda_produto; i++) {
          janelaImpressao.document.write(`
          <html>
                <div >
                <hr class='margens-hr'/>
      
                  <span class='padrao'>Ped: ${produto.id_venda}</span>
                    <span class='padrao'>Caixa: ${usuario.nome_usuario.split(' ').slice(0, 2).join(" ")}</span >
                  <br/>
                  <span class='padrao'>Data atual: ${dataAtual()}</span >   
                    <span class='padrao'>Hora atual: ${horaAtual()}</span>
      
                  <div class='nome-produto'>${produto.nome ? produto.nome.toUpperCase() : ''}</div>
                  <div class='preco-produto'>R$ ${produto.preco ? produto.preco.toFixed(2) : ''}</div>
      
                  <div class='padrao flex'>PARÓQUIA SANTA CRUZ</div>
                  <hr class='margens-hr'/>
                </div>
              <style>
                .padrao{
                  font-size: 12px;
                  padding: 7px
              }
                .nome-produto{
                  font-size: 22px;
                  padding-left: 7px
                  padding-bottom: 0px;
                  text-align: left;
              }
                .preco-produto{
                  font-size: 15px;
                  padding-right: 5px;
                  padding-bottom: 0px;
                  padding-down: 0px;
                  text-align: right;
              }
                .flex {
                  font-size: 12px;
                  padding: 0px
                  display: flex;
                }
                .margens-hr {
                  padding: 0px
                }
              </style>
              </html>
              `)
            }
          })
          janelaImpressao.print();
        janelaImpressao.document.close();
        janelaImpressao.close();
      }
    return (
        <div>
            <Button className="botao" onClick={imprimirPedido}>Reimprimir p.  </Button>


        </div>
    )
}