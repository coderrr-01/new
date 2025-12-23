const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());



app.use('/api', routes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
    console.log("DB URL:", process.env.DATABASE_URL);


});