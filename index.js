const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Auth route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Conncet to the DB
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to DataBase!");
});

// Middleware 
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, () => console.log("Server Up and Running"));