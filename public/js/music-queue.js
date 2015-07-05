function addTrack(track) {
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframe = $('.widget:last')[0];
	iframe.width = "100%";
	iframe.src = "http://w.soundcloud.com/player/?url=" + track.url;

	var widget = SC.Widget(iframe);
}

function init() {

	console.log($('form'));

	$('form', '#add-track').submit(function() {
		$('#track-input').val('');
		return false;
	});

	var track = {url: "https://soundcloud.com/withlovexavier/drake-medley"};
	addTrack(track);
	var track2 = {url: "https://soundcloud.com/speakerofthehouse/derulospeakerremix"};
	addTrack(track2);
}

init();