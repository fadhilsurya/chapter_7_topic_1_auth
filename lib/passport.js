const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../models/index')
const helper = require('../helper/common.helper')

const authenticate = async (username, password, done) => {
    try {
        const userOne = await User.findOne({
            where: {
                username: username
            }
        })

        if (!userOne) {
            return done(null, false, { message: 'username invalid' })
        }

        const checkPass = helper.comparePass(password, userOne.password)

        if (checkPass) {
            return done(null, true, {})
        } else {
            return done(null, false, { message: 'password incorrect' })
        }

    } catch (err) {
        return done(null, false, { message: err.message })
    }
}


passport.use(new localStrategy({
    usernameField: 'username',
    passwordtField: 'password'
}, authenticate))

// serialize serializeUser
// passport.serializeUser((user, done) => {
//     return done(null, user.id)
// })
passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id)
    console.log({ user })
    return done(null, user)
})

module.exports = passport;