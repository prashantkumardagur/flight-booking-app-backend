const Booking = require('../models/booking');
const Flight = require('../models/flight');

const { respondError, respondSuccess } = require('./utils/responders');

//=================================================================================================

module.exports.bookFlight = async (req, res) => {
  const { flightId, seats, date, uid } = req.body;

  try {
    const booking = new Booking({ flight: flightId, user: uid, seats, date });
    await booking.save();
    respondSuccess(res, 'Flight booked successfully', booking);
  } catch (err) {
    respondError(res, 'Error booking flight', 500);
  }
}