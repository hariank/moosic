var trackCount = 0;
var socket = io();
var colorClasses = ["card-panel green", "card-panel amber", "card-panel indigo"];

initQueue();

function addTrack(track) {

	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);

	var iframeEl = $('.widget:last');
	iframeEl.addClass('z-depth-1');
	// iframeEl.wrap('<div class="' + colorClasses[trackCount % colorClasses.length] + '"> </div>');

	var iframe = iframeEl[0];
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
    	removeTrack(track, iframeEl);
    });

    trackCount++;
}

function removeTrack(track, iframeEl) {
	iframeEl.addClass('animated fadeOut');
	iframeEl.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		iframeEl.remove();
		trackCount--;
	});
}

function initQueue() {
	// receive other people's tracks
	socket.on('track', function(track) {
		addTrack(track);
	});
}

