document.addEventListener('DOMContentLoaded', () => {
  if (!isRedeemed) {
    const gift = document.getElementById('lottie-gift');
    const giftContainer = document.getElementById('gift-container');
    const rewardsContainer = document.getElementById('rewards-container');
    const todayReward = document.querySelector('.today-reward');
  
    let isActived = false;
    let isFirstLoop = false;
    let frameCounter = 0;
  
    const giftAnimation = bodymovin.loadAnimation({
      wrapper: gift,
      animType: 'svg',
      loop: true,
      autoplay: false,
      path: 'https://assets9.lottiefiles.com/packages/lf20_iqcpihc0.json',
    });
  
    giftAnimation.addEventListener('DOMLoaded', () => {
      giftAnimation.playSegments([8, 44], true);
      giftAnimation.play();
    });
  
    gift.addEventListener('click', () => {
      if (!isActived) {
        giftAnimation.playSegments([2, 44], true);
        giftAnimation.setDirection(-1);
        giftAnimation.play();
        isActived = true;
      }
    });
  
    gift.addEventListener('animationend', () => {
      if (isActived) {
        console.log('animationend');
        giftContainer.classList.add('hidden');
        axios.post(`reedem`).then((res) => {
          console.log(res);
        })
      }
    });
  
    giftAnimation.addEventListener('enterFrame', (e) => {
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
          containers.forEach(container => {
            container.classList.add('blur-sm');
          });
          gift.classList.add('animate-fade-out');
          
          const step = rewardsContainer.scrollHeight / document.querySelectorAll('.reward').length;
          rewardsContainer.scrollTo(0, step * (+days));
          rewardsContainer.classList.add('overflow-y-hidden');
          rewardsContainer.classList.remove('overflow-y-scroll');
  
          todayReward.classList.add('animate-scale-in');
          todayReward.style.scale = 1;
  
          isFirstLoop = true;
          giftAnimation.stop();
        };
      }
      if (Math.floor(e.currentTime) <= 10 && isActived) {
        giftAnimation.setSpeed(0.5);
      } else if (Math.floor(e.currentTime) <= 5 && isActived) {
        giftAnimation.setSpeed(0.2);
      }
    });
  }
});