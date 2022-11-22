const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  favorites:[{
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  }],
  journeys: [{
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  }]
});

module.exports = mongoose.model('User', userSchema);