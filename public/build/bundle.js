function socketHandler(){socket.on("track",function(t){addTrack(t)}),socket.on("user count",function(t){userCount=t,$("#user-count").text(1==userCount?userCount+" user online":userCount+" users online")})}function addTrack(t){var n='<iframe class="widget"> </iframe>';$("#music-queue").append(n);var a=$(".widget:last");a.addClass("z-depth-1"),a.addClass("animated fadeInUp");var e=a[0];e.width="100%",e.id=trackCount,e.src="https://w.soundcloud.com/player/?url="+t.url;var i=SC.Widget(e),r=!1;trackCount||(r=!0),i.load(t.url,{auto_play:r}),i.bind(SC.Widget.Events.READY,function(){i.setVolume(.25)}),i.bind(SC.Widget.Events.FINISH,function(){trackCount>e.id?SC.Widget($("#"+e.id).next()[0]).play():trackCount>0&&SC.Widget($(".widget:first")[0]).play(),removeTrack(t,a)}),trackCount++}function removeTrack(t,n){n.addClass("animated fadeOut"),n.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){n.remove(),trackCount--})}function initSearch(){SC.initialize({client_id:"270bd50d6557936bcc669766f307dd5f"});var t;$("form","#add-track").submit(function(n){n.preventDefault();var a=$("#track-input").val();return $("#track-input").val(""),void 0!==a&&a.length?(clearTimeout(t),t=setTimeout(function(){loadTrack(a)},100),!1):!1})}function loadTrack(t){SC.get("/tracks",{q:t,limit:1},function(t){if(t.length){var n=t[0].permalink_url,a={url:n};socket.emit("track",a)}})}var socket=io(),userCount;socketHandler();var trackCount=0,colorClasses=["card-panel green","card-panel amber","card-panel indigo"];initSearch();