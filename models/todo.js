const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Todo', todoSchema);
