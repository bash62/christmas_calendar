document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const containers = document.querySelectorAll(['header', 'main', 'footer']);
        const loader_container = document.getElementById('loader-container');
        const snowContainer = document.getElementById('snow-container');
        // const rewardsContainer = document.querySelector('#rewards-container');
        // document.querySelectorAll('.reward').forEach((reward) => {
        //     console.log(reward.clientHeight);
        // });
        // console.log(rewardsContainer, rewardsContainer.clientHeight);
        // console.log(document.querySelectorAll('.reward').length);
        // const step = rewardsContainer.scrollHeight / document.querySelectorAll('.reward').length;
        // console.log(step);
        // rewardsContainer.scrollTo(0, rewardsContainer.clientHeight * (+days));

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
