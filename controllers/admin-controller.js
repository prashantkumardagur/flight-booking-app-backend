// const User = require('../models/User');
const Flight = require('../models/flight');
const Airport = require('../models/airport');

const { respondError, respondSuccess } = require('./utils/responders');

// =====================================================================================


// Add new airport
exports.addAirport = async (req, res) => {
  const { name, city, state, country } = req.body;

  try{
    const airport = new Airport({name, city, state, country});
    await airport.save();
    respondSuccess(res, 'Airport added successfully', airport);

  } catch (err) {
    respondError(res, 'Error adding airport', 500);
  }
};

// Add new flight
exports.addFlight = async (req, res) => {
  const { flightNumber, airline, from, to, departure, arrival, price, seats } = req.body;

  try{
    const flight = new Flight({flightNumber, airline, from, to, departure, arrival, price, seats});
    await flight.save();

    await Airport.findByIdAndUpdate(from, {$push: {flightsOutgoing: flight._id}});
    await Airport.findByIdAndUpdate(to, {$push: {flightsIncoming: flight._id}});

    let newFlight = await Flight.findById(flight._id).populate(['from', 'to']);
    respondSuccess(res, 'Flight added successfully', newFlight);

  } catch (err) {
    respondError(res, 'Error adding flight', 500);
  }
}


// Delete a flight
exports.deleteFlight = async (req, res) => {
  const { id } = req.body;

  try{
    await Flight.findByIdAndDelete(id);
    await Airport.updateMany({}, {$pull: {flightsOutgoing: id, flightsIncoming: id}});
    respondSuccess(res, 'Flight deleted successfully');

  } catch (err) {
    respondError(res, 'Error deleting flight', 500);
  }

};