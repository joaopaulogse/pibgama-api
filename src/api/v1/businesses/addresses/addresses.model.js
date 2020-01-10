const mongoose = require("mongoose");

const AddressesSchema = new mongoose.Schema({
    cep: String,
    state: String,
    city: String,
    neighborhood: String,
    street: String
});

module.exports = mongoose.model("addresses", AddressesSchema);
