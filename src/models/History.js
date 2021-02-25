const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model
const HistorySchema = new Schema({
    date: {type: Date, default: Date.now },
    type: {type: String, required:true},
    user: {type: String, required: true},
    wallet: {type: String, required: true},
});

module.exports = mongoose.model('History', HistorySchema);