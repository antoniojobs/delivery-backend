const generateUniqueId = require('../../src/utils/generateUniqueId')
describe('Generate Unique ID',()=>{
    it('deve gerar um ID único com crypto',()=>{
        const id = generateUniqueId();
        console.log('o id é = '+id);
        expect(id).toHaveLength(8);
    });
})