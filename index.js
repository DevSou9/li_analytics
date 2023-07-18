const express = require('express');
const app = express();
const porta = 3000;
const func = require('./functions');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  console.log(`Servidor Conectado na porta: ${porta}`);
  try {
    const dadosGrafico = await func.getPedidoLI();
    res.render('index', { dadosGrafico });
  } catch (error) {
    console.error(error);
    res.send('Erro ao gerar gráfico');
  }
});

app.listen(porta, () => {
  console.log(`Conexão estabelecida na porta: ${porta}`);
});
