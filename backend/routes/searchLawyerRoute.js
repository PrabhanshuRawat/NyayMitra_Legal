const express = require('express')

router =  express.Router()

const {} = require('../Controller/searchLawyerRoute')

router.post('/', getLawyers);

router.post('/document', getLawyerDocument)

module.exports = router;