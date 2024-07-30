const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token);
        jwt.verify(token, process.env.SECRETE_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (decodedToken && decodedToken._doc.role===1 ) {
                req.userId = decodedToken._doc._id
            }
            next()
        })
       
    } catch (error) {
        console.log(error);
    }
}

module.exports = { adminAuth }