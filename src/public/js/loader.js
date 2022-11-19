document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const containers = document.querySelectorAll(['header', 'main', 'footer']);
        const loader_container = document.getElementById('loader-container');
        const snowContainer = document.getElementById('snow-container');

        containers.forEach(container => {
            container.classList.remove('hidden');
            container.classList.add('flex');
            container.classList.add('animate-fade-in-loader');
        });
        loader_container.classList.add('hidden');
        loader_container.classList.add('animate-fade-out-loader');
        snowContainer.classList.remove('hidden');
    }, Math.random() * 1000 + 2500);
});
