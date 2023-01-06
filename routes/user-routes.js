const express = require('express');
const router = express.Router();

const user = require("../controllers/user-controller");

const { authCheck } = require('../middlewares/auth-middlewares');

// =====================================================================================

router.use(authCheck);

router.post("/book-flight", user.bookFlight);


// =====================================================================================

module.exports = router;