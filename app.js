const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const patientRoutes = require('./server/routes/patientRoutes');
const appointmentRoutes = require('./server/routes/appointmentRoutes');
const connectToMongoDB = require('./server/config/db');

const cors = require("cors");
const app = express();

app.use(express.json());

app.use(bodyParser.json());
connectToMongoDB();
app.use(cors());

app.use('/api/v1/', patientRoutes);
app.use('/api/v1/', appointmentRoutes);

module.exports = app;