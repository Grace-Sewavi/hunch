const express = require('express');
const { submitForm } = require('../Controllers/formController');

const router = express.Router();


router.post('/form', submitForm);

module.exports = router;