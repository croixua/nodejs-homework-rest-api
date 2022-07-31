const express = require('express');
const cntrl = require('../../controllers/contacts/');
const { cntrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', cntrlWrapper(cntrl.getAll));

router.get('/:contactId', cntrlWrapper(cntrl.getById));

router.post('/', cntrlWrapper(cntrl.add));

router.delete('/:contactId', cntrlWrapper(cntrl.removeById));

router.put('/:contactId', cntrlWrapper(cntrl.updateById));

router.patch('/:contactId/favorite', cntrlWrapper(cntrl.updateFavorite));

module.exports = router;
