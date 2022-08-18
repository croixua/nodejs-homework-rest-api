const bcrypt = require('bcryptjs');

const { User, schemas } = require('../../models/user');
const { createError } = require('../../helpers');

const signup = async (req, res, next) => {
  const { body } = req;
  const { error } = schemas.signup.validate(body);

  if (error) throw createError(400, error.message);

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw createError(409, `${email} in use`);

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
