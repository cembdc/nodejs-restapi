const express = require('./express');
const mongoose = require('./mongoose');

express.startServer();
mongoose.startMongo();
