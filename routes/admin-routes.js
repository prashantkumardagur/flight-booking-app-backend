const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin-controller');
const { authCheck, adminCheck } = require('../middlewares/auth-middlewares');

// =====================================================================================

router.use(authCheck);
router.use(adminCheck);


router.post('/add-airport', admin.addAirport);
router.post('/add-flight', admin.addFlight);
router.post('/delete-flight', admin.deleteFlight);




// =====================================================================================

module.exports = router;