const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const removeById = async (req, res, next) => {
  const { params, user } = req;
  const { contactId } = params;
  const { _id: userId } = user;

  const result = await Contact.findOneAndRemove({
    _id: { $eq: contactId },
    owner: { $eq: userId },
  });

  if (!result) throw createError(404, 'Not found');

  res.json({ message: 'contact deleted' });
};

module.exports = removeById;
