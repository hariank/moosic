var React = require('react/addons');
var ReactApp = require('music-queue');

var mountNode = document.getElementById("react-main-mount");

React.render(new ReactApp({}), mountNode);