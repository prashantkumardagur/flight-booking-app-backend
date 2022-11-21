const express = require('express');
const router = express.Router();

const public = require("../controllers/public-controller");

// =====================================================================================


router.post("/helloWorld", public.helloWorld);


// =====================================================================================

module.exports = router;