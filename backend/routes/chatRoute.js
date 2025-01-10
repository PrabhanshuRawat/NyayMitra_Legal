const express = require('express')

router =  express.Router()

const {} = require('../Controller/chatControl')

router.get('/:userId', getChat);

router.post('/chat', sendMessage)

module.exports = router;