const songs = [
  { title: "Chinna Chinna Asai", artist: "A.R. Rahman", src: "songs/chinna_chinna_asai.mp3", img: "songs/chinna_chinna_asai.jpg" },
  { title: "Why This Kolaveri", artist: "Dhanush", src: "songs/why_this_kolaveri.mp3", img: "songs/why_this_kolaveri.jpg" },
  { title: "Munbe Vaa", artist: "Shreya Ghoshal", src: "songs/munbe_vaa.mp3", img: "songs/munbe_vaa.jpg" },
  { title: "Enna Solla", artist: "Shreya Ghoshal", src: "songs/enna_solla.mp3", img: "songs/enna_solla.jpg" },
  { title: "Rowdy Baby", artist: "Dhanush", src: "songs/rowdy_baby.mp3", img: "songs/rowdy_baby.jpg" },
  { title: "Vaathi Coming", artist: "Anirudh", src: "songs/vaathi_coming.mp3", img: "songs/vaathi_coming.jpg" },
  { title: "Kannana Kanne", artist: "Sid Sriram", src: "songs/kannana_kanne.mp3", img: "songs/kannana_kanne.jpg" }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeat = false;

const audio = new Audio();
const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const albumArt = document.getElementById("album-art");
const playlist = document.getElementById("playlist");
const search = document.getElementById("search");
const volumeControl = document.getElementById("volume");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  albumArt.src = song.img;
  audio.src = song.src;
  updateActiveSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  document.getElementById("play").textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  document.getElementById("play").textContent = "▶";
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  alert(isShuffle ? "Shuffle On" : "Shuffle Off");
}

function toggleRepeat() {
  repeat = !repeat;
  audio.loop = repeat;
  alert(repeat ? "Repeat On" : "Repeat Off");
}

function updateActiveSong() {
  [...playlist.children].forEach((li, idx) => {
    li.classList.toggle("active", idx === currentSongIndex);
  });
}

function renderPlaylist(filteredSongs = songs) {
  playlist.innerHTML = "";
  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");

    // Thumbnail
    const img = document.createElement("img");
    img.src = song.img;
    img.classList.add("thumb");

    // Song Info
    const info = document.createElement("div");
    info.classList.add("song-info");

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("song-title");
    titleSpan.textContent = song.title;

    const artistSpan = document.createElement("span");
    artistSpan.classList.add("song-artist");
    artistSpan.textContent = song.artist;

    info.appendChild(titleSpan);
    info.appendChild(artistSpan);

    // Append elements
    li.appendChild(img);
    li.appendChild(info);

    // Click event to play song
    li.addEventListener("click", () => {
      currentSongIndex = songs.indexOf(song);
      loadSong(currentSongIndex);
      playSong();
    });

    playlist.appendChild(li);
  });
  updateActiveSong();
}

// Event Listeners
document.getElementById("prev").addEventListener("click", prevSong);
document.getElementById("play").addEventListener("click", togglePlay);
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("shuffle").addEventListener("click", toggleShuffle);
document.getElementById("repeat").addEventListener("click", toggleRepeat);

search.addEventListener("input", () => {
  const term = search.value.toLowerCase();
  const filtered = songs.filter(song => song.title.toLowerCase().includes(term));
  renderPlaylist(filtered);
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

audio.addEventListener("ended", () => {
  if (!repeat) nextSong();
});

// Init
renderPlaylist();
loadSong(currentSongIndex);
