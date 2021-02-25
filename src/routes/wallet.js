
const router = require('express-promise-router')();
const Wallet = require('../models/Wallet');
const passport = require('passport');
const {index, charge} = require('../controllers/wallet');
const { isAuthenticated } = require('../helpers/auth');

router.get('/wallets', isAuthenticated, index);

router.get('/wallets/charge/:id', isAuthenticated, async (req, res) =>{
    await Wallet.findById(req.params.id)
    .then(wallet => {
        res.render('wallet/charge', {wallet})
    });
    
});
router.put('/wallets/charge/:id', isAuthenticated, charge);


module.exports = router;