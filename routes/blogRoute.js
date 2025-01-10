const express = require('express');
const router = express.Router();
const { createBlogPost, getAllBlogs, getBlogById } = require('../Controller/blogControl');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', getBlogById); 
router.get('/', getAllBlogs); 
router.post('/', authMiddleware, createBlogPost);

module.exports = router;