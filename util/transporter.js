const nodemailer = require('nodemailer');
const { SERVER_EMAIL_ADDRESS, SERVER_EMAIL_PASSWORD } = require('../config');

const transporter = nodemailer.createTransport({
	port: 465,
	host: 'smtp.gmail.com',
	auth: {
		user: SERVER_EMAIL_ADDRESS,
		pass: SERVER_EMAIL_PASSWORD,
	},
	secure: true,
});

module.exports = transporter;
