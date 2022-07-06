const { Schema, model } = require('mongoose');

const tMSContactSubmissionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		org: {
			type: String,
		},
		companySize: {
			type: String,
			required: true,
		},
		services: {
			type: [String],
			required: true,
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = model('TMSContactSubmission', tMSContactSubmissionSchema);
