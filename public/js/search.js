function initSearch() {
	// soundcloud api
	SC.initialize({
		client_id: "270bd50d6557936bcc669766f307dd5f",
	});

	$('form', '#add-track').submit(function(e) {
		e.preventDefault();

		var query = $('#track-input').val();
		$('#track-input').val('');
		if (query === undefined || !query.length)
			return false;

		loadTrack(query);

		return false;
	});
}

function loadTrack(query) {
	SC.get('/tracks', {q: query, limit: 1}, function(tracks) {
		if (tracks.length) {
			// get first result
			var song = tracks[0].permalink_url;
			var track = {url: song};
			// console.log(track);
			socket.emit('track', track);
		}
		else {
			return;
		}
	});
}

initSearch();