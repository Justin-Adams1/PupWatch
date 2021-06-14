const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/auth');

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/user/', user);
app.use('/api/auth/', auth);
app.use('/uploads/', express.static('uploads'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});