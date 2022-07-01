const { ContactSubmission } = require('../models');

exports.add_contact_submission = async function (formData) {
	if (!formData) return { error: { msg: 'Missing form data' } };
	// console.log('heard it in the controller');
	console.log({ formData });
	const newSubmission = await new ContactSubmission(formData);

	return newSubmission
		.save()
		.then((formSubmission) => ({ success: { data: formSubmission._doc, message: 'success', status: 200 } }))
		.catch((serverError) => ({
			error: { message: 'there was an error saving the new submission', serverError, status: 500 },
		}));
};
