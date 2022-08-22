const { createError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw createError(404, 'wrong email');
  if (!user.verify) throw createError(401, 'email not verify');
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({
    message: 'verification succses',
  });
};

module.exports = verifyEmail;
