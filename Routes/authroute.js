const express = require('express')
const router = express.Router();
const authcontrol = require('../Controller/authcontrol')


router.post('/register', authcontrol.register)

router.post('/login', authcontrol.login)

module.exports = router;