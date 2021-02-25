
const router = require('express-promise-router')();
const { now } = require('mongoose');
const passport = require('passport');
const {logout, signup} = require('../controllers/user');

router.get('/users/signin', (req, res) =>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/wallets',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});

router.post('/users/signup', signup);

router.get('/users/logout', logout);



module.exports = router;
