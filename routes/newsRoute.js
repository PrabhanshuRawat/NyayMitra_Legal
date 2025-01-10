const express = require('express')

router =  express.Router()

const {getNews} = require('../Controller/newsRoute')

router.get('/', getNews);


module.exports = router;