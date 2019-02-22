const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate");
const mongooseDelete = require("mongoose-delete");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    nickname: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        select: false
    },
    genre:{
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true
    },
    birthdate: Date,
    authToken: String,
    passwordToken: String,
    cpf: String,
    emailVerified: {
        type: Boolean,
        default: false
    },
    phone: [{
        type: {
            type: String,
            enum: ["RESIDENTIAL", "COMMERCIAL", "CELL-PHONE"]
        },
        number: String
    }],
    location:{
        type: [Number],
        index: "2d"
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'addresses'
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    active: {
        type: Boolean,
        default: true
    },
    baptized:{
        type: Boolean,
        default: false
    },
    memberType:{
        type: String,
        enum: ["MEMBER", "VISITOR", "FREQUENTER", "OFF"]
    },
    dateTicket: Date
}, {
    timestamps: true,
    id: true,
    versionKey: false
});

UserSchema.index({
    username: 1
});

UserSchema.index({
    email: 1
});

UserSchema.index({
    cpf: 1
});

UserSchema.pre("save", function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(
            this.password,
            bcrypt.genSaltSync(SALT_WORK_FACTOR, null)
        );
    }
    next();
});

// methods
// generating a hash
UserSchema.methods.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR, null));

// cheching if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseDelete, {
    overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'],
    deletedBy : true,
    deletedAt : true
});

module.exports = mongoose.model("users", UserSchema);
