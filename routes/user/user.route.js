const router = require('express').Router()
const { login, register } = require('../../controller/user/user.controller')

router.post('/login', login)
router.post('/register', register)
module.exports = router