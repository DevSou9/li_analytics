const axios = require('axios');
const apiUrl = 'https://api.awsli.com.br/v1/produto';
//const moment = require('moment');
const pedidosJSON = require('./pedidosJSON.json');
const fs = require('fs');
const { promisify } = require('util');
require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = process.env.URIMONGODB
const cliente = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
const {ObjectId} = require('mongodb');
const express = require('express');
const { error } = require('console');
const app = express();

app.use(express.urlencoded({extended:true}));

function conectarMongoDB() {
    console.log(`Entrou na conectarMongoDB`);
    cliente.connect(err => {
    console.log(`Erro de conexao: ${err}`);
  })
    .then(client => {
      console.log('Conectado ao MongoDB');
      const db = client.db('ecommerceanalytics');      
      return db;
    })
    .catch(error => {
      console.error('Erro ao conectar-se ao MongoDB:', error);
      throw error;
    });
}

conectarMongoDB();

function addProduto(){
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `chave_api ${chaveApi} aplicacao ${chaveAplicacao}`
}

const requestBody = {
  "id_externo": null,
  "sku": "prod-009",
  "mpn": null,
  "ncm": null,
  "nome": "Produto teste novo",
  "apelido": "produto-teste-novo",
  "descricao_completa": "<strong>Desctição HTML do produto</strong>",
  "ativo": false,
  "destaque": false,
  "peso": 0.45,
  "altura": 2,
  "largura": 12,
  "profundidade": 6,
  "tipo": "normal",
  "usado": false,
  "categorias": [
    "/api/v1/categoria/15246059/"
  ],
  "marca": "/api/v1/marca/18139613/",
  "removido": false
};

axios.post(apiUrl, requestBody, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}

function inserirDados(dataInicial, dataFinal) {
  return getPedidoLI(dataInicial, dataFinal)
    .then(dados => {
      return conectarMongoDB()
        .then(db => {
          return db.collection('pedidos').insertMany(dados);
        })
        .then(result => {
          console.log(`${result.insertedCount} documentos inseridos com sucesso.`);
        })
        .catch(error => {
          console.error('Erro ao conectar ou inserir os dados:', error);
          throw error;
        });
    })
    .catch(error => {
      console.error('Erro ao obter os dados:', error);
      throw error;
    });
}

inserirDados('a', 'b');

//Função em desenvolvimento para trabalhar com os Pedidos Loja Integrada
function getPedidoLI(dataInicial, dataFinal){
  const readFileAsync = promisify(fs.readFile);

  return readFileAsync('./pedidosJSON.json', 'utf8')
    .then(dados => {
      const parseData = JSON.parse(dados);
      //console.log(parseData);
      return parseData;
    })
    .catch(error => {
      console.error(error);
    });
}
const {a, b} = 1;
getPedidoLI(a,b)
  .then(getPedidoResult =>{
    console.log(`getPedido: ********\n ${JSON.stringify(getPedidoResult)}`);
  })
  .catch(error => {
    console.error(error);
  });

