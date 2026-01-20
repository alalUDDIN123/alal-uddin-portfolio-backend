const Contact = require('../models/Contact');
const { sendSuccess, sendValidationError, sendError, sendNotFound } = require('../utils/responseHandler');
const { ErrorMessages } = require('../utils/errorHandler');

// const { sendWelcomeEmail, sendAdminNotification } = require('../utils/emailService');

// Create a new contact form submission
const createContact = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    // Validate required fields
    if (!firstname || firstname.trim().length < 2) {
      return sendValidationError(res, 'Validation Error', {
        firstname: ErrorMessages.INVALID_FIRSTNAME,
      });
    }

    if (!email || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return sendValidationError(res, 'Validation Error', {
        email: ErrorMessages.INVALID_EMAIL,
      });
    }

    if (!message || message.trim().length < 5) {
      return sendValidationError(res, 'Validation Error', {
        message: ErrorMessages.INVALID_MESSAGE,
      });
    }

    if (phone && phone.trim().length > 0 && !/^\d{10,}$/.test(phone.trim())) {
      return sendValidationError(res, 'Validation Error', {
        phone: ErrorMessages.INVALID_PHONE,
      });
    }

    // Create new contact
    const contact = new Contact({
      firstname: firstname.trim(),
      lastname: lastname ? lastname.trim() : '',
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
    });

    // Save to database
    await contact.save();

    // Send welcome email to user
    // const emailSent = await sendWelcomeEmail(email.trim(), firstname.trim());
    // console.log('Welcome email sent status:', emailSent);
    
    // Send admin notification
    // await sendAdminNotification({
    //   firstname: firstname.trim(),
    //   lastname: lastname ? lastname.trim() : '',
    //   email: email.trim(),
    //   phone: phone ? phone.trim() : '',
    //   message: message.trim(),
    // });

    // Return success response with email status
    sendSuccess(res, 201, 'Contact form submitted successfully', {
      contact,
      message: "We have received your message and will get back to you shortly.",
    });
  } catch (error) {
    next(error);
  }
};

// Get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    sendSuccess(res, 200, `Retrieved ${contacts.length} contact(s)`, contacts);
  } catch (error) {
    next(error);
  }
};
// Delete all contacts (for testing or admin purposes)
const deleteAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All contacts deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    next(error); // or handle directly
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteAllContacts
};
