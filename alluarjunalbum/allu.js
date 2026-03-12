
 const songs=[
  {
    title:"Samajavaragamana",
    src:"../albums/Samajavaragamana.mp3",
  },
  {
    title:"Sittharala Sirapadu",
    src:"../albums/Sittharala Sirapadu.mp3"
  },
  {
    title:"Buttabomma",
    src:"../albums/Buttabomma.mp3"
  },
  {
    title:"OMG Daddy",
    src:"../albums/OMG Daddy.mp3"
  }
 ];


//playmusic
function playmusic(){
     if(aud.paused)
     {
        aud.play();
     }
     else{
        aud.pause();
     }
     updateicons();
}


//update iconss
function updateicons(){
    document.querySelectorAll(".play img").forEach(c=>{
      c.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png";
    });
let titlee=document.querySelector("#player-title");
    titlee.innerText=songs[current].title;
    if(current>=0){
        const active=document.querySelector(`.c1[data-index="${current}"] .play img`);
        const pl=document.querySelector("#play-pause img");
        if (!active) return;
        if(!aud.paused){
        active.src="https://cdn-icons-png.flaticon.com/128/3669/3669483.png";
        pl.src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png";
        }
        else{
        active.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png";
         pl.src="https://cdn-icons-png.flaticon.com/128/483/483054.png";
        }
    }
}


let card=document.querySelectorAll(".c1");
const aud=new Audio();
let current=-1;
card.forEach(card=>{
    let playbtn=card.querySelector(".play img");
    playbtn.addEventListener("click",(e)=>{
        let index=Number(card.dataset.index);
        if(current!=index)
        {
            current=index;
            aud.src=songs[current].src;
            aud.play();
            updateicons();
        }
        else{
            playmusic();
        }
    });
});
 let play1=document.querySelector("#play-pause img");
 let next=document.querySelector("#next");
 let prev=document.querySelector("#prev");
 play1.addEventListener("click",f=>{
    if(current===-1)
    {
        current=0;
        aud.src=songs[current].src;
    }
    playmusic(); 
 });
 
 //next
 next.addEventListener("click",f=>{
      if(current==-1)
      {
        current=0;
      }
      else 
      {
        current=(current+1)%songs.length;
      }
      aud.src=songs[current].src;
      aud.play();
    updateicons();
 });
 
 //prev
 prev.addEventListener("click",f=>{
      if(current==-1)
      {
        current=songs.length-1;
      }
      else 
      {
        current=(current-1)%songs.length;
      }
      aud.src=songs[current].src;
      aud.play();
      updateicons();
 });

 //progress
 let progress=document.querySelector("#progress");
 let currenttime=document.querySelector("#current-time");
 let durationtime=document.querySelector("#duration");
 aud.addEventListener("timeupdate",f=>{
    if(aud.duration)
    {
      const percent=(aud.currentTime/aud.duration)*100;
      progress.value=percent;
      let currmin=Math.floor(aud.currentTime/60);
      let currsec=Math.floor(aud.currentTime%60);
      let durmin=Math.floor(aud.duration/60);
      let dursec=Math.floor(aud.duration%60);
      currenttime.innerText=`${currmin}:${currsec.toString().padStart(2,'0')}`;
      durationtime.innerText=`${durmin}:${dursec.toString().padStart(2,'0')}`;
    }
 });
 progress.addEventListener("input",()=>{
    if(aud.duration){
   aud.currentTime=(progress.value/100)*aud.duration;
    } 
});
 let volume=document.querySelector("#volume")
 volume.addEventListener("input",f=>{
    aud.volume=volume.value/100;
 });