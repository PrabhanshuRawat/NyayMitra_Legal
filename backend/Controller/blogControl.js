const Blog = require('../models/blog.model');
const Lawyer = require('../models/lawyer.model');


const createBlogPost = async (req, res) => {
    try {
        const { title, content, createdBy } = req.body;

        if (!title || !content || !createdBy) {
            return res.status(400).json({ msg: "Please provide all the necessary details" });
        }

        const newBlog = new Blog({
            title,
            content,
            createdBy: createdBy,
        });

        await newBlog.save();

        res.status(200).json({
            msg: "Blog created successfully",
            blog: newBlog
        });
    } catch (err) {
        console.error("Error during blog creation:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('createdBy', 'lawyername email'); // Populate lawyer details

        res.status(200).json({
            msg: "Blogs fetched successfully",
            blogs,
        });
    } catch (err) {
        console.error("Error fetching blogs:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy', 'lawyername email');

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found." });
        }

        res.status(200).json({
            msg: "Blog fetched successfully",
            blog,
        });
    } catch (err) {
        console.error("Error fetching blog by ID:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogs,
    getBlogById,
};