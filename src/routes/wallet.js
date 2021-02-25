
const router = require('express-promise-router')();
const Wallet = require('../models/Wallet');
const passport = require('passport');
const {index, charge, pay, consult, confirmPay} = require('../controllers/wallet');
const { isAuthenticated } = require('../helpers/auth');
const mail = require('../controllers/mail');

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
        res.render('/wallet/consult', {wallet})
    });
    
});

router.get('/wallet/confirm-pay', isAuthenticated, async (req, res) =>{
   
        res.render('/wallet/confirm-pay')
  
    
});
router.post('/wallet/confirm-pay', confirmPay);
router.get('/email/', mail.sendEmail);
router.post('/wallet/consult/:id', isAuthenticated, consult);
router.post('/api/wallets/pay', pay);
router.put('/wallets/charge/:id', isAuthenticated, charge);


module.exports = router;