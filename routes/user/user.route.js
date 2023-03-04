const router = require('express').Router()
const { login, register, whoami } = require('../../controller/user/user.controller')
const passport = require('../../lib/passport')
const { restrict } = require('../../middleware/common')

router.use(passport.initialize())
router.use(passport.session())

router.post('/login', login)
router.post('/register', register)
router.get('/homepage', restrict, (req, res) => {
    return res.status(200)

})
router.get('/whoami', restrict, whoami)
module.exports = router