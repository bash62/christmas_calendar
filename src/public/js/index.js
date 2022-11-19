document.addEventListener('DOMContentLoaded', () => {
  const date = document.getElementById('calendar-date');
  
  if (JSON.parse(getItem("config")).firsTime) {
    animate(date, 1, +days, 2000);
    setItem('config', JSON.stringify({firsTime: false, lastDate: days}));
  } else {
    animate(date, +lastseen, +days, 2000);
    setItem('config', JSON.stringify({firsTime: false, lastDate: days}));
  }

  const rewards = document.querySelectorAll('.reward');
  const todayReward = document.querySelector('.today-reward');

  const fullscreenContainer = document.getElementById('fullscreen-photo-container');

  const rewardContainer = document.querySelector('#rewards-container');

  const buttonContainer = document.getElementById('close-button-container');
  const button = document.getElementById('close-button');
  const containers = document.querySelectorAll(['header', 'footer']);

  let clickedRewardId = todayReward.id;

  rewards.forEach(reward => {
    reward.style.scale = '0.5';
    if (reward.classList.contains('video-container')) {
      const videoBtn = document.querySelector(`#video-button-${reward.id.split('-')[1]}`);
      videoBtn.addEventListener('click', () => {
        videoBtn.classList.add('hidden');
        if (reward.style.scale === '0.5') {
          clickedRewardId = reward.id;
          reward.classList.add('animate-scale-in');
          reward.classList.remove('animate-scale-out');
          reward.classList.add('clicked-reward');
          buttonContainer.classList.remove('hidden');
          containers.forEach(container => {
            container.classList.toggle('blur-sm');
          })
          reward.style.scale = 1;
          isRewardOpen = true;
          rewardContainer.classList.add('overflow-y-hidden');
          rewardContainer.classList.remove('overflow-y-scroll');
        }
      })
    } else {
      reward.addEventListener('click', () => {
        if (reward.style.scale === '0.5') {
          clickedRewardId = reward.id;
          reward.classList.add('animate-scale-in');
          reward.classList.remove('animate-scale-out');
          reward.classList.add('clicked-reward');
          buttonContainer.classList.remove('hidden');
          containers.forEach(container => {
            container.classList.toggle('blur-sm');
          })
          reward.style.scale = 1;
          isRewardOpen = true;
          rewardContainer.classList.add('overflow-y-hidden');
          rewardContainer.classList.remove('overflow-y-scroll');
        }
      })
    }
  })

  rewardContainer.scrollTo(0, rewardContainer.scrollHeight)
  rewardContainer.addEventListener('scroll', (e) => {
    const rewards = document.querySelectorAll('.reward');
      rewards.forEach(reward => {
        const rewardRect = reward.getBoundingClientRect();
        const rewardContainerRect = rewardContainer.getBoundingClientRect();

        if (rewardRect.top >= rewardContainerRect.top && rewardRect.bottom <= rewardContainerRect.bottom) {
          animate(date, +lastseen, +(reward.id.split('-')[1]), 2000);
          updateSnow(+(reward.id.split('-')[1]));
          lastseen = (reward.id.split('-')[1])
        }
      })
  }, false)

  button.addEventListener('click', () => {
    const clickedReward = document.getElementById(`${clickedRewardId}`);
    if (clickedReward.classList.contains('video-container')) {
      const videoBtn = document.querySelector(`#video-button-${clickedReward.id.split('-')[1]}`);
      videoBtn.classList.remove('hidden');
    }

    containers.forEach(container => {
      container.classList.remove('blur-sm');
    });
    buttonContainer.classList.add('hidden');
    clickedReward.classList.add('animate-scale-out');
    clickedReward.classList.remove('animate-scale-in');
    clickedReward.style.scale = 0.5;
    isRewardOpen = false;
    rewardContainer.classList.remove('overflow-y-hidden');
    rewardContainer.classList.add('overflow-y-scroll');
  });

  fullscreenContainer.addEventListener('click', () => {
    fullscreenContainer.classList.add('hidden');
    buttonContainer.classList.remove('hidden');
  });
});