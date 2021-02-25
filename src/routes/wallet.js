
const router = require('express-promise-router')();
const passport = require('passport');
const {index} = require('../controllers/wallet');
const { isAuthenticated } = require('../helpers/auth');

router.get('/wallet', isAuthenticated, index);



module.exports = router;