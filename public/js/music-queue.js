var trackCount = 0;
init();

function addTrack(track) {
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframe = $('.widget:last')[0];
	iframe.width = "100%";
	iframe.id = trackCount;
	iframe.src = "http://w.soundcloud.com/player/?url=" + track.url;
	console.log(iframe);

	var widget = SC.Widget(iframe);

	var autoplay = false;
	if (!trackCount)
		autoplay = true;
	
	widget.load(track.url, {
		auto_play: autoplay
    });

    widget.bind(SC.Widget.Events.FINISH, function() {
    	if (trackCount > iframe.id) {
    		console.log($('#' + iframe.id).next()[0]);
	    	SC.Widget($('#' + iframe.id).next()[0]).play();
    	}
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

