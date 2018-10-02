const mongoose = require("mongoose");

const AddressesSchema = new mongoose.Schema({

});

module.exports = mongoose.model("addresses", AddressesSchema);
