document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const containers = document.querySelectorAll(['header', 'main', 'footer']);
        const loader_container = document.getElementById('loader-container');
        const snowContainer = document.getElementById('snow-container');
        const rewardsContainer = document.querySelector('#rewards-container');
        const couponsBtnsContainer = document.querySelector('#coupon-btns-validate');

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

        if (couponsBtnsContainer) {
            couponsBtnsContainer.classList.remove('hidden');
            couponsBtnsContainer.classList.add('flex');
        }

        isLoaded = true;
    }, Math.random() * 1000 + 2500);

});
