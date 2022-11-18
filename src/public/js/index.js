
var cookie = {
  firstTime: true,
  lastDate: '01',
};

document.addEventListener('DOMContentLoaded', () => {
  if (!getItem("config")) {
    setItem("config", JSON.stringify(cookie));
  } else {
    cookie = JSON.parse(getItem("config"));
  }
});

function setItem(name, value) {
  localStorage.setItem(name, value);
}

function getItem(name) {
  return localStorage.getItem('config');
}

const leftGarlandContainer = document.getElementById('lottie-left');
const rightGarlandContainer = document.getElementById('lottie-right');

const leftGarland = bodymovin.loadAnimation({
  wrapper: leftGarlandContainer,
  animType: 'svg',
  loop: true,
  autoplay: true,
  speed: 0.4,
  path: 'https://assets6.lottiefiles.com/packages/lf20_a1rtrm7c.json',
});

const rightGarland = bodymovin.loadAnimation({
  wrapper: rightGarlandContainer,
  animType: 'svg',
  loop: true,
  autoplay: true,
  speed: 0.4,
  path: 'https://assets6.lottiefiles.com/packages/lf20_a1rtrm7c.json',
});

const lutinContainer = document.getElementById('lottie-lutin');

const lutin = bodymovin.loadAnimation({
  wrapper: lutinContainer,
  animType: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets10.lottiefiles.com/packages/lf20_any3s17u.json',
});


const giftContainer = document.getElementById('lottie-gift');
const rewardsContainer = document.getElementById('rewards-container');
let isActived = false;
let isFirstLoop = false;
let frameCounter = 0;

const gift = bodymovin.loadAnimation({
  wrapper: giftContainer,
  animType: 'svg',
  loop: true,
  autoplay: false,
  path: 'https://assets9.lottiefiles.com/packages/lf20_iqcpihc0.json',
});

gift.addEventListener('DOMLoaded', () => {
  
  gift.playSegments([8, 44], true);
  gift.play();
});

giftContainer.addEventListener('click', () => {
  if (!isActived) {
  
    gift.playSegments([2, 44], true);
    gift.setDirection(-1);
    gift.play();
    isActived = true;
  }
});

giftContainer.addEventListener('animationend', () => {
  if (isActived) {
    giftContainer.style.display = 'none';
    axios.post('redeem').then(res=>{
      console.log(res);
    })
  }
});

gift.addEventListener('enterFrame', (e) => {
  
  if(Math.floor(e.currentTime) == 41 && isActived){
    frameCounter++;
    if(frameCounter == 3){
      frameCounter++;
    };
    if(frameCounter == 4){
      rewardsContainer.classList.remove('hidden');
      rewardsContainer.classList.add('flex');
      giftContainer.classList.add('animate-fade-out');
      rewardsContainer.classList.add('animate-fade-in');
      isFirstLoop = true;
      gift.stop();
    };
  }
  if (Math.floor(e.currentTime) <= 10 && isActived) {
    gift.setSpeed(0.5);
  } else if (Math.floor(e.currentTime) <= 5 && isActived) {
    gift.setSpeed(0.2);
  }
});

function animate(obj, initVal, lastVal, duration) {
  let startTime = null;
  let currentTime = Date.now();

  const step = (currentTime ) => {
    if (!startTime) {
      startTime = currentTime ;
    }
    const progress = Math.min((currentTime - startTime)/ duration, 1);
    obj.innerHTML = (Math.floor(progress * (lastVal - initVal) + initVal)).toString().padStart(2, '0');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };
  window.requestAnimationFrame(step);
}

﻿