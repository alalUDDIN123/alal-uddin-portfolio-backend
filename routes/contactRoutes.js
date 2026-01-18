const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts
} = require('../controllers/contactController');

// Create a new contact
router.post('/', createContact);

// Get all contacts
router.get('/', getAllContacts);


module.exports = router;
