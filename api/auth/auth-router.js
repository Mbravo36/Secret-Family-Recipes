const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

const router = require('express').Router();
const { validateUsername, validateData } = require('../middleware/auth-middleware');
const { JWT_SECRET, BCRYPT_ROUNDS } = require('../secrets')

router.post('/register', validateUsername, validateData, async (req, res, next) => {
    let { username, password } = req.body
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
     Users.add({ username, password: hash })
      .then(newUser => {
          res.status(201).json(newUser)
      })
      .catch( err => {
          next(err)
      })
});

router.post('/login', validateData, (req, res, next) => {
    let { username, password } = req.body
        Users.findBy({ username })
         .then(([user]) => {
            if(bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).status.json({
                    message: `Welcome ${user.username}!`,
                    token,
                })
            } else {
                next({ status: 401, message: 'invalid credentials' })
            }
         })
         .catch(next)
});
         function generateToken(user) {
             const payload = {
                 subject: user.id,
                 username: user.username,
             }
             const options = {
                 expiresIn: '1d',
             }
             return jwt.sign(payload, JWT_SECRET, options)
         }

         module.exports = router;