const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



Marqueeanimation = window.addEventListener("wheel",function(dets){
  if(dets.deltaY>0){
      gsap.to(".marque",{
          transform: 'translateX(-200%)',
          ease:"none",
          duration:3,
          repeat:-1,
         
      })
      gsap.to(".marque img",{
          rotate:180
      })
  }
  else{
      gsap.to(".marque",{
          transform: 'translateX(0%)',
          ease:"none",
          duration:3,
          repeat:-1,
          
      })
      gsap.to(".marque img",{
          rotate:0
      })
  }
  })
  Marqueeanimation();