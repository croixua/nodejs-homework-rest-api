const { createError } = require('../../helpers');
const { Contact, schemas } = require('../../models');

const updateById = async (req, res, next) => {
  const { body, params } = req;
  const { contactId } = params;
  const { error } = schemas.updateContact.validate(body);

  if (error) throw createError(400, 'missing fields');

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

module.exports = updateById;
