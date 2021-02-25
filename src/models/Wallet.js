const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Model
const WalletSchema = new Schema({
    user: {type: String, required: true},
    balance:{type: Number, default: 0},
    status: {type: String, default: 'to_be_confirm'},
    token: {type: Number, default: 0},
   
   
});

module.exports = mongoose.model('Wallet', WalletSchema);