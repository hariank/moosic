function addTrack(track) {
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframe = $('.widget:last')[0];
	iframe.width = "100%";
	iframe.frameborder = "no";
	iframe.src = "http://w.soundcloud.com/player/?url=" + track.url;

	var widget = SC.Widget(iframe);
}

function init() {

	var socket = io();

	console.log($('form'));

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

	// var track = {url: "https://soundcloud.com/withlovexavier/drake-medley"};
	// addTrack(track);
	// var track2 = {url: "https://soundcloud.com/speakerofthehouse/derulospeakerremix"};
	// addTrack(track2);
}

init();