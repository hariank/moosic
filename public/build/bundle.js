function addTrack(t){var a='<iframe class="widget"> </iframe>';$("#music-queue").append(a);var i=$(".widget:last")[0];i.width="100%",i.id=trackCount,i.src="http://w.soundcloud.com/player/?url="+t.url;var n=SC.Widget(i),r=!1;trackCount||(r=!0),n.load(t.url,{auto_play:r}),n.bind(SC.Widget.Events.FINISH,function(){trackCount>i.id&&SC.Widget($("#"+i.id).next()[0]).play(),removeTrack(t,i)}),trackCount++}function removeTrack(t,a){a.remove(),trackCount--}function initQueue(){socket.on("track",function(t){addTrack(t)})}function initSearch(){SC.initialize({client_id:"270bd50d6557936bcc669766f307dd5f"}),$("form","#add-track").submit(function(t){t.preventDefault();var a=$("#track-input").val();return $("#track-input").val(""),void 0!==a&&a.length?(loadTrack(a),!1):!1})}function loadTrack(t){var a;SC.get("/tracks",{q:t,limit:1},function(t){if(t.length){a=t[0].permalink_url;var i={url:a};console.log(i),socket.emit("track",i)}})}var trackCount=0,socket=io();initQueue(),initSearch();