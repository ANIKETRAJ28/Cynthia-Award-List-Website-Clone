const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let crsr = document.querySelector("#minicircle");

// window.addEventListener("mousemove", function(event){
//     crsr.style.left = event.x+"px";
//     crsr.style.top = event.y+"px";
// });


function mouseshrink(){
    // define default scale value
    let xscale = 1;
    let yscale = 1;

    let prevx = 0;
    let prevy = 0;

    let timeout;
    
    window.addEventListener("mousemove", function(event){
        clearTimeout(timeout);

        let xdiff = event.clientX - prevx;
        let ydiff = event.clientY - prevy;

        prevx = event.clientX;
        prevy = event.clientY;

        // console.log(xdiff, ydiff);

        // gsap.utils.clamp takes three values the first two are the points inwhich we want the 3rd value to be put and the method gsap.utils.clamp rounds off the number to nearest of the two values

        // console.log(gsap.utils.clamp(.8, 1.2, xdiff), gsap.utils.clamp(.8, 1.2, ydiff))

        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        mouseFollower(xscale, yscale);

        timeout = setTimeout(function(){
            crsr.style.transform = `translate(${event.clientX-35}px, ${event.clientY}px) scale(1, 1)`;
            crsr.style.opacity = 0;
        }, 100);
    })
}

window.addEventListener("mouseenter", function(){
    crsr.style.opacity = 1;
})
window.addEventListener("mouseleave", function(){
    crsr.style.opacity = 0;
})

function mouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(event) {
        crsr.style.opacity = 1;
        crsr.style.transform = `translate(${event.clientX-35}px, ${event.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
mouseshrink();

function topdownAnim() {
    let tl = gsap.timeline();

    tl.to("#bottomele", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
    });
    tl.to("#topele", {
        y: 0,
        ease: Expo.easeInOut,
        delay: -1.5,
        duration: 2,
        stagger: 0.2
    })
    tl.from("#fadeele", {
        y: -10,
        opacity: 0,
        delay: -0.4,
        duration: 0.5
    })
}
topdownAnim();

