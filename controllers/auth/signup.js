const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User, schemas } = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');

const signup = async (req, res, next) => {
  const { body } = req;
  const { error } = schemas.signup.validate(body);

  if (error) throw createError(400, error.message);

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw createError(409, `${email} in use`);

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Auth',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}>Click here</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
