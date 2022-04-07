const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets/index')

const Users = require('../users/users-model');

const restricted = (req, res, next) => {
    const token = req.headers.authorization
     if(!token) {
         return next({ status: 401, message: 'token required' })
     }
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) {
                next({ status: 401, message: 'token invalid' })
            } else {
                req.decodedJWT = decodedToken;
                next();
            }
        })
}

const validateUsername = async (req, res, next) => {
    try{
        const users = await Users.findBy({ username: req.body.username })
        if(!users.length) {
            next()
        } else next({ status: 401, message: 'username taken' })
    } catch (error) {
        next(error)
    }
};

const validateData = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).json({ message: 'username and password required' })
    } else {
        next()
    }
};

module.exports = {
    restricted,
    validateUsername,
    validateData
}