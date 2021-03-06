const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

app.use(express.json({extented: true}));

//Define URL
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))