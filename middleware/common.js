const { response } = require('../helper/response.helper')

function restrict(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('berhasil pass disini')
        return next()
    } else {

        response.data = null
        response.message = 'user not authorized'
        response.status = 400
        res.json(response).status(400)
    }
}

module.exports = {
    restrict
}