console.log("hello");

//inititalise the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems =Array.from(document.getElementsByClassName('songItem'));

let masterSongName = document.getElementById('masterSongName');
let songs =[
    {
        songName:"brown munde", filepath: "songs/1.mp3", coverPath: "covers/1.jpg"
    },
    {
        songName:"Chadeya by Mitraz", filepath: "songs/2.mp3", coverPath: "covers/2.jpg"
    },
    {
        songName:"Palpita by diljeet", filepath: "songs/3.mp3", coverPath: "covers/3.jpg"
    },
    {
        songName:"White brown black ny karan", filepath: "songs/4.mp3", coverPath: "covers/4.jpg"
    }
    
    
    
]


songItems.forEach((element, i)=>{

    element.getElementsByTagName("img")[0].src =  songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})
//audioElement.play();

//Listen to Events
//document.addEventListener('time');

masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }

})

audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    //console.log(progress); 
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
}

)

const makeAllPlays = ()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
{
element.classList.remove('fa-pause-circle');
element.classList.add('fa-play-circle');   

})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
{
    element.addEventListener('click',(e)=>{
      
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex =parseInt(e.target.id)
        audioElement.currentTime=0;
        
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
if(songIndex>=4){
    songIndex=0;
}
else{
    songIndex+=1;
}
audioElement.currentTime=0;
        audioElement.src = `songs/${songIndex}.mp3`;
        
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.currentTime=0;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
    })