require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { dataBase, successMessages } = require('./utils/constants');

const { NODE_ENV, DB_ADRESS } = process.env;
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { index } = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : dataBase);
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(cors);

app.use('/', index);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(successMessages.serverIsWork);
});
