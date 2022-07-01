// -> Express JS
const express = require('express');

// -> Project
const cors = require('../util/cors');
const { transporter } = require('../util');
const { jsonRESPONSE } = require('../util/responseHelpers');
const { contact_controller } = require('../controllers');

// -> Router
const contactRouter = express.Router();

contactRouter
	.route('/')
	.options(cors.cors, (_, res) => res.sendStatus(200))
	.post(cors.cors, async (req, res) => {
		let { error, success } = await contact_controller.add_contact_submission(req.body);
		if (error) return jsonRESPONSE(500, res, error);
		if (success) {
			// IMPLIMENT EMAILING OF FORM HERE
			const { name, email } = success.data;
			const emailData = {
				from: email,
				to: 'bryanswebwork@gmail.com',
				subject: `${email} has a question about internet stuff!`,
				text: `Write back ${name} at ${email}`,
				html: `<h1>This worked!</h1>
						<p>Now email back ${name} at ${email}</p>`,
			};

			return transporter.sendMail(emailData, function (err, info) {
				if (err) {
					console.log({ err });
					return jsonRESPONSE(500, res, { message: 'there was an error sending the email', error: err });
				}

				return jsonRESPONSE(200, res, { ...success, emailInfo: info });
			});
		}
	});

module.exports = contactRouter;
