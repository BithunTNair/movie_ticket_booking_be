const USERS = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = (req, res) => {

    try {
        const { firstName, lastName, email, password, mobileNumber, } = req.body;
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {

            if (err) {
                console.log('password is not hashed');

            }

            USERS({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                mobileNumber: mobileNumber


            }).save().then((response) => {
                res.status(200).json({ message: 'signup successfull', response })
            }).catch((error) => {
                if (error.code === 11000) {
                    console.log(error);
                    
                    res.status(500).json({ message: 'This email id is already exist' })
                } else {
                    res.status(500).json({ message: 'something went wrong' })
                }

            })
        })


    } catch (error) {

        console.log(error);
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await USERS.findOne({ email: email })

        if (userData) {

            bcrypt.compare(password, userData.password, function (err, result) {

                if (result) {
                    userData.password = undefined
                    const options = {
                        expiresIn: '1d'
                    }
                    const token = jwt.sign({ ...userData }, process.env.SECRETE_KEY, options);
                    res.cookie('token', token)
                    res.status(200).json({ user: userData })
                } else {
                    console.log(err);
                    res.status(401).json({ message: 'Invalid credentials' })
                }

            })

        } else {
            res.status(401).json({ message: 'user not found' })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { signup, signin }