const Wallet = require('../models/Wallet');

module.exports = {
    index: async (req, res) => {
        await Wallet.find({user: req.user.id}).sort({date: 'desc'})
          .then(wallets => {
            const context = {
                wallets: wallets.map(wallet => {
                    return {
                        user: wallet.user,
                        balance: wallet.balance,
                        status: wallet.status,
                        token: wallet.token,
                        _id: wallet._id
                    }
                    
                })
            }
            console.log(context);
            res.render('Wallet/all-wallets', {wallets: context.wallets }) 
        })
    }
};