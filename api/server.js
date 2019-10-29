const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./router')(app);
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);