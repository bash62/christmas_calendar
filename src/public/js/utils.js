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
  addSnow(quantity * 5);
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
let globalQuantity = 0;
function updateSnow(day) {
  globalQuantity = day;
  clearTimeout(t);
  t = setTimeout(() => {
    const snows = document.querySelectorAll('.snow');
    if (snows.length > day * 5) {
      removeSnow(snows.length - (day * 5));
    } else {
      addSnow((day * 5) - snows.length);
    }
    clearTimeout(t);
  }, 200);
  
}