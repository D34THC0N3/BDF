import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".animated-element", {
    scrollTrigger: {
        trigger: ".animated-element",
        start: "20px 80%",
        end: "+=300%",
        markers: true,
        toggleActions: "restart pause reverse pause"
    },
    x: 400,
    rotation: 360,
    duration: 3
});
