"use strict";

var express = require('./config/express'),
    path = require('path'),
    httpProxy = require('http-proxy');


var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;

var publicPath = path.resolve(__dirname, 'public');

if (!isProduction) {

    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080/'
        });
    });


}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again ... ');
});

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, function() {
    console.log('server running on port ' + port);
});