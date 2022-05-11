const express = require('express')
const router = express.Router()
const path = require('path')

const API_URL = "http://api.exchangeratesapi.io/latest"
router
    .route('/')
    .get((req,res) => res.render(path.resolve('views/menu.ejs')))

module.exports = router