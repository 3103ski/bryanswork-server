const { Schema, model } = require('mongoose');

const surveySubmissionSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		projectName: {
			type: String,
		},
		logo: {
			type: String,
		},
		projectType: {
			type: String,
		},
		updateFrequency: {
			type: String,
		},
		whoUpdatesContent: {
			type: String,
		},
		isSelling: {
			type: String,
		},
		socialMedia: {
			type: String,
		},
		facesWho: {
			type: String,
		},
		payments: {
			type: String,
		},
		userProfiles: {
			type: String,
		},
		artsyRating: {
			type: String,
		},
		photography: {
			type: String,
		},
		shape: {
			type: String,
		},
		logoStyle: {
			type: String,
		},
		logoAppreciation: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = model('SurveySubmission', surveySubmissionSchema);
