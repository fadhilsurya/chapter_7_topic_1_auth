const express = require('express')
const session = require('express-session')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3000
const router = require('./routes/route')
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))


app.use('/', router)

app.listen(port, () => {
    console.log(`running live and well at port ${port}`)
})