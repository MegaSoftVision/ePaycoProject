const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Model
const WalletSchema = new Schema({
    user: {type: String, required: true},
    balance:{type: Number, default: 0},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Wallet', WalletSchema);