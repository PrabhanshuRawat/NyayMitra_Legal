const express = require('express');
const dotenv = require('dotenv'); 

const connectDB = require('./lib/connectDb');

const authRoute = require('./routes/authRoute'); 
// const searchRoute = require('./routes/searchLawyerRoute');
// const chatRoute = require('./routes/chatRoute');
const newsRoute = require('./routes/newsRoute');
const blogRoute = require('./routes/blogRoute');
// const experienceRoute = require('./routes/experienceRoute');
const nyayKoshRoute = require('./routes/nyayKoshRoute')

dotenv.config();
const app = express();

app.use(express.json());

console.log("API Key:", process.env.HUGGING_FACE_API_KEY);

// Routes
app.use("/api/v1/auth", authRoute);
// app.use("/api/search", searchRoute);
// app.use("/api/chat", chatRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/nyaykosh", nyayKoshRoute);
// app.use("/api/experience", experienceRoute);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to NyayMitra");
});

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); 
        console.log("Database Connected");
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Internal Server Error:', err.message);
        process.exit(1); 
    }
};

start();