require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(requestLogger);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

const { PORT = 3010, DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_HOST);

app.listen(PORT);
