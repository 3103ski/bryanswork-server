require('dotenv').config();
// -->  Express.js
const express = require('express');
const app = express();
const path = require('path');
const { createServer } = require('http');

// -->  Mongoose
const mongoose = require('mongoose');

// --> Project
const { MONGODB } = require('./config');
const { jsonRESPONSE } = require('./util');

// --> App Setup
const PORT = 4400;

const httpServer = createServer(app);

app.use(express.json());
// app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

// app.listen(4400, () => console.log('connected'));

// --> PAGE ROUTES
app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(express.static(path.join(__dirname, 'views/index.html')));
});

// --> API ROUTES

// app.listen(PORT, () => {
// 	console.log(`Bryan's form server is running on ${PORT}`);
// });

// console.log({ MONGODB });

////•••••••••••••••••
// server endpoint error handling
////•••••••••••••••••

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	return jsonRESPONSE(500, res, err);
});

// --> CONNECT MONGO AND RUN SERVER
mongoose
	.connect(MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB :: CONNECTED  ::  Mongoose');
		return httpServer.listen(PORT, () => console.log('connected'));
	});
