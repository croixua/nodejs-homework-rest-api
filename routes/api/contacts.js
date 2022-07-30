const express = require('express');
const Joi = require('joi');
const Contact = require('../../models/contact');
const createError = require('../../helpers/createError');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .required();

const contactFavoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) throw createError(404, 'Not found');

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactAddSchema.validate(body);
    if (error) throw createError(400, error.message);
    const result = await Contact.create(body);

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) throw createError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body, params } = req;
    const { contactId } = params;

    const { error } = contactUpdateSchema.validate(body);
    if (error) throw createError(400, 'missing fields');

    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) throw createError(404, 'Not found');

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { body, params } = req;
    const { contactId } = params;

    const { error } = contactFavoriteUpdateSchema.validate(body);
    if (error) throw createError(400, 'missing fields');
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) throw createError(404, 'Not found');
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
