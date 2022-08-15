const { createError } = require('../../helpers');
const { Contact, schemas } = require('../../models/contact');

const add = async (req, res, next) => {
  const { body, user } = req;
  const { error } = schemas.add.validate(body);

  if (error) throw createError(400, error.message);

  const { id: owner } = user;

  const result = await Contact.create({ ...body, owner });

  res.json(result);
};

module.exports = add;
