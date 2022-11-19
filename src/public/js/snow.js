const body = document.querySelector('body');

for (let i = 0; i < 100; i++) {
    const snowDiv = document.createElement('span');
    snowDiv.classList.add('snow');
    snowDiv.classList.add('absolute');
    body.appendChild(snowDiv);
}