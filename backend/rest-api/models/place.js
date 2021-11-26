const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TYPE = ['apartamento', 'casa', 'local'];
const OFFER_TYPE = ['alquiler', 'venta'];
const STATUS = ['activo', 'inactivo', 'comprado', 'ocupado'];

// Create the Schema for a Place
const placeSchema = new Schema({
  // department: { type: String, required: true },
  city: { type: String, required: true },
  // address: { type: String, required: true },
  type: {
    type: String,
    enum: TYPE,
    required: true,
  }, // apartamento, casa, local
  offerType: { type: String, enum: OFFER_TYPE, required: true }, // alquiler, venta
  // price: {type: Number, required: true},
  status: {
    type: String,
    enum: STATUS,
    default: 'activo',
  }, // activo, inactivo, comprado, ocupado
  // pictures: [String],
  // urlVideo: String,
  // contactInfo: String,
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }],
});

// Export the model
module.exports = mongoose.model('Place', placeSchema);
