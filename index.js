const express = require('express');
const app = express()
const porta = 3000;

const methodOverride = require('method-override');

const axios = require('axios');
const apiUrl = 'https://api.awsli.com.br/v1/produto';
const chaveApi = 'sua_chave_api';
const chaveAplicacao = 'sua_chave_aplicacao';


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    console.log(`Servidor Conectado na porta: ${porta}`);
    res.send(`Servidor Conectado na porta: ${porta}`)
    res.render(index)
})

app.listen(porta, ()=>{
    console.log(`Conexão estabelecida na porta: ${porta}`);
})