const Form = require('../Models/formModel');
const formValidationSchema = require('../Validation/formValidation');


const submitForm = async (req, res) => {
  try {
    const { error, value } = 
    formValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message,
      });
    }

    const existingForm = await Form.findOne({email:
      value.email});
    if (existingForm){
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists.', 
      });
    }

    const newForm = new Form(value);
    await newForm.save();

    res.status(201).json({ 
      success: true, 
      message: 'Form submitted successfully.', 
      data: newForm 
    });
  } catch (err) {
    console.error('Error submitting form:', err);
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists.' 
      });
    }

   
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.', 
      error: err.message 
    });
  }
};



module.exports = { submitForm };