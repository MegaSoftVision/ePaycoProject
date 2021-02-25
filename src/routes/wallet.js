
const router = require('express-promise-router')();
const Wallet = require('../models/Wallet');
const passport = require('passport');
const {index, charge, pay, consult} = require('../controllers/wallet');
const { isAuthenticated } = require('../helpers/auth');

router.get('/wallets', isAuthenticated, index);

router.get('/wallets/charge/:id', isAuthenticated, async (req, res) =>{
    await Wallet.findById(req.params.id)
    .then(wallet => {
        res.render('wallet/charge', {wallet})
    });
    
});
router.get('/wallet/consult/:id', isAuthenticated, async (req, res) =>{
    await Wallet.findById(req.params.id)
    .then(wallet => {
        res.render('wallet/consult', {wallet})
    });
    
});

router.post('/wallet/consult/:id', isAuthenticated, consult);
router.post('/api/wallets/pay', pay);
router.put('/wallets/charge/:id', isAuthenticated, charge);


module.exports = router;