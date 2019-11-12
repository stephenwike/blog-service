const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

var cors = function (req, res, next) {
    var whitelist = [
        'http://localhost:4200',
        'http://localhost:3000'
    ];
    var origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors);

require('./router')(app);
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);