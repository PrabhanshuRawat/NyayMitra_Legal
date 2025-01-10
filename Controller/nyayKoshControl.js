const axios = require('axios');

const nyayKosh = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ msg: "Please provide a search query" });
        }

        const API_URL = `https://api-inference.huggingface.co/models/karan842/IPC-gemma`;
        const headers = {
            "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}` 
        };

        const response = await axios.post(API_URL, {
            inputs: query
        }, { headers });

        res.status(200).json({
            msg: "Search results fetched successfully",
            response: response.data[0].generated_text
        });
    } catch (err) {
        console.error("Error during AI search:", err.message);
        res.status(500).json({ msg: "Failed to process your query. Please try again." });
    }
};

module.exports = {
    nyayKosh
};