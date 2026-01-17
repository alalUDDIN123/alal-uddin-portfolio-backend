const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    lastname: {
      type: String,
      optional: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      optional: true,
      trim: true,
      match: [/^\d{10,}$/, 'Please enter a valid phone number'],
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  {
    timestamps:false,
    versionKey: false,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
