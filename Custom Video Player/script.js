const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timestamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');

function toggleVideoStatus() {
    if(video.paused) {
        video.play()
    } else {
        video.pause();
    }
}
// play and pause video

function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // get minutes

    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10) {
        minutes = '0' + String(minutes);
    }

    // get seconds
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10) {
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${minutes}:${seconds}`;
    console.log(minutes);

}

// set video time to progress

function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// event listeners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);