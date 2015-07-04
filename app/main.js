var React = require('react/addons');
var ReactApp = require('./MusicQueue.jsx');

var mountNode = document.getElementById("music-queue");

React.render(new ReactApp({}), mountNode);