const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lawyer', 
        required: true
    },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;