const Wallet = require('../models/Wallet');
const User = require('../models/User');
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
    },
    charge: async (req, res, next) => {
        const id_wallet = req.params.id;
        const { document, phone, balance} = req.body;
        if(document ==  req.user.document && phone == req.user.phone){  
            const wallet = await Wallet.findById(id_wallet);
            const oldbalance = wallet.balance;
            const newbalance = Number(balance) + Number(oldbalance);
            await Wallet.findByIdAndUpdate(id_wallet, {balance: newbalance});
            req.flash('success_msg', 'Charge Successfully');
            res.redirect("/wallets");
        } else {
            req.flash('error_msg', 'Document or Phone Incorrect');
            res.redirect('/wallets/charge/' + id_wallet);
        }
    }  
};