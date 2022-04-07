const router = require('express').Router();
const Posts = require('./posts-model')
const { restricted } = require('../middleware/auth-middleware');

router.get('/', restricted, (req, res, next) => {
    Posts.find()
    .then(posts => {
        res.json(posts)
    }).catch(next);
});

router.get('/:post_id', restricted ,(req, res, next) => {
    Posts.findById(req.params.post_id)
    .then(post => {
        res.json(post)
    }).catch(next);
})

router.post('/', restricted ,(req, res, next) => {
    console.log(JSON.stringify(req.decodedJwt))
    Posts.add(req.body, req.decodedJwt.member_id)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(next)
});

router.delete('/:post_id', restricted, (req, res, next) => {
    Posts.remove(req.body)
        .then(newPost => { //eslint-disable-line
            res.status(201).json({message: 'Post was deleted!'})
        })
        .catch(err => {
            next(err)
        })
});

router.put('/:post_id', restricted, (req, res, next) => {
    Posts.edit(req.body)
        .then(editedPost => {
            res.status(201).json(editedPost)
        }) 
        .catch(err => {
            next(err)
        })
});


module.exports = router;