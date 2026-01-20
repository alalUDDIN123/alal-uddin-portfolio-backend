const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  deleteAllContacts
} = require('../controllers/contactController');

// Create a new contact
router.post('/', createContact);

// Get all contacts
router.get('/', getAllContacts);
router.get('/deleteAll', deleteAllContacts);



module.exports = router;
