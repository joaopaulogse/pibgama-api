const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CultsSchema = new mongoose.Schema({
    name: String,
    count: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: String,
    type: {
        enum: ["HOPE", "HYPE", "CELEBRACAO", "TADEL", "EVENTOS"],
        type: String,
        required: true
    }
}, {
    timestamps: true,
    id: true,
    versionKey: false
});



CultsSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("cults", CultsSchema);
