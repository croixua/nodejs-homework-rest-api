const { model, Schema } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const userSignupSchemas = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const userLoginSchemas = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchemas = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  signup: userSignupSchemas,
  login: userLoginSchemas,
  email: userEmailSchemas,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
