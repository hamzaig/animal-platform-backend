const { s3Bucket } = require('../config/aws');

module.exports.uploadBase64S3 = async (base64File, key) => {
	if (typeof base64File !== 'string') {
		return false;
	}
	if (base64File.includes('image')) {
		const buf = Buffer.from(
			base64File.replace(/^data:image\/\w+;base64,/, ''),
			'base64'
		);
		const params = {
			Key: key,
			Body: buf,
			ContentEncoding: 'base64',
			ContentType: 'image/jpeg',
		};
		const upload = await s3Bucket.upload(params).promise();
		return upload.Location;
		// eslint-disable-next-line no-else-return
	} else if (base64File.includes('pdf')) {
		const buf = Buffer.from(
			base64File.replace(/^data:.+;base64,/, ''),
			'base64'
		);
		const params = {
			Key: key,
			Body: buf,
			ContentEncoding: 'base64',
			ContentType: 'application/pdf',
		};
		const upload = await s3Bucket.upload(params).promise();
		return upload.Location;
	} else {
		return false;
	}
};
