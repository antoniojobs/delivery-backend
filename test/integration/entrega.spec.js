const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')
describe('entrega',()=>{
    beforeEach(async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(async()=>{
        await connection.destroy();
    });
    function tata(data) {
        return data['idEntrega']
    }
    it('deve criar uma nova entrega',async()=>{
        const response = await request(app).post('/entrega').send({
            nome: "Chimbinha",
            telefone: "21991892714",
            rua: "Rua Oiticica",
            numero: "48",
            cepCliente: "26021070",
            ruaPartida: "Rua Manoel Martins Pereira",
            numeroPartida: "240",
            cepPartida: "26022670",
            dataEntrega: "2021-02-22"
        });
        const data = response.body;
        console.log(data);
        
/*         expect(data).toHaveProperty(['idEntrega']);
        it('deve deletar a entrega',async()=>{
            const response = await request(app).post(`/entrega${data}`)
        }); */
        
    });
    
});   