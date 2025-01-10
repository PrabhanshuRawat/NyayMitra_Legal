const axios = require('axios');

const getNews = async (req, res) => {
    try {

        const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-12-10&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`);


        res.status(200).json({
            msg: "News fetched successfully",
            news: response.data.articles
        });
    } catch (error) {

        console.error("Error fetching news:", error.message);
        res.status(500).json({ msg: "Failed to fetch news, please try again." });
    }
};

module.exports = {
    getNews
};