const mongoose = requiere('mongoose');
const { Schema } = mongoose;

const STATUS = ['enviado', 'en estudio', 'aceptado', 'rechazado'];

const requestSchema = new Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, enum: STATUS, default: 'enviado' },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  place: { type: mongoose.Types.ObjectId, required: true, ref: 'Place' },
});

module.exports = mongoose.model('Request', requestSchema);
