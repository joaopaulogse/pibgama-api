const Service = require("../../commom/service");
const Addresses = require("./addresses.model");
const cep = require("cep-promise");

class AddressesService extends Service {
    constructor(){
        super("addresses");
    }

    async searchCep(queryCep){
        try {
            return await cep(queryCep);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = AddressesService;
