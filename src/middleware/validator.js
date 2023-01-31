const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
  username: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(25).required(),
  role: Joi.string().valid("USER", "VENDOR", "ADMIN"),
});

exports.validateSignUp = validator(signUpSchema);
