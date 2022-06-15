const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URI;


mongoose
	.connect(mongoUrl)
	.then(() => console.log('connected to MongoDB'));


app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);


module.exports = app;