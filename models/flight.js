const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Airport'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Airport'
  },
  departure: {
    type: String,
    required: true
  }, 
  arrival: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  passengers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Flight', flightSchema);