const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let crsr = document.querySelector("#minicircle");

// window.addEventListener("mousemove", function(event){
//     crsr.style.left = event.x+"px";
//     crsr.style.top = event.y+"px";
// });

function mouseshrink() {
    let timeout;
    let timeoutcrsr;
    // define default scale value
    let xscale = 1;
    let yscale = 1;

    let prevx = 0;
    let prevy = 0;

    window.addEventListener("mousemove", function (event) {
        crsr.style.opacity = 1;
        clearTimeout(timeout);
        clearTimeout(timeoutcrsr);

        xscale = gsap.utils.clamp(.8, 1.2, event.clientX - prevx);
        yscale = gsap.utils.clamp(.8, 1.2, event.clientY - prevy);

        // var xdiff = event.clientX - prevx;
        // var ydiff = event.clientY - prevy;

        prevx = event.clientX;
        prevy = event.clientY;

        // console.log(xdiff, ydiff);

        // gsap.utils.clamp takes three values the first two are the points inwhich we want the 3rd value to be put and the method gsap.utils.clamp rounds off the number to nearest of the two values

        // console.log(gsap.utils.clamp(.8, 1.2, xdiff), gsap.utils.clamp(.8, 1.2, ydiff))

        // xscale = gsap.utils.clamp(.5, 1.5, event.clientX - prevx);
        // yscale = gsap.utils.clamp(.5, 1.5, event.clientY - prevy);

        mouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            crsr.style.transform = `translate(${event.clientX - 33}px, ${event.clientY}px) scale(1, 1)`;
        }, 100);
        // timeoutcrsr = setTimeout(function () {
        //     crsr.style.opacity = 0;
        // }, 200);
    });
}

function mouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (event) {
        // crsr.style.opacity = 1;
        crsr.style.transform = `translate(${event.clientX - 33}px, ${event.clientY}px) scale(${xscale}, ${yscale})`;
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

// making profile section pointer with image floating with it

// steps:
// 1 select all the elements of the profile section with querryselectorall
// 2 then traverse through for each loop and for every element find the y co-ordinate of it
// 2 subtract the cursor y  co-ordinates from the element y-co-ordinate
// put the rotaton

let ele = document.querySelectorAll(".profilesecText");

// running loop
ele.forEach(function (element) {
    let xDiff = 0;
    let xRotate = 0;

    element.addEventListener("mouseenter", function () {
    })
    element.addEventListener("mouseleave", function () {
        gsap.to(element.querySelector("img"), {
            opacity: 0,
        });
    })
    element.addEventListener("mousemove", function (e) {

        // getBoundingClientRect() is method and getBoundingClientRect().top  gives the position of the y co-ordinate seclected element
        let diffTop = e.clientY - element.getBoundingClientRect().top;
        // let diffBottom = e.clientY - element.getBoundingClientRect().bottom;
        xRotate = e.clientX - xDiff;
        xDiff = e.clientX;

        gsap.to(element.querySelector("img"), {
            opacity: 1,
            top: diffTop - 10,
            left: e.clientX,
            rotate: gsap.utils.clamp(-20, 20, xRotate),
        });
    })

});