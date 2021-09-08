const express = require('express');
const mongoose = require('mongoose');
const API = require('./api/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const MongoURL = "mongodb+srv://riverkim:tktls4163*@cluster0.pogsy.mongodb.net/POST?retryWrites=true&w=majority"

const connection = mongoose.connect(MongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log('MongoDB is connected....');
}).catch(err => console.log(err));

app.use(bodyParser.json());

const PORT = 3000;

app.use(cors());

app.use('/api', API);

app.get('/', (req, res) => {
	res.end("Hello world");
})

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	
	return res.json(err);
})

app.listen(PORT, () => {console.log(`Server is running on ${PORT}......`)});