
const router = require('express-promise-router')();
const passport = require('passport');
const {index} = require('../controllers/history');
const { isAuthenticated } = require('../helpers/auth');

router.get('/history', isAuthenticated, index);



module.exports = router;