const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
  },
}, { timestamps: true });



module.exports = mongoose.model('Form', formSchema);
