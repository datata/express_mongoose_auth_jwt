const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;


app.use(morgan('dev'));

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
}); 