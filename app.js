const express = require('express'),
  app = express();
const { PORT } = require('./config/env');
const router = require('./controllers');
var cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(bodyParser.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
