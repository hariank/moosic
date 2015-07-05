var trackCount = 0;
var socket = io();

initQueue();

function addTrack(track) {
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframe = $('.widget:last')[0];
	iframe.width = "100%";
	iframe.id = trackCount;
	iframe.src = "http://w.soundcloud.com/player/?url=" + track.url;

	var widget = SC.Widget(iframe);

	// auto play if queue empty
	var autoplay = false;
	if (!trackCount)
		autoplay = true;
	widget.load(track.url, {
		auto_play: autoplay
    });

	// when track finishes, play next
    widget.bind(SC.Widget.Events.FINISH, function() {
    	if (trackCount > iframe.id) {
	    	SC.Widget($('#' + iframe.id).next()[0]).play();
    	}
    	removeTrack(track, iframe);
    });

    trackCount++;
}

function removeTrack(track, iframe) {
	iframe.remove();
	trackCount--;
}

function initQueue() {

	//testing
	// $('#track-input').val('https://soundcloud.com/withlovexavier/drake-medley');

	// $('form', '#add-track').submit(function() {
	// 	var track = {url: $('#track-input').val()};
	// 	console.log(track);
	// 	socket.emit('track', track);
	// 	$('#track-input').val('');
	// 	return false;
	// });

	// receive other people's tracks
	socket.on('track', function(track) {
		addTrack(track);
	});
}

