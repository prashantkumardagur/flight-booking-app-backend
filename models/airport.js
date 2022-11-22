const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  flightsIncoming: [{
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  }],
  flightsOutgoing: [{
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  }]
});

module.exports = mongoose.model('Airport', airportSchema);