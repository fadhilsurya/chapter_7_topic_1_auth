const moment = require('moment')
const helper = require('../../helper/common.helper')
const formatResp = require('../../helper/response.helper')
const { User } = require('../../models/index')

async function login(req, res, next) {
    const resp = formatResp.response
    console.log(`check body ${req.body.username} ${req.body.password}`)

    try {
        const userOne = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!userOne) {
            resp.data = ""
            resp.message = "user cannot be found"
            resp.status = 400
            res.json(resp)
        }

        const checkPass = helper.comparePass(req.body.password, userOne.password)

        if (checkPass) {
            resp.data = "token"
            resp.message = "success"
            resp.status = 200
            res.json(resp)
            return
        } else {
            resp.data = ""
            resp.message = "error password invalid"
            resp.status = 400
            res.json(resp)

        }

    } catch {
        resp.data = ""
        resp.message = "error"
        resp.status = 500
        res.json(resp)
        return
    }

}

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



module.exports = {
    login,
    register
}