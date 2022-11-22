document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const containers = document.querySelectorAll(['header', 'main', 'footer']);
        const loader_container = document.getElementById('loader-container');
        const snowContainer = document.getElementById('snow-container');
        const rewardsContainer = document.querySelector('#rewards-container');

        containers.forEach(container => {
            container.classList.remove('hidden');
            container.classList.add('flex');
            container.classList.add('animate-fade-in-loader');
        });
        loader_container.classList.add('hidden');
        loader_container.classList.add('animate-fade-out-loader');

        snowContainer.classList.remove('hidden');

        if (rewardsContainer) {
            rewardsContainer.classList.remove('overflow-y-hidden');
            rewardsContainer.classList.add('overflow-y-scroll');
            const rewardsCount = document.querySelectorAll('.reward').length;
            const step = rewardsContainer.scrollHeight / rewardsCount;
            rewardsContainer.scrollTo(0, step * rewardsCount);
        }
        isLoaded = true;
    }, Math.random() * 1000 + 2500);

});
