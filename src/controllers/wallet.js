const Wallet = require('../models/Wallet');
const User = require('../models/User');
const History = require('../models/History');
var nodemailer = require('nodemailer');

// Definimos la funcion que generara el token de 6 digitos
function token(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
// Definimos el transporter
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tucontraseña',
    }
});


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
    },

    pay: async (req, res, next) => {
        const {id, payment_value, concept} = req.body;
        const wallet = await Wallet.findById(id);
        const user = await User.findById(wallet.user);
        console.log(req.body);
        
        // Verificamos si la wallet existe
        if(wallet){
            // Verificamos si el valor del pago es mayor que 0
            if (Number(payment_value) > 0) {
                // Verificamos si el balance de la cuenta puede pagar el valor
                if(Number(wallet.balance) > Number(payment_value)){
                    
                    // Construimos la Orden
                    const newHistory = await new History({
                        type: "Buy",
                        user: wallet.user,
                        payment_value: payment_value,
                        wallet: wallet._id,
                        token: token(100000, 999999),
                        concept: concept,
                        isActive: false
                    });
                    
                    // Definimos el email
                    var mailOptions = {
                        from: 'yoeldategeek@gmail.com',
                        to: user.email,
                        subject: 'Nueva Orden por Confirmar',
                        text: JSON.stringify(newHistory),
                    };

                    // Enviamos el email
                    transporter.sendMail(mailOptions, function(err, info){
                        if (err){
                            console.log(err);
                            res.send(500, err.message);
                        } else {
                            console.log("email send" + JSON.stringify(mailOptions));
                            res.status(200).jsonp(req.body);
                        }
                    });
                    newHistory.save();
                    res.render('/wallet/confirm_pay', newHistory);
                    
                } else {
                    res.status(400).json('Saldo Insuficiente');
                }
            } else {
                res.status(400).json('El valor no puede ser menor o igual a 0');
            }
        } else {
            res.status(400).json('La wallet no fue encontrada');
        }
       
    },
    confirmPay: async(req, res, next) => {
        const {token, id_history} = req.body;
        const history = await History.findById(id_history);
        const wallet = await Wallet.findById(history.wallet);
        // Verificamos si el token coincide con la Orden
        if(history.token == token){
            // Verificamos si la wallet existe
            if(wallet){
                // Verificamos si el valor del pago es mayor que 0
                if (Number(history.payment_value) > 0) {
                    // Verificamos si el balance de la cuenta puede pagar el valor
                    if(Number(wallet.balance) > Number(payment_value)){
                        const oldBalance = wallet.balance;
                        const newBalance = Number(oldBalance) - Number(history.payment_value);
                        await Wallet.findByIdAndUpdate(id, {balance: newBalance});
                        req.flash('success_msg', 'Payment Success');
                        res.redirect('/wallets/');
                    }
                }
            } 
        } else {
            req.flash('error_msg', 'Token Incorrect')
        }
    },
    consult: async(req, res, next) => {
        const id_wallet = req.params.id;
        const { document, phone } = req.body;
        if (id_wallet) {
            if(document ==  req.user.document && phone == req.user.phone){  
                const wallet = await Wallet.findById(id_wallet);
                console.log(token(999999, 100000));
                req.flash('success_msg', 'Consult Successfully');
                res.render("wallet/show", {wallet});
            } else {
                req.flash('error_msg', 'Document or Phone Incorrect');
                res.redirect('/wallets');
            }
        } else {
            req.flash('error_msg', 'Access Deneged');
                res.redirect('/wallets');
        }
        
    }
    
};
