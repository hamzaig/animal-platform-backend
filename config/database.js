require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const dbConnection = async () => {
	try {
		const connected = await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (connected) {
			console.log('Connected to the MongoDb');
			return true;
		}
		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
};

module.exports = dbConnection;
