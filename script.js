const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let scrn = document.querySelector("body");
let crsr = document.querySelector("#minicircle");

scrn.addEventListener("mousemove", function(event){
    crsr.style.left = event.x+"px";
    crsr.style.top = event.y+"px";
});

scrn.addEventListener("mouseenter", function(){
    crsr.style.opacity = 1;
});
scrn.addEventListener("mouseleave", function(){
    crsr.style.opacity = 0;
});