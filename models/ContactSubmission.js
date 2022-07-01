const { Schema, model } = require('mongoose');

const contactSubmissionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = model('ContactSubmission', contactSubmissionSchema);
