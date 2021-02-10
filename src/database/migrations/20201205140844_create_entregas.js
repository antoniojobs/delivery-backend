
exports.up = function(knex) {
  return knex.schema.createTable('entregas', function(table){
      table.increments('idEntrega').primary();
      table.string('nome').notNullable();
      table.string('telefone').notNullable();
      table.string('rua').notNullable();
      table.string('numero').notNullable();
      table.string('cepCliente').unsigned().notNullable();
      
      table.string('ruaPartida').notNullable();
      table.string('numeroPartida').notNullable();
      table.string('cepPartida').unsigned().notNullable();
      table.date('dataEntrega');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('entregas');
};
