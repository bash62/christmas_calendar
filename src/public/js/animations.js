document.addEventListener('DOMContentLoaded', () => {
  const leftGarlandContainer = document.getElementById('lottie-left');
  const rightGarlandContainer = document.getElementById('lottie-right');

  bodymovin.loadAnimation({
    wrapper: leftGarlandContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.4,
    path: '/lottie-files/leftGarland.json',
  });

  bodymovin.loadAnimation({
    wrapper: rightGarlandContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.4,
    path: '/lottie-files/rightGarland.json',
  });

  const lutinContainer = document.getElementById('lottie-lutin');

  bodymovin.loadAnimation({
    wrapper: lutinContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: '/lottie-files/lutin.json',
  });

  const loader = document.getElementById('loader');

  bodymovin.loadAnimation({
    wrapper: loader,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: '/lottie-files/loader.json',
  });
});