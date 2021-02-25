const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/',  isAuthenticated, async(req, res)  => {
    res.render('index');
});
router.post('/',  isAuthenticated, async(req, res)  => {
    
    res.render('index');
});



module.exports = router;