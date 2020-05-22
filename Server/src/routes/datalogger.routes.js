const express = require('express');
const router = express.Router();

var qs = require('querystring');

const { datalogger } = require('../controllers/datalogger.controller.js')
// LOGGER
router.post('/datalogger',datalogger);

module.exports = router;