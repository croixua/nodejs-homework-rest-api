const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .required();

const contactFavoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  add: contactAddSchema,
  updateContact: contactUpdateSchema,
  favoriteUpdate: contactFavoriteUpdateSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
