const express = require('express');
const cntrl = require('../../controllers/auth/');
const { auth, upload } = require('../../middlewares');
const { cntrlWrapper } = require('../../helpers');

const router = express.Router();

// signup
router.post('/signup', cntrlWrapper(cntrl.signup));
router.get('/verify/:verificationToken', cntrlWrapper(cntrl.verifyEmail));
router.post('/verify', cntrlWrapper(cntrl.resendVerifyEmail));

// login
router.post('/login', cntrlWrapper(cntrl.login));

// logout
router.get('/logout', auth, cntrlWrapper(cntrl.logout));

// current
router.get('/current', auth, cntrlWrapper(cntrl.getCurrent));

// avatars
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  cntrlWrapper(cntrl.setAvatar),
);

module.exports = router;
