const express = require('express');
const axios = require('axios').default;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

//cadastro
app.get('/vendas', (req, res) =>{
    res.render('vendas/index')
})


//listagem
app.get('/vendas/telaListagem', (req,res) =>{

    const urlListarCadastro = 'http://localhost:3000/venda/ListagemDados'

    axios.get(urlListarCadastro)
    .then(
        (response)=>{
            console.log(response.data);
            let vendas = response.data;
            console.log(vendas);
            res.render('vendas/telaListagem', {vendas})
        })
})

//alterar
app.get('/vendas/telaAlterar/:cpf', (req, res) => {
    let {cpf} = req.params;
    urlListarCadastroID = `http://localhost:3000/venda/ListagemDadosID/:cpf`

    axios.get(urlListarCadastroID)
        .then ((response) => {
            let cadastro = response.data;
            res.render('vendas/telaAlterar.ejs', {cadastro})
        })
});

app.post('/vendas/telaAlterar', (req, res) =>{

    let urlEditar = 'http://localhost:3000/AtualizarDados';

    axios.put(urlEditar, req.body)
        .then(
            (response) => {
                res.send('Informações alteradas')
            })
})

//deletar
app.delete('', (req, res) => {

    let urlDeletar = 'http://localhost:3000/DeletarDados/:cpf'

})


app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});
