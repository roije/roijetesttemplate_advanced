var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = require('../config/config.js').mongodb;
var initUsers = require('../config/usersinit.json');
var initProducts = require('../config/productsinit.json');

// Authorize users
app.use(function (req, res, next) {
    if (req.headers.pass === '1234') {
        next();
    }
    else {
        res.status(401);
        res.json({ 'msg': 'not allowed' });
    }

});

app.use('/initdb', function (req, res) {
    MongoClient.connect(url, function (err, db) {

        var usersCollection = db.collection('users');
        var productsCollection = db.collection('products');

        // Users
        usersCollection.remove({}, function (err, data) {
            usersCollection.insert(initUsers, function (err, data) {
                productsCollection.remove({}, function (err, data) {
                    productsCollection.insert(initUsers, function (err, data) {
                        res.status(201);
                        res.json({ 'msg': 'database initialized' });
                        db.close();
                    });
                });
            });
        });
    });
});

module.exports = app;





















