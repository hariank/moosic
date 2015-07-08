var socket = io();
var userCount;

function socketHandler() {
	// receive other people's tracks
	socket.on('track', function(track) {
		addTrack(track);
	});

	// manage user count
	socket.on('user count', function(count) {
		userCount = count;

		$('#user-count').text(userCount + " users online");
	});
}

socketHandler();