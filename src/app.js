const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');
const app = express();
app.use(express.json()); //coverte o corpa das requisicoes para JSON
app.use(cors());

//manipulador de rotas

app.use(routes);
app.use(errors());
//exposição na porta
// app.listen(3334,console.log('http://localhost:3334'));
module.exports = app;

