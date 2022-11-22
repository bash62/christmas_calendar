let isLoaded = false;

function setItem(name, value) {
  localStorage.setItem(name, value);
}

function getItem(name) {
  return localStorage.getItem('config');
}

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

function displaySnow(quantity) {
  addSnow(quantity * 8);
}

function removeSnow(quantity) {
  const container = document.getElementById('snow-container');
  for (let i = 0; i < quantity; i++) {
    container.lastChild.classList.add('animate-fade-out');
    container.removeChild(container.lastChild);
  }
}

function addSnow(quantity) {
  const container = document.getElementById('snow-container');
  for (let i = 0; i < quantity; i++) {
    const snowDiv = document.createElement('span');
    snowDiv.classList.add('snow');
    snowDiv.classList.add('absolute');
    container.appendChild(snowDiv);
    snowDiv.classList.add('animate-fade-in-long');
  }
}

let t;
function updateSnow(day) {
  clearTimeout(t);
  t = setTimeout(() => {
    const snows = document.querySelectorAll('.snow');
    if (snows.length > day * 8) {
      removeSnow(snows.length - (day * 8));
    } else {
      addSnow((day * 8) - snows.length);
    }
    clearTimeout(t);
  }, 200);
  
}

function giftAnimation(gift, animation, container, day, isToday) {

  let isActived = true;
  let isFirstLoop = false;
  let frameCounter = 0;

  const rewardsContainer = document.querySelector('#rewards-container');
  const rewardsCount = document.querySelectorAll('.reward').length;

  var reward = document.querySelector(`#reward-${day}`);

  if (isToday) {
    reward.style.scale = 1;
  }

  gift.addEventListener('animationend', () => {
    if (isActived) {
      container.classList.add('hidden');
      reward.classList.remove('hidden');
      reward.classList.add('flex')
      reward.classList.add('animate-fade-in');
      reward.style.scale = 1;
      if (reward.classList.contains('video-container')) {
        const btn = reward.querySelector(`#video-button-${day}`);
        //btn.classList.add('hidden');
      }
      /*axios.post(`reedem/${day}`).then((res) => {
        console.log(res);
      })*/
      clickedRewardId = reward.id;
    }
  });

  animation.addEventListener('enterFrame', (e) => {
    if(Math.floor(e.currentTime) == 41 && isActived){
      frameCounter++;
      if(frameCounter == 3){
        frameCounter++;
      };
      if(frameCounter == 4){
        rewardsContainer.classList.remove('hidden');
        rewardsContainer.classList.add('flex');
        rewardsContainer.classList.add('animate-fade-in');

        const buttonContainer = document.getElementById('close-button-container');
        buttonContainer.classList.remove('hidden');

        const containers = document.querySelectorAll(['header', 'footer']);
        containers.forEach(c => {
          c.classList.add('blur-sm');
        });
        gift.classList.add('animate-fade-out');

        isFirstLoop = true;
        animation.stop();
      };
    }
    if (Math.floor(e.currentTime) <= 10 && isActived) {
      animation.setSpeed(0.5);
    } else if (Math.floor(e.currentTime) <= 5 && isActived) {
      animation.setSpeed(0.2);
    }
  });
}