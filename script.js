console.log("Im running...");
let song_list = document.querySelector('.song-list');
let bg_img = document.querySelector('.bg_img img');
let title = document.querySelector('.title');
let artist = document.querySelector('.artist');
let music = document.querySelector('audio');
let img_container = document.querySelector('.img_container img');
let main_button = document.querySelector('.main_button');
let next = document.querySelector('#next');
let prev = document.querySelector('#prev');

const songs = [
    {
        song_name: "Ranjha",
        artist: "B Prak,Jaslin Royal",
        src: "ranjha-1",
        img: "ranjha-1"
    },
    {
        song_name: "Tui bolbo na tumi",
        artist: " Subhadeep Pan, Nikhita Gandhi ",
        src: "tuibolbo-2",
        img: "Tui-Bolbo-Na-Tumi-2"
    },
    {
        song_name: "Tujhe Kitna",
        artist: "Arijit Singh",
        src: "tujhe-3",
        img: "Tujhe_kitna-3"
    },
    {
        song_name: "Pasoori",
        artist: "Shae Gill, Ali Sethi",
        src: "Pasoori",
        img: "pasoori"
    },
    {
        song_name: "Oboseshe",
        artist: "Arijit Singh",
        src: "oboseshe",
        img: "oboseshe"
    },
    {
        song_name: "Tere Bina",
        artist: "A R Rahman",
        src: "tere bina",
        img: "terebina"
    },
    {
        song_name: "Jab Tak",
        artist: "Armaan Mallik",
        src: "jabtak",
        img: "jabtak"
    },
    {
        song_name: "Woh Din",
        artist: "Arjit Singh",
        src: "wohdin",
        img: "wohdin"
    },


];
let html = "";
songs.forEach((element, index) => {
    html += `
     <li id="${index}" class="song_item" onclick=songFetch(this.id)>
     <div class="sr_num">
         <p>${index + 1}</p>
         <i class="fa-solid fa-play"></i>

     </div>
     <div class="img">
         <img src="img/${element.img}.jpg" alt="" width="100%" height="100%">
     </div>
     <div class="song_info">
         <p class="song_name">
            ${element.song_name}
         </p>
         <p class="singer_name">
             ${element.artist}
         </p>
     </div>
 </li>
     
     
     `;
});
song_list.innerHTML = html;
var index = 0;
// music.play();
setSong(index);
function songFetch(s) {
    setSong(s);
}

function setSong(s) {
    index = s;
    // console.log(songs[index].song_name);
    bg_img.src = `img/${songs[index].img}.jpg`;
    title.textContent = songs[index].song_name;
    artist.textContent = songs[index].artist;
    music.src = `music/${songs[index].src}.mp3`;
    img_container.src = `img/${songs[index].img}.jpg`;
    addPlayButton(index);
    playMusic(music.src);
    if (index != 0) {
        main_button.classList.replace('fa-play', 'fa-pause');

    }

}
function addPlayButton(e) {
    songlist_child = (song_list.children);
    Array.from(songlist_child).forEach((element, index) => {
        if (e == index) {
            song_list.children[e].children[0].classList.add('viewPlay');
            element.style.background = "#eee";
        } else {
            element.children[0].classList.remove('viewPlay');
            element.style.background = "#fff";
        }
        // console.log(element);
    })
}
var isPlaying = false;
function playMusic() {
    music.play();
    isPlaying = true;
    console.log("play");
}
function pauseMusic() {
    music.pause();
    // main_button.classList.replace('fa-pause', 'fa-play');
    isPlaying = false;
    console.log("pause");

}
main_button.addEventListener('click', () => {
    if (isPlaying) {
        main_button.classList.replace('fa-pause', 'fa-play');
    } else {
        main_button.classList.replace('fa-play', 'fa-pause');
    }
    isPlaying ? pauseMusic() : playMusic();
});
function nextSong() {
    console.log(index);
    index = (index + 1) % songs.length;
    setSong(index);
    main_button.classList.replace('fa-play', 'fa-pause');


}
function prevSong() {
    console.log(index);
    index = (index - 1 + songs.length) % songs.length;
    setSong(index);
    main_button.classList.replace('fa-pause', 'fa-play');


}
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

// Progress js
let song_current_time = document.querySelector('#current_time');
let song_duration = document.querySelector('#duration');
console.log(duration);
let progress_div = document.querySelector('.progress_div');
let progress = document.querySelector('.progress');

music.addEventListener('timeupdate', (event) => {
    let duration = event.srcElement.duration;
    let current_time = event.srcElement.currentTime
    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.floor(duration % 60);
    var current_time_min = Math.floor(current_time / 60);
    var current_time_sec = Math.floor(current_time % 60);
    let progress_time = (current_time / duration) * 100;
    progress.style.width = `${progress_time}%`;

    if (current_time_sec < 10) {
        console.log("hii")
        song_current_time.textContent = `${current_time_min}:0${current_time_sec}`;
    } else {
        song_current_time.textContent = `${current_time_min}:${current_time_sec}`;
    }
    if (duration) {
        song_duration.textContent = `${duration_min}:${duration_sec}`;

    }
    song_current_time.textContent = `${current_time_min}:${current_time_sec}`;


});

progress_div.addEventListener('click', (event) => {
    let current_position = (event.offsetX / event.srcElement.clientWidth) * 100;
    progress.style.width = `${Math.floor(current_position)}%`;
    console.log(`${current_position}%`);
    // console.log(event.offsetX);
    // console.log(event.srcElement.clientWidth);

});
music.addEventListener('ended', nextSong);
progress_div.addEventListener('click', (event) => {
    let duration = music.duration;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
});

// sidebar up in mobile
let sidebar = document.querySelector('.side_bar');
let sidebar_btn = document.getElementById('sidebar_btn');
sidebar_btn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
})

//Search song Js
var isopen = true;
let search_input = document.querySelector('.search input');
let search_btn = document.querySelector('#search_btn');
search_btn.addEventListener('click', () => {
    if (search_input.value.trim() == "" && isopen) {
        search_input.style.width = "400px";
        isopen = false;
    } else {
        search_input.style.width = "0px";
        search_input.value = "";
        isopen = true;


    }

});
search_input.addEventListener('input', () => {
    if (search_input.value.trim() != "") {
        sidebar.classList.add('active');
        let searchedSong = search_input.value;
        Array.from(songlist_child).forEach((element) => {
            // console.log(element.children[2].children[0].textContent);
            if (element.children[2].children[0].textContent.includes(searchedSong)) {
                element.style.display = 'flex';
            }
            else {
                element.style.display = 'none';

            }
        });
    } else {
        sidebar.classList.remove('active');
    }
});