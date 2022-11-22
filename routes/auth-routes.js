const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth-controller');
const { authCheck } = require('../middlewares/auth-middlewares');

// =====================================================================================

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/refresh-token', authCheck, auth.refreshToken);
router.post('/change-password', authCheck, auth.changePassword);
router.post('/admin-login', auth.adminLogin);

// =====================================================================================

module.exports = router;