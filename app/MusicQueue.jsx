var React = require('react');
var SoundCloud = require('react-soundcloud-widget');

var MusicQueue = React.createClass({
	_onPlay: function() {
		console.log('PLAYING');
	},

	render: function() {
		return (
			<SoundCloud url={'https://soundcloud.com/zedsdead/zeds-dead-twin-shadow-lost-you-feat-dangelo-lacy'} onPlay={this._onPlay} />
		);
	}
});

module.exports = MusicQueue;