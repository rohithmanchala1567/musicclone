
 const songs=[
  {
    title:"kurchimadatha petti",
    src:"../albums/kurchi.mp3",
  },
  {
    title:"mawa enthaina",
    src:"../albums/mawa.mp3"
  },
  {
    title:"sir osthara",
    src:"../albums/sir.mp3"
  },
  {
    title:"dookudu",
    src:"../albums/dookudu.mp3"
  }
 ];
 let aud=new Audio();
let current=-1;
let play1=document.querySelector("#play-pause img");
let prev=document.querySelector("#prev img");
let next=document.querySelector("#next img");
let music=document.querySelectorAll(".c1");
let titlee=document.querySelector("#player-title");
music.forEach(card=>{
   const playbtn=card.querySelector(".play img");
   playbtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    let index=Number(card.dataset.index);
      if(current!=index)
      {
        aud.src=songs[index].src;
        current=index;
        titlee.innerText=songs[index].title;
        aud.play();
        document.querySelectorAll(".play img").forEach(f=>{
           f.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png";
        });

         play1.src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png"
         playbtn.src="https://cdn-icons-png.flaticon.com/128/3669/3669483.png";
      }
      else{
        if(aud.paused)
        {
            aud.play();
             play1.src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png"
             playbtn.src="https://cdn-icons-png.flaticon.com/128/3669/3669483.png";
        }
        else
        {
            aud.pause();
             play1.src="https://cdn-icons-png.flaticon.com/128/483/483054.png";
            playbtn.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png";
        }
      }
      //prev
   });
});
//prev
prev.addEventListener("click",(e)=>{
    
    if (current === -1) current = songs.length - 1;
    else current = (current - 1 + songs.length) % songs.length;

    aud.src = songs[current].src;
    aud.play();
    titlee.innerText = songs[current].title;
    play1.src = "https://cdn-icons-png.flaticon.com/128/2088/2088562.png";
    updateicons();
   });
   //next
next.addEventListener("click",(e)=>{
    if (current === -1) current = 0;
    else current = (current + 1) % songs.length;

    aud.src = songs[current].src;
    aud.play();
    titlee.innerText = songs[current].title;
    play1.src = "https://cdn-icons-png.flaticon.com/128/2088/2088562.png";
    updateicons();
   });
   play1.addEventListener("click",(e)=>{
    if(current===-1)
    {
        current=0;
        aud.src=songs[current].src;
        titlee.innerText=songs[current].title;
         play1.src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png"
        aud.play();
    }
    if(aud.paused)
     {
        aud.play();
         titlee.innerText=songs[current].title;
        play1.src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png"
     }
     else{
        aud.pause();
         titlee.innerText=songs[current].title;
        play1.src="https://cdn-icons-png.flaticon.com/128/483/483054.png";
     }
     updateicons();
   });
   function updateicons(){
    document.querySelectorAll(".play img").forEach((f)=>{
          f.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png";
    });
    if(current>=0)
    {
        if(!aud.paused)
        {
    document.querySelector(`.c1[data-index="${current}"] .play img`).src="https://cdn-icons-png.flaticon.com/128/3669/3669483.png";
        }
    }
   }
   let progress=document.querySelector("#progress");
   let currenttime=document.querySelector("#current-time");
   let durationtime=document.querySelector("#duration");
   aud.addEventListener("timeupdate",f=>{
    if(aud.duration)
    {
      const percent=(aud.currentTime/aud.duration)*100;
      progress.value=percent;
      let cursec=Math.floor(aud.currentTime%60);
      let curmin=Math.floor(aud.currentTime/60);
      let dursec=Math.floor(aud.duration%60);
      let durmin=Math.floor(aud.duration/60);
      currenttime.innerText=`${curmin}:${cursec.toString().padStart(2,'0')}`;
      durationtime.innerText=`${durmin}:${dursec.toString().padStart(2,'0')}`;
    }
   });
   progress.addEventListener("input",f=>{
    if(aud.duration)
    {
    aud.currentTime=(progress.value/100)*aud.duration;
    }
   });
   let volume = document.querySelector("#volume");

volume.addEventListener("input", () => {
    aud.volume = volume.value /100;
});

