const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, schemas } = require('../../models/user');
const { createError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { body } = req;
  const { error } = schemas.login.validate(body);

  if (error) throw createError(400, error.message);

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) throw createError(401, 'Email or password is wrong');

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) throw createError(401, 'Password wrong');

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
