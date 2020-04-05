const express = require('express'),
  app = express();
const { PORT } = require('./config/env');
const router = require('./controllers');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
