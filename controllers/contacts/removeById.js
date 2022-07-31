const { createError } = require('../../helpers');
const { Contact } = require('../../models');

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw createError(404, 'Not found');

  res.json({ message: 'contact deleted' });
};

module.exports = removeById;
