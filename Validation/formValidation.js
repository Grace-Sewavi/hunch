const Joi = require('joi');

const formValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required.',
  }), 
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),
  message: Joi.string().min(10).required().messages({
    'string.empty': 'Message is required.',
    'string.min': 'Message must be at least 10 characters long.',
  }),
});

module.exports = formValidationSchema;