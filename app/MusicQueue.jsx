var React = require('react');
var SoundCloud = require('react-soundcloud-widget');

var MusicQueue = React.createClass({
	_onPlay: function() {
		console.log('PLAYING');
	},

	render: function() {
		return (
			<SoundCloud url={'https://soundcloud.com/sylvanesso/coffee'} onPlay={this._onPlay} />
		);
	}
});

module.exports = MusicQueue;