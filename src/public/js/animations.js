document.addEventListener('DOMContentLoaded', () => {
  const leftGarlandContainer = document.getElementById('lottie-left');
  const rightGarlandContainer = document.getElementById('lottie-right');

  bodymovin.loadAnimation({
    wrapper: leftGarlandContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.4,
    path: 'https://assets6.lottiefiles.com/packages/lf20_a1rtrm7c.json',
  });

  bodymovin.loadAnimation({
    wrapper: rightGarlandContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.4,
    path: 'https://assets6.lottiefiles.com/packages/lf20_a1rtrm7c.json',
  });

  const lutinContainer = document.getElementById('lottie-lutin');

  bodymovin.loadAnimation({
    wrapper: lutinContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets10.lottiefiles.com/packages/lf20_any3s17u.json',
  });

  const loader = document.getElementById('loader');

  bodymovin.loadAnimation({
    wrapper: loader,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets7.lottiefiles.com/packages/lf20_s6vm71il.json',
  });
});