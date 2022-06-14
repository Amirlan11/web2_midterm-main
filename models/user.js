var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    GuestNumber: {
        type: String,
        default: ''
    },
    TableType: {
        type: String,
        default: ''
    },
    Placement: {
        type: String,
        default: ''
    },
    Date: {
        type: String,
        default: ''
    },
    time:{
        type: String,
        default: ''
    },

    Note: {
        typr: String,
        default: ''
    },
});
var user = new mongoose.model('User', schema);

module.exports = user;