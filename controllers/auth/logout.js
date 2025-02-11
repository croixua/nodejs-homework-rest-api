const { User } = require('../../models/user');

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });
  res.status(204).send();
};

module.exports = logout;
