const moment = require('moment')
const helper = require('../../helper/common.helper')
const formatResp = require('../../helper/response.helper')
const { User } = require('../../models/index')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy


function loginPage(req, res) {
    let message = ''

    if (req.session) {
        if (req.session.message) {
            message = req.session.message[0]

            req.session.message = []
        }
    }
    res.json({
        message
    }).status(200)
}

const login = passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/register',
    failureMessage: true,
    session: false
})


function register(req, res, next) {
    const formatDate = moment(req.body.dob).format('YYYY/MM/DD')
    const pass = helper.generatePass(req.body.password)

    const payload = {
        name: req.body.name,
        username: req.body.username,
        password: pass,
        address: req.body.address,
        age: req.body.age,
        email: req.body.email,
        is_active: req.body.is_active,
        date_of_birth: formatDate,
        role: req.body.role,
    }

    console.log(formatDate)

    const resp = formatResp.response
    User.create(payload)
        .then((resp) => {
            resp.data = ""
            resp.message = resp
            resp.status = 200

            res.json(resp)
            return
        })
        .catch((err) => {
            resp.data = ""
            resp.message = err.message
            resp.status = 500
            res.json(resp)
            return
        })
}

function whoami(req, res) {
    console.log({ req })
    formatResp.response.data = req.user.dataValues
    formatResp.response.message = 'success'
    formatResp.response.status = 200

    res.json(formatResp)
    return
}


module.exports = {
    loginPage,
    login,
    register,
    whoami
}