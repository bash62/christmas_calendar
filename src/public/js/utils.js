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