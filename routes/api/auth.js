const express = require('express');
const cntrl = require('../../controllers/auth/');
const { auth } = require('../../middlewares');
const { cntrlWrapper } = require('../../helpers');

const router = express.Router();

router.post('/signup', cntrlWrapper(cntrl.signup));
router.post('/login', cntrlWrapper(cntrl.login));
router.get('/logout', auth, cntrlWrapper(cntrl.logout));
router.get('/current', auth, cntrlWrapper(cntrl.getCurrent));

module.exports = router;
