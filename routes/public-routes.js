const express = require('express');
const router = express.Router();

const public = require("../controllers/public-controller");

// =====================================================================================


router.post("/get-all-airports", public.getAllAirports);
router.post("/airport-search", public.airportSearch);

router.post("/get-all-flights", public.getAllFlights);
router.post("/find-flights", public.findFlights);


// =====================================================================================

module.exports = router;