const body = document.querySelector('body'),
  slidePrev = document.querySelector('.slide-prev'),
  slideNext = document.querySelector('.slide-next'),
  time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.queryCommandValue('.greeting'),
  name = document.querySelector('.name')
  

function getRandomSlide(max) {
  return Math.floor(Math.random() * max) + 1;
}

const setBg = () => {
  const timeOfDay = getTimeOfDay();
  const bgNum = getRandomSlide(20);

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.toString().padStart(2, '0')}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};

slideNext.addEventListener('click', setBg);
slidePrev.addEventListener('click', setBg);

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const arrTimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const id = Math.floor(hours / 6);
  return arrTimesOfDay[id];
};
setBg();

const showDate = () => {
  const day = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const currentDate = day.toLocaleDateString('en-En', options);
  date.textContent = currentDate;
};

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
};
showTime();
showDate();

const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay}`;
};
showGreeting();

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)