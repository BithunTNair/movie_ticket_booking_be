const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 8
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    role: {
        type: Number,
        default: 2
        // users  3,
        // theatre owners 2,
        // admin 1
    },
    securityCode: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Boolean,
        default: true
    }
});

const owners = mongoose.model('owners', ownerSchema);
module.exports = owners;