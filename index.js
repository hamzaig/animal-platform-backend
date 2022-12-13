const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/database');
const { dbError, winston, error } = require('./middleware/error');
require('express-async-errors');
require('./middleware/logger')();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	exposedHeaders: ['authorization'],
};
app.use(cors(corsOption));
// eslint-disable-next-line func-names, prefer-arrow-callback
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/', require('./routes'));

app.use(dbError);
app.use(winston);
app.use(error);

dbConnection()
	.then(() => {
		app.listen(port, () => console.log(`My App Listeening on port ${port}`));
	})
	.catch((e) => {
		console.log(e);
	});
