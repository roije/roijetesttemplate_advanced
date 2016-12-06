var express = require('express');
var app = express();
var BodyParser = require('body-parser'); // middle

var users = require('./routes/users.js');
var initdb = require('./routes/initdb.js');

// middleware
app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(BodyParser.json());

app.use(users);
app.use(initdb);

app.use(function(req, res) {
    res.status(404);
    res.send({ 'msg': 'Page Not Found' });
})

app.listen(process.env.PORT || 3000);
