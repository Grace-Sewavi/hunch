const Form = require('../Models/formModel');
const formValidationSchema = require('../Validation/formValidation');


const submitForm = async (req, res) => {
  try {
    const { error, value } = formValidationSchema.validate(req.body, { 
        abortEarly: false });
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed.', 
        errors: error.details.map(detail => detail.message) 
      });
    }


    const newForm = await Form.create(value);

    res.status(201).json({ 
      success: true, 
      message: 'Form submitted successfully.', 
      data: newForm 
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists. Please use a different email.' 
      });
    }

    console.error('Error submitting form:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.', 
      error: err.message 
    });
  }
};



module.exports = { submitForm };