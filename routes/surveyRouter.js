// -> Express JS
const express = require('express');

// -> Project
const cors = require('../util/cors');
const { transporter } = require('../util');
const { jsonRESPONSE } = require('../util/responseHelpers');
const { survey_controller } = require('../controllers');

// -> Router
const surveyRouter = express.Router();

surveyRouter
	.route('/')
	.options(cors.cors, (_, res) => res.sendStatus(200))
	.post(cors.cors, async (req, res) => {
		let { error, success } = await survey_controller.create_survey_submission(req.body);
		if (error) return jsonRESPONSE(500, res, error);
		if (success) {
			// IMPLIMENT EMAILING OF FORM HERE
			const { fullName, email } = success.data;
			const emailData = {
				from: email,
				to: 'bryanswebwork@gmail.com',
				subject: `${email} wants to talk about their project!`,
				text: `Write back ${fullName} at ${email}`,
				html: `<h1>New Project</h1>
				<ul>
					${Object.entries(success.data).map((input) => `<li><strong>${input[0]}</strong>: ${input[1]}</li>`)}
				</ul>
				`,
			};

			return transporter.sendMail(emailData, function (err, info) {
				if (err) {
					console.log({ err });
					return jsonRESPONSE(500, res, {
						message: 'there was an error sending the email for the survey',
						error: err,
					});
				}

				return jsonRESPONSE(200, res, { ...success, emailInfo: info });
			});
		}
	});

module.exports = surveyRouter;
