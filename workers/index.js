const express = require('express');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workerRoutes');

const app = express();

app.use(express.json());
require('dotenv').config();
const workerString = process.env.INDIVIDUAL_URL ;
mongoose.connect(workerString);


const workerDatabase = mongoose.connection

workerDatabase.on('error', (error) => {
    console.log(error)
})

workerDatabase.once('connected', () => {
    console.log('Database Connected');
})
app.use('/api/worker', workerRoutes)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})