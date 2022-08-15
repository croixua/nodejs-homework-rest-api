const { createError } = require('../../helpers');
const { Contact, schemas } = require('../../models/contact');

const updateFavorite = async (req, res, next) => {
  const { body, params, user } = req;
  const { contactId } = params;
  const { _id: userId } = user;
  const { error } = schemas.favoriteUpdate.validate(body);

  if (error) throw createError(400, 'missing fields');

  const result = await Contact.findOneAndUpdate(
    {
      _id: { $eq: contactId },
      owner: { $eq: userId },
    },
    body,
    {
      new: true,
    },
  );

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

module.exports = updateFavorite;
