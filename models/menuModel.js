const {
    Schema,
    model
} = require('mongoose')

const menu = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = model('Menus', menu)