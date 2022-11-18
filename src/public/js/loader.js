const loader = document.getElementById('loader');

const animation = bodymovin.loadAnimation({
  wrapper: loader,
  animType: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets7.lottiefiles.com/packages/lf20_s6vm71il.json',
});


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const containers = document.querySelectorAll(['header', 'main', 'footer']);
        const loader_container = document.getElementById('loader-container');
        console.log(containers)
        containers.forEach(container => {
            console.log("container", container);
            container.classList.remove('hidden');
            container.classList.add('animate-fade-in-loader');
        });
        loader_container.classList.add('hidden');
        loader_container.classList.add('animate-fade-out-loader');

    }, Math.random() * 1000 + 2500);
});




