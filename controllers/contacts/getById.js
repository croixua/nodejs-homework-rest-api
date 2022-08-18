const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getById = async (req, res, next) => {
  const { params, user } = req;
  const { contactId } = params;
  console.log(user);
  const { _id: userId } = user;

  const result = await Contact.find({
    _id: { $eq: contactId },
    owner: { $eq: userId },
  });

  if (!result || !result.length) throw createError(404, 'Not found');

  res.status(201).json(result);
};

module.exports = getById;
