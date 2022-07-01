const { SurveySubmission } = require('../models');

exports.create_survey_submission = async function (formData) {
	if (!formData) return { error: { msg: 'Missing form data' } };
	// console.log({ formData });
	const newSubmission = await new SurveySubmission(formData);

	return newSubmission
		.save()
		.then((formSubmission) => ({ success: { data: formSubmission._doc, message: 'success', status: 200 } }))
		.catch((serverError) => ({
			error: { message: 'there was an error saving the new survey submission', serverError, status: 500 },
		}));
};
