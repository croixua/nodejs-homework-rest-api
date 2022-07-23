const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const createError = require('../../helpers/createError');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
})
  .min(1)
  .required();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next({ message: 'All contacts not found' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) throw createError(404, 'Not found');

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactAddSchema.validate(body);
    if (error) throw createError(400, error.message);

    const { name, phone, email } = body;
    const result = await contacts.addContact(name, phone, email);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) throw createError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body, params } = req;
    const { contactId } = params;

    const { error } = contactUpdateSchema.validate(body);
    if (error) throw createError(400, 'missing fields');

    const result = await contacts.updateContact(contactId, body);
    if (!result) throw createError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
