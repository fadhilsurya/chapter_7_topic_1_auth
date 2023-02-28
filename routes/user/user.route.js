const router = require('express').Router()
const { login } = require('../../controller/user/user.controller')

router.get('/login', login)

module.exports = router