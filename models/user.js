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
    Time:{
        type: String,
        default: ''
    },

    Note: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('user', schema);