const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// song titles //
const songs = ['hey', 'summer', 'ukulele'];

// keep track of song //

let songIndex = 1;

// initially load song details into DOM //

loadSong(songs[songIndex]);

// play song //

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// pause song //

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

// prev song 

function prevSong() {
  songIndex-- ;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++ ;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}


// time update function

function updateProgress(e) {
  const { duration, currentTime} = e.srcElement;

  progressPercent = ((currentTime/ duration) * 100).toFixed(2);

  progress.style.width = `${progressPercent}%`;

}

// set progress bar //

function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// update song details //
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

// change song listenre 

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// time/song update listener

audio.addEventListener('timeupdate', updateProgress);

// click on progress bar 

progressContainer.addEventListener('click', setProgress);

// song ends, take audio and play next song //

audio.addEventListener('ended', nextSong);