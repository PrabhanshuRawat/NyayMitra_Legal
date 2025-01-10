const express = require('express')

const router = express.Router()

const {nyayKosh} = require('../Controller/nyayKoshControl')

router.post('/' , nyayKosh);

module.exports = router;