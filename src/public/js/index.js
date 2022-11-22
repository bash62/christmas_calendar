document.addEventListener('DOMContentLoaded', () => {
  const date = document.getElementById('calendar-date');

  const rewards = document.querySelectorAll('.reward');
  const todayReward = document.querySelector('.today-reward');

  const fullscreenContainer = document.getElementById('fullscreen-photo-container');

  const rewardContainer = document.querySelector('#rewards-container');

  const buttonContainer = document.getElementById('close-button-container');
  const button = document.getElementById('close-button');
  const containers = document.querySelectorAll(['header', 'footer']);

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

  rewardContainer.addEventListener('scroll', (e) => {
    const rewards = document.querySelectorAll('.reward');
      rewards.forEach(reward => {
        const rewardRect = reward.getBoundingClientRect();
        const rewardContainerRect = rewardContainer.getBoundingClientRect();

        if (rewardRect.top >= rewardContainerRect.top && rewardRect.bottom <= rewardContainerRect.bottom) {
          const newDay = reward.id.includes("gift")? +(reward.id.split('-')[2]) : +(reward.id.split('-')[1])
          animate(date, +lastseen, newDay, 2000);
          updateSnow(+(reward.id.split('-')[1]));
          lastseen = newDay;
          clickedRewardId = `reward-${newDay}`;
        }
      })
  }, false)

  button.addEventListener('click', () => {
    console.log(clickedRewardId);
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