
$(document).ready(function() {
    // the site has now loaded, grab the video!
    bgAudio = document.getElementById("bgAudio");
    // now tweak the volume!
    bgAudio.volume = 0.2;
    // now, play it!
    bgAudio.play();
});