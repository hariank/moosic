var React = require('react/addons');
var ReactApp = require('MusicQueue');

var mountNode = document.getElementById("music-queue");

React.render(new ReactApp({}), mountNode);