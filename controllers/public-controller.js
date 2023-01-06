const Flight = require('../models/flight');
const Airport = require('../models/airport');
const Booking = require('../models/booking');

const { respondError, respondSuccess } = require('./utils/responders');


//=================================================================================================


module.exports.getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find();
    respondSuccess(res, "Airports fetched successfully", airports);

  } catch(err) {
    respondError(res, 'Error getting airports', 500);
  }
}



module.exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate(['from', 'to']);
    respondSuccess(res, "Flights fetched successfully", flights);

  } catch(err) {
    respondError(res, 'Error getting flights', 500);
  }
}


module.exports.airportSearch = async (req, res) => {
  const { search } = req.body;
  try{
    // Search for airports with the given search term in their name, city, state or country and return max 3 results
    const airports = await Airport.find({$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {city: {$regex: search, $options: 'i'}},
                            {state: {$regex: search, $options: 'i'}},
                            {country: {$regex: search, $options: 'i'}}
                          ]}).limit(3);
    respondSuccess(res, "Airports fetched successfully", airports);

  } catch(err) {
    respondError(res, 'Error getting airports', 500);
  }
}


module.exports.findFlights = async (req, res) => {
  let { from, to } = req.body;

  try{
    const flights = await Flight.find({from, to}).populate(['from', 'to']);
    // const bookings = await Booking.find({date});

    // Add seats left to each flight
    // flights.forEach(flight => {
    //   bookings.forEach(booking => {
    //     if(booking.flight === flight._id) {
    //       flight.seats -= booking.seats;
    //     }
    //   });
    // });

    respondSuccess(res, "Flights fetched successfully", flights );
  
  } catch(err) {
    respondError(res, 'Error getting flights', 500);
  }
}