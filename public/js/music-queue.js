var trackCount = 0;
init();

function addTrack(track) {
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframe = $('.widget:last')[0];
	iframe.width = "100%";
	iframe.src = "http://w.soundcloud.com/player/?url=" + track.url;

	var widget = SC.Widget(iframe);

	var autoplay = false;
	if (!trackCount)
		autoplay = true;
	
	widget.load(track.url, {
		auto_play: autoplay
    });

    widget.bind(SC.Widget.Events.FINISH, function() {
    	removeTrack(track, iframe);
    });

    trackCount++;
    console.log(trackCount);
}

function removeTrack(track, iframe) {
	iframe.remove();
	trackCount--;
}

function init() {
	var socket = io();

	//testing
	$('#track-input').val('https://soundcloud.com/withlovexavier/drake-medley');

	$('form', '#add-track').submit(function() {
		var track = {url: $('#track-input').val()};
		console.log(track);
		// addTrack(track);
		socket.emit('track', track);
		// $('#track-input').val('');
		return false;
	});

	socket.on('track', function(track) {
		addTrack(track);
	});
}

