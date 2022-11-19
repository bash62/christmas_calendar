document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('snow-container');
  for (let i = 0; i < +days * 5; i++) {
    const snowDiv = document.createElement('span');
    snowDiv.classList.add('snow');
    snowDiv.classList.add('absolute');
    container.appendChild(snowDiv);
  }
});