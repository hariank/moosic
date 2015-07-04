var MusicQueue = React.createClass({

	render: function() {
		var tracks = this.props.data.map(function(track) {
			return (
				<Track url={track}> </Track>
			);
		});
		return (
			<div>
				{tracks}
			</div>
		);
	}

});

var Track = React.createClass({

	render: function() {
		return (
			<li> {this.props.url} </li>
		);
	}

});

var data = ["a", "b"];
var mountNode = document.getElementById('music-queue');
React.render(<MusicQueue data={data}/>, mountNode);