const HttpStatus = require("http-status");
const AddressesService = require("./addresses.service");
const addressService = new AddressesService();

exports.search = async (req, res) => {
    try {
        const address = await addressService.searchCep(req.params.cep);
        return res.status(HttpStatus.OK).json(address);
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({

        });
    }
};
