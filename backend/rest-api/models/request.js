const mongoose = requiere('mongoose');
const { Schema } = mongoose;

// TODO: create enum for options

const requestSchema = new Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'enviado' }, // enviado, en_estudio, aceptado, rechazado
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  place: { type: mongoose.Types.ObjectId, required: true, ref: 'Place' },
});

module.exports = mongoose.model('Request', requestSchema);
