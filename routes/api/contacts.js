const express = require('express');
const { auth } = require('../../middlewares');
const cntrl = require('../../controllers/contacts/');
const { cntrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', auth, cntrlWrapper(cntrl.getAll));

router.get('/:contactId', auth, cntrlWrapper(cntrl.getById));

router.post('/', auth, cntrlWrapper(cntrl.add));

router.delete('/:contactId', auth, cntrlWrapper(cntrl.removeById));

router.put('/:contactId', auth, cntrlWrapper(cntrl.updateById));

router.patch('/:contactId/favorite', auth, cntrlWrapper(cntrl.updateFavorite));

module.exports = router;
