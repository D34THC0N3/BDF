gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin); 


import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";

let states = [ toInitState, toFirstState, toLastState, toInvertState, toPlayState, toEndState ],
  stateIndex = 0,
  stateIndexWrap = gsap.utils.wrap(0, states.length),
  stepBlurbs = gsap.utils.toArray('.steps p'),
  card = document.querySelector(".card"),
  windowEl = document.querySelector(".window"),
  finalContainerEl = document.querySelector(".finalContainer");

gsap.defaults({ duration: 0.4, overwrite: 'auto' });

document.querySelector('#prev').addEventListener('click', () => goToState(stateIndex - 1));
document.querySelector('#next').addEventListener('click', () => goToState(stateIndex + 1));

let transition;
function resize() {
  transition && transition.kill();

  // reset (put back in original container and remove any inline styles)
  windowEl.appendChild(animated-element);
  boxEl.style.cssText = "";

  // grab the original state
  const state = Flip.getState(card);

  // put into the new container
  finalContainerEl.appendChild(card);

  // FLIP!
  transition = Flip.from(state, {
    scale: true,
    duration: 1,
    repeat: -1,
    repeatDelay: 1.5,
    ease: "power1.inOut",
    paused: true
  }).progress(1).progress(0); // lock in the starting/ending values.

  if (stateIndex === 2 || stateIndex === 3) {
    transition.progress(1);
  } else if (stateIndex === 4 || stateIndex === 5) {
    transition.play();
  }
}

function goToState(newState) {
  stateIndex = stateIndexWrap(newState);
  states[stateIndex]();
}

function updateBlurb() {
  const textState = Flip.getState(stepBlurbs);

  gsap.set(stepBlurbs, { display: 'none' });
  gsap.set(stepBlurbs[stateIndex], { display: 'block' });

  Flip.from(textState, {
    duration: 0.4,
    absolute: true,
    onLeave: elements => gsap.to(elements, {opacity: 0, duration: 0.3}),
    onEnter: elements => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, duration: 0.3})
  });
}

function toInitState() {
  transition.pause(0);
  gsap.to(card, {opacity: 1});
  gsap.to(".boxPosition", {autoAlpha: 0});
  updateBlurb();
}

function toFirstState() {
  transition.pause(0);
  gsap.to(card, {opacity: 0.5});
  gsap.to(".initialPosition", {autoAlpha: 1});
  gsap.to(".finalPosition", {autoAlpha: 0});
  updateBlurb();
}

function toLastState() {
  gsap.killTweensOf(transition);
  gsap.set(card, {opacity: 1});
  transition.progress(1).pause();
  gsap.to(".finalPosition", {autoAlpha: 1});
  updateBlurb();
}

function toInvertState() {
  transition.tweenFromTo(">", 0, {duration: 1, overwrite: true});
  updateBlurb();
}

function toPlayState() {
  gsap.killTweensOf(transition);
  gsap.to('.boxPosition', { autoAlpha: 1 });
  transition.play();
  updateBlurb();
}

function toEndState() {
  gsap.to(card, { opacity: 1 });
  gsap.to('.boxPosition', { autoAlpha: 1 });
  transition.play();
  updateBlurb();
}

function init() {
  window.addEventListener('resize', resize);
  resize();
}

init();

// document.addEventListener("click", e => {
//   if (e.target.tagName.toLowerCase() === "button") {
//     return;
//   }
//   if (e.pageX < window.innerWidth / 4) {
//     goToState(stateIndex - 1);
//   } else {
//     goToState(stateIndex + 1);
//   }
// });