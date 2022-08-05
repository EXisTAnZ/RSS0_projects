const slidePrev = document.querySelector('.slide-prev'),
    slideNext = document.querySelector('.slide-next');

function getRandomSlide(max) {
    return Math.floor(Math.random() * max) + 1;
}

const setBg = () => {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomSlide(20);
  
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/tree/assets/images/${timeOfDay}/${bgNum.toString().padStart(2, '0')}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  };

slideNext.addEventListener('click', setBg);
slidePrev.addEventListener('click', setBg);