const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const { mongoose } = require('./config/database');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

let corsOptions = {//CONFIGURO OPCIONES DE CORS
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/api', require('./routes/user.routes'));

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
}); 