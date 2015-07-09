var trackCount = 0;
var colorClasses = ["card-panel green", "card-panel amber", "card-panel indigo"];

function addTrack(track) {
	// add iframe
	var iframeHTML = '<iframe class="widget"> </iframe>';
	$('#music-queue').append(iframeHTML);
	var iframeEl = $('.widget:last');

	// styling classes
	iframeEl.addClass('z-depth-1');
	iframeEl.addClass('animated fadeInUp');
	// iframeEl.wrap('<div class="' + colorClasses[trackCount % colorClasses.length] + '"> </div>');

	// set song url
	var iframe = iframeEl[0];
	iframe.width = "100%";
	iframe.id = trackCount;
	iframe.src = "https://w.soundcloud.com/player/?url=" + track.url;

	var widget = SC.Widget(iframe);

	// auto play if queue empty
	var autoplay = false;
	if (!trackCount)
		autoplay = true;
	widget.load(track.url, {
		auto_play: autoplay
    });

	// initial volume
	widget.bind(SC.Widget.Events.READY, function() {
		widget.setVolume(0.25);
	});

	// when track finishes, play next
    widget.bind(SC.Widget.Events.FINISH, function() {
    	if (trackCount > iframe.id) {
	    	SC.Widget($('#' + iframe.id).next()[0]).play();
    	}
    	else if (trackCount > 0) {
    		// wraparound in queue
    		SC.Widget($('.widget:first')[0]).play();
    	}
    	removeTrack(track, iframeEl);
    });

    trackCount++;
}

function removeTrack(track, iframeEl) {
	// fade out, then remove
	iframeEl.addClass('animated fadeOut');
	iframeEl.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		iframeEl.remove();
		trackCount--;
	});
}



