const User = require('../models/User');
const Wallet = require('../models/Wallet');

module.exports = {

    signup: async (req, res) =>{
        const { document, full_name, phone, email, password, confirm_password } = req.body;
        console.log(req.body);
        const errors = [];

        
        if(full_name.length <= 0){
            errors.push({text: 'Please Insert your full name'});
        }
        if(document.length <= 0){
            errors.push({text: 'Please Insert your document'});
        }
        if(phone.length <= 0){
            errors.push({text: 'Please Insert your phone'});
        }
        if(email.length <= 0){
            errors.push({text: 'Please Insert your email'});
        }
        if(password.length <= 0){
            errors.push({text: 'Please Insert your password'});
        }
        if(confirm_password.length <= 0){
            errors.push({text: 'Please Insert your confirm password'});
        }
        if(password != confirm_password){
            errors.push({text: 'Password do not match'});
        }
        if (password.length < 4){
            errors.push({text: 'Password must be at least 4 characters'});
        }
        if(errors.length > 0){
            res.render('users/signup', {errors, document, full_name, email,phone, password});
        } else{
            const emailUser = await User.findOne({email: email});
            if(emailUser){
                req.flash('error_msg', 'The Email is already in use')
                res.redirect('/users/signup')
            }
            const newUser = new User({document, full_name, phone, email, password});
            newUser.password = await newUser.encryptPassword(password);
            
            const newWallet = new Wallet({user : newUser.id});
            await newWallet.save();
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    },
    logout: (req, res) =>{
        req.logout();
        res.redirect('/');
    },


};