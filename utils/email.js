const { AWS } = require('../config/aws');

const sendEmailAWS = async (ToAddress, html, subject, senderEmail) => {
	const ToAddresses = [ToAddress];
	const params = {
		Destination: {
			ToAddresses,
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: html,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		Source: senderEmail,
		ReplyToAddresses: [senderEmail],
	};
	const response = await new AWS.SES({ apiVersion: '2010-12-01' })
		.sendEmail(params)
		.promise();
	console.log(response);
};

module.exports = { sendEmailAWS };
