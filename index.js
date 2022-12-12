const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/database');
const { dbError, winston, error } = require('./middleware/error');
require('express-async-errors');
require('./middleware/logger')();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
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
