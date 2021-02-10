const express = require('express');
const routes = express.Router();
const { celebrate, Segments,Joi } = require('celebrate');
// const connection = require('./database/connection');

//{ controllers REQUIRES 
const EntregaController = require('./controllers/EntregaController');
const { min } = require('./database/connection');
//} controllers

//{rotas de controller entrega
routes.get('/', (req,res)=>{
    res.status(200).send("status ok");
});
routes.get('/listar',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page:Joi.number(),
        range:Joi.number()
    })
}),EntregaController.entrega);
routes.post('/entrega',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().min(4),
        telefone: Joi.string().required().min(8).max(11),
        rua: Joi.string().required(),
        numero: Joi.number(),
        cepCliente: Joi.string().min(8).max(9),
        ruaPartida: Joi.string(),
        numeroPartida: Joi.string().required(),
        cepPartida: Joi.string().required().min(8).max(9),
        dataEntrega: Joi.string().required()
    })
}),EntregaController.cadastrar);
routes.delete('/entrega/:id', EntregaController.delete); 
//}

module.exports = routes;