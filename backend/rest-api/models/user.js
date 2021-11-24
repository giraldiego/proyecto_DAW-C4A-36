const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// TODO: create enum for options

const userSchema = new Schema({
    name:{ type: String, required: true},
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true, minlength: 6 },
    role: {type:String, default: 'cliente'},    // values: admin, asesor, *cliente
    emailVerified: {type:Boolean, default: false},
    verificationToken: String,
    requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }],
    places: [{ type: mongoose.Types.ObjectId, ref: 'Place' }], // Only aplies to Salesman
});

// Apply the uniqueValidator plugin to userSchema.
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
