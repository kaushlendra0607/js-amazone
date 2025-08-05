const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
   let tl = gsap.timeline();
    tl.from("#nav",{
        y:"-10",
        ease:Expo.easeInOut,
        opacity:0,
        duration:1.2
    })
    .to(".boundingelem",{
        y:0,
        duration:1.3,
        ease:Expo.easeInOut,
        stagger:.2,
        delay:-1
    })
    .from("#herofooter",{
        y:"-10",
        ease:Expo.easeInOut,
        opacity:0,
        duration:1.5,
        delay:-1
    })
}
let timeout;
function circleChaptaKaro() {
  // define default scale value
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circlemousefollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX-5}px, ${dets.clientY-5}px) scale(1, 1)`;
    }, 100);
  });
}

function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        // console.log(dets.clientX,dets.clientY);
        document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
        
    })
}
// let mouseX = 0, mouseY = 0;
// let currentX = 0, currentY = 0;
// let xprev = 0, yprev = 0;

// let xscale = 1, yscale = 1;

// const minicircle = document.querySelector("#minicircle");

// function updateMinicircle() {
//     // Smooth follow
//     currentX += (mouseX - currentX) * 0.15;
//     currentY += (mouseY - currentY) * 0.15;

//     // Dynamic scaling based on speed
//     const xdiff = mouseX - xprev;
//     const ydiff = mouseY - yprev;
//     xscale = gsap.utils.clamp(0.8, 1.2, 1 + ydiff * 0.01);
//     yscale = gsap.utils.clamp(0.8, 1.2, 1 + xdiff * 0.01);
//     xprev = mouseX;
//     yprev = mouseY;

//     minicircle.style.transform = `translate(${currentX}px, ${currentY}px) scale(${xscale}, ${yscale})`;

//     requestAnimationFrame(updateMinicircle);
// }

// window.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX - 5;
//     mouseY = e.clientY - 5;
// });

// requestAnimationFrame(updateMinicircle);

// function hoverImageEffect() {
//     document.querySelectorAll(".elem").forEach(function(elem) {
//         const image = elem.querySelector("img");
//         if (!image) return;

//         elem.addEventListener("mousemove", function(dets) {
//             image.style.left = `${dets.clientX - elem.getBoundingClientRect().left}px`;
//             image.style.top = `${dets.clientY - elem.getBoundingClientRect().top}px`;

//             gsap.to(image, {
//                 opacity: 1,
//                 ease: "power1.inOut",
//                 duration: 0.3
//             });
//         });

//         elem.addEventListener("mouseleave", function() {
//             gsap.to(image, {
//                 opacity: 0,
//                 ease: "power1.inOut",
//                 duration: 0.3
//             });
//         });
//     });
// }

document.querySelectorAll(".elem").forEach(function(elem){
    let rotat =0;
    let diffrot=0;
    elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),{
        opacity:0,
        ease:Power1,
        delay:.5,
    }) 
    })
    elem.addEventListener("mousemove",function(dets){
    let diff = dets.clientY-elem.getBoundingClientRect().top;
    diffrot=dets.clientX-rotat;
    rotat=dets.clientX;
    gsap.to(elem.querySelector("img"),{
        opacity:1,
        ease:Power3,
        top:diff,
        left:dets.clientX,
        rotate:gsap.utils.clamp(-20,20,diffrot),
    }) 
    })
})

window.addEventListener("load", function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

    firstPageAnim();
    circleChaptaKaro();
    // circlemousefollower();
});