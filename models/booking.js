const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seats: {
    type: Number,
    min: 1,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('Booking', bookingSchema);