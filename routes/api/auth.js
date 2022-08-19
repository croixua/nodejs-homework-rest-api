const express = require('express');
const cntrl = require('../../controllers/auth/');
const { auth, upload } = require('../../middlewares');
const { cntrlWrapper } = require('../../helpers');

const router = express.Router();

router.post('/signup', cntrlWrapper(cntrl.signup));
router.post('/login', cntrlWrapper(cntrl.login));
router.get('/logout', auth, cntrlWrapper(cntrl.logout));
router.get('/current', auth, cntrlWrapper(cntrl.getCurrent));
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  cntrlWrapper(cntrl.setAvatar),
);

module.exports = router;
