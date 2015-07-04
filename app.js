var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require('socket.io')

var app = express();

require("node-jsx").install({
    extension: '.jsx'
});

var io = socket_io();
app.io = io;
var React = require('react/addons');
var ReactApp = React.createFactory(require('./app/MusicQueue.jsx'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    var reactHTML = React.renderToString(ReactApp({}));
    res.render('index', {title: 'Moosik', reactOutput: reactHTML});
});

io.on('connection', function(socket) {
	console.log('user connected');

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
