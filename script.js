   const profileBtn = document.querySelector("#profile-btn");
    const profileBox = document.querySelector(".profile");
   profileBtn.addEventListener("click",()=>{
    profileBox.classList.toggle("show");
   });
   profileBtn.addEventListener("click",(e)=>{
    if(profileBox.contains("e.target")){
    profileBox.classList.remove("show");}
   });

    