let playBtn = document.querySelector(".fa-circle-play")
let seekBar = document.querySelector('input')
let songItem = Array.from(document.querySelectorAll('.song-item'))
let sr = Array.from(document.querySelectorAll('.sr'))
let songName = Array.from(document.querySelectorAll('.song-name'))
let albumName = Array.from(document.querySelectorAll('.album-name'))
let songImg = document.querySelectorAll('.song-img')
let liveImg = document.getElementById('live-img')
let liveSongName = document.getElementById('live-song-name')
let liveAlbumName = document.getElementById('live-album-name')
let backward = document.querySelector('.fa-backward-step')
let forward = document.querySelector('.fa-forward-step')
let currenTtime = document.querySelector('.current-time')
let songLength = document.querySelector('.duration')
let sec;
let min;

let liveSong = "audio/6.mp3";
let audio = new Audio(liveSong)

function handlePlayBtn() {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        playBtn.classList.remove("fa-circle-play")
        playBtn.classList.add("fa-circle-pause")

    } else {
        audio.pause();
        playBtn.classList.remove("fa-circle-pause")
        playBtn.classList.add("fa-circle-play")
    }
}

function updateTimeStamp(timeStamp) {
    sec = Math.floor(timeStamp);
    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
}

function playNextSong(i) {
    audio.addEventListener('ended', () => {
        audio.src = "audio/" + sr[i + 1].innerHTML + ".mp3"
        audio.play();
        liveSongName.innerHTML = songName[i + 1].innerHTML
        liveAlbumName.innerHTML = albumName[i + 1].innerHTML
        liveImg.src = songImg[i + 1].getAttribute('src');
        i++;
    })
}
// repeat current song //

// play or pause song by the bottom play button //
playBtn.addEventListener('click', () => {
    handlePlayBtn();
})

// update seek bar //
audio.addEventListener('timeupdate', () => {
    progress = parseInt((audio.currentTime * 100) / audio.duration);
    seekBar.value = progress;
})

// update time stamp //
audio.addEventListener('timeupdate', () => {
    updateTimeStamp(audio.currentTime);
    currenTtime.innerHTML = min + ":" + sec;
    updateTimeStamp(audio.duration);
    songLength.innerHTML = min + ":" + sec;
})

// change audio duration by seek bar //
seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value * audio.duration / 100;
})

// playing the song by clicking on the song item from the song table //
songItem.forEach((e, i) => {
    e.addEventListener('click', () => {
        playBtn.classList.remove("fa-circle-play")
        playBtn.classList.add("fa-circle-pause")

        audio.src = "audio/" + sr[i].innerHTML + ".mp3"
        audio.play();
        liveSongName.innerHTML = songName[i].innerHTML
        liveAlbumName.innerHTML = albumName[i].innerHTML
        liveImg.src = songImg[i].getAttribute('src');
        playNextSong(i)
    })
    while (backward.addEventListener('click', () => {
        audio.src = "audio/" + sr[i - 1].innerHTML + ".mp3"
        audio.play();
        liveSongName.innerHTML = songName[i - 1].innerHTML
        liveAlbumName.innerHTML = albumName[i - 1].innerHTML
        liveImg.src = songImg[i - 1].getAttribute('src');
        i--;
    })) {
        return;
    }
    while (forward.addEventListener('click', () => {
        audio.src = "audio/" + sr[i + 1].innerHTML + ".mp3"
        audio.play();
        liveSongName.innerHTML = songName[i + 1].innerHTML
        liveAlbumName.innerHTML = albumName[i + 1].innerHTML
        liveImg.src = songImg[i + 1].getAttribute('src');
        i++;
    })) {
        return;
    }
})



