const express = require('express')
const router = express.Router()
const path = require('path')


router
    .route('/')
    .get((req, res) => res.render(path.resolve('views/signup.ejs'), {
        title: 'Sign',
        // isAuth: req.cookies.isAuth,
        // isAdmin: req.cookies.isAdmin,
    }))




module.exports = router