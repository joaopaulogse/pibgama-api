const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseDelete = require("mongoose-delete");

// const { ValidationError } = require("../../utils/errors");
const TYPES = ["SMALL", "SECTOR", "AREA", "NETWORK", "DISTRICT"];
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: TYPES,
        default: "SMALL"
    },
    creationDate: {
        type: Date,
        required: true
    },
    dayOfTheWeek: {
        type: String,
        enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
        required: true
    },
    hour: Date,
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses'
    },
    location:{
        type: [Number],
        index: "2d",
    },
    leaders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    ],
    auxLeaders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ]
}, {
    timestamps: true,
    id: true,
    versionKey: false
});

// GroupSchema.pre("save", async function() {
//     const group = await this.populate("parent leaders").execPopulate();
//     if(group.parent){
//         if(group.type === group.parent.type){
//             throw new ValidationError("Group type is same as top group");
//         }
//         // Hirarquia
//         TYPES.forEach((type, i) => {
//             if(group.type === type){
//                 const groupSuperior = TYPES[++i];
//                 if(groupSuperior){
//                     if(group.parent.type !== groupSuperior){
//                         throw new ValidationError(`Group ${group.name} cannot be associated with this Group ${group.parent.name}`);
//                     }
//                 }
//             }
//         });
//     }

// });

GroupSchema.plugin(mongoosePaginate);
GroupSchema.plugin(mongooseDelete, {
    overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
    deletedBy : true,
    deletedAt : true
});

module.exports = mongoose.model("groups", GroupSchema);
