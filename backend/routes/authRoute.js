const express  = require('express')

const router = express.Router()

const {getUserSignUp, getUserLogin, getLawyerSignUp, getLawyerLogin, getLogout} = require('../Controller/authControl')

router.post('/user/login', getUserLogin);

router.post('/user/signup', getUserSignUp);

router.get('/user/logout', getLogout);

router.post('/lawyer/login', getLawyerLogin);

router.post('/lawyer/signup', getLawyerSignUp);

router.get('/lawyer/logout', getLogout);

module.exports = router