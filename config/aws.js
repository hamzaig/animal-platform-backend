const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3Bucket = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	params: {
		Bucket: 'animal-react-rubin',
	},
});

module.exports = { AWS, s3Bucket };
