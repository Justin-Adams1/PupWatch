const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/auth');
const message = require('./routes/message');
const config = require(('./../frontend/src/config.json'))
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config()

const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = config.TWILIO_NUMBER;
const MESSAGING_SERVICE_SID = config.MESSAGING_SERVICE_SID;

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/user/', user);
app.use('/api/auth/', auth);
app.use('/api/message/', message);
app.use('/uploads/', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});