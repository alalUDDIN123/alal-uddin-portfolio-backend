const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require('../controllers/contactController');

// Create a new contact
router.post('/', createContact);

// Get all contacts
router.get('/', getAllContacts);

// Get contact by ID
router.get('/:id', getContactById);

// Delete contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
