const Knex = require("knex");
const { count } = require("../database/connection");
const connection = require("../database/connection");
const sqlite3 = require("sqlite3").verbose();

module.exports = {
  async entrega(request, response) {
    const [numero_registros] = await connection("entregas").count();
    const { page = 1 } = request.query;
    const { range = 5 } = request.query;
    const dados_entregas = await connection("entregas")
    .limit(range)
    .offset(((page - 1) * range))
    .select("*");
    
    response.header("x-powered-by", "https://github.com/antoniojobs");
    response.header("x-total-count", numero_registros["count(*)"]);
    console.log(page,range);
    return response.json({dados_entregas,"x-total-count":numero_registros["count(*)"]});
  },
  async cadastrar(request, response) {
    // const { nome_cliente,endereco_cliente,cep_cliente,endereco_partida,cep_partida,data_entrega } = request.body;
    // const valores = request.body;
    const val = ({
      nome,
      telefone,
      rua,
      numero,
      cepCliente,
      ruaPartida,
      numeroPartida,
      cepPartida,
      dataEntrega,
    } = request.body);
    try {
      const [id] = await connection("entregas").insert({
        nome,
        telefone,
        rua,
        numero,
        cepCliente,
        ruaPartida,
        numeroPartida,
        cepPartida,
        dataEntrega,
      });
      
      const [registro] = await connection("entregas")
      .select("*")
      .where("idEntrega", id);
      if (Object.entries(registro).length == 0) {
        return response.json("registro não encontrado");
      } else {
        return response.json(registro);
      }
    } catch (error) {
      console.log(error);
      return response.json({ erro: "500" });
    }
  },
  async update(request, response,) {
    try {
      const { nome } = request.body;
      const { id } = request.params;
      const retornoQuery = await connection("usuarios")
      .update({ nome })
      .where({ id });
      return response.send(200);
    } catch (error) {
      next(error);
    }
  },
  async delete(request, response,) {
    const {id}  = request.params;
    try {
      let retorno = await connection('entregas')
      .where('idEntrega', id)
      .del()
      console.log(retorno);
      if (retorno==1) {
        response.status(200).json({"deletado":Boolean(retorno)}).send()
      } else retorno==0
      {
        response.status(200).json({"deletado":Boolean(retorno)}).send()
      }
    } catch (error) {
      console.log(error);
    }
  },
};
