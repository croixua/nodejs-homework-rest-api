const { createError } = require('../../helpers');
const { Contact, schemas } = require('../../models');

const add = async (req, res, next) => {
  const { body } = req;
  const { error } = schemas.add.validate(body);

  if (error) throw createError(400, error.message);

  const result = await Contact.create(body);

  res.json(result);
};

module.exports = add;
