const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { user, query } = req;
  const { id: owner } = user;
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email');

  res.json(result);
};

module.exports = getAll;
