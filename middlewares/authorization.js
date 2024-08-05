const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token);
        jwt.verify(token, process.env.SECRETE_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (!err && decodedToken && decodedToken._doc.role === 1) {
                req.userId = decodedToken._doc._id
                req.userRole = decodedToken._doc.role
                next()
            } else {
                res.status(401).json({ message: 'unauthorized admin' })
            }

        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token);
        jwt.verify(token, process.env.SECRETE_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (decodedToken || !err) {
                req.userId = decodedToken._doc._id
                req.userRole = decodedToken._doc._role
                next()
            }else{
                res.status(401).json({ message: 'unauthorized user' })
            }
           
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { adminAuth, userAuth }