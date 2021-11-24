const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: create enum for options

// Create the Schema for a Place
const placeSchema = new Schema({
  // department: { type: String, required: true },
  city: { type: String, required: true },
  // address: { type: String, required: true },
  type: { type: String, required: true }, // apartamento, casa, local
  offerType: { type: String, required: true },  // alquiler, venta
  // price: {type: Number, required: true},
  status: { type: String, default: 'inactivo' }, // activo, inactivo, comprado, ocupado
  // pictures: [String],
  // urlVideo: String,
  // contactInfo: String,
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }],
});

// Export the model
module.exports = mongoose.model('Place', placeSchema);
