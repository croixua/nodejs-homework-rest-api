const { createError, sendEmail } = require('../../helpers');
const { User, schemas } = require('../../models/user');

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const { error } = schemas.email.validate(email);

  if (error) throw createError(400, error.message);

  const user = await User.findOne({ email });
  if (!user) throw createError(404);
  if (user.verify) throw createError(400, 'verification has already passed');
  const mail = {
    to: email,
    subject: 'Auth',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}>Click here</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: 'verification email sent',
  });
};

module.exports = resendVerifyEmail;
