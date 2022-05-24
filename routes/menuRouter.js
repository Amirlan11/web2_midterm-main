const express = require('express')
const router = express.Router()
const menuModel = require('../models/menuModel')
const path = require('path')

router
    .route('/')
    .get(async (req, res) => {
        const menu = await menuModel.find()
        res.render(path.resolve('views/menu.ejs'), {
            activePage: 'menu',
            menu: menu,
        })
    })

module.exports = router