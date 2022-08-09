import playList from './playList.js';

const body = document.querySelector('body'),
  slidePrev = document.querySelector('.slide-prev'),
  slideNext = document.querySelector('.slide-next'),
  time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  wind = document.querySelector('.wind'),
  humidity = document.querySelector('.humidity'),
  quote = document.querySelector('.quote'),
  author = document.querySelector('.author'),
  changeQuote = document.querySelector('.change-quote'),
  playListContainer = document.querySelector('.play-list'),
  playSong2 = document.querySelectorAll('.play-song'),
  playButton = document.querySelector('.play')
  
// randomizer
function getRandomNum(max) {
  return Math.floor(Math.random() * max) + 1;
}

// bg slider
const setBg = () => {
  const timeOfDay = getTimeOfDay();
  const bgNum = getRandomNum(20);

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.toString().padStart(2, '0')}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};

slideNext.addEventListener('click', setBg);
slidePrev.addEventListener('click', setBg);

// time of the day
const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const arrTimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const id = Math.floor(hours / 6);
  return arrTimesOfDay[id];
};
setBg();

// show date
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

// show time
const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
};
showTime();
showDate();

// show greeting
const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay},`;
};
showGreeting();

// local stirage save/load
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) name.value = localStorage.getItem('name');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
  else city.value = 'Magas';
}

window.addEventListener('load', getLocalStorage)

// weather
async function getWeather() {
  city.value = localStorage.getItem('city');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=6ce0dfa51ad31904fa3bf991156c8033&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

}
getWeather();

city.onchange = () => {
  localStorage.setItem('city', city.value);
  weatherIcon.className = 'weather-icon owf';
  getWeather();
};

// qoutes load
async function getQuotes() {  
  const quotes = 'quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const id = getRandomNum(9);
  quote.textContent = data[id].text;
  author.textContent = data[id].author;
}

getQuotes();
changeQuote.addEventListener('click', getQuotes);

//audio player
const buildPL = () => {
  playList.forEach((element) => {
    const li = document.createElement('li');
    li.classList.add('play-item')
    playListContainer.append(li);

    const playSong = document.createElement('div');
    playSong.classList.add('play-song');
    li.append(playSong);

    const sSong = document.createElement('span');
    sSong.textContent = element.title;
    playSong.append(sSong);

    const sDurat = document.createElement('span');
    sDurat.classList.add('duration');
    sDurat.textContent = element.duration;
    playSong.append(sDurat);

  });
};
buildPL();

const playSong = document.querySelectorAll('.play-song'),
  audio = new Audio();
let isPlay = false,
  playNum = 0;

const playAudio = () => {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    isPlay = true;

    playButton.classList.add('pause');

    playSong.forEach((element) => {
      element.classList.remove('item-active');
    });
    console.log (playSong);
    playSong[playNum].classList.add('item-active');

    audio.play();

  } else {
    isPlay = false;
    playButton.classList.remove('pause');
    audio.pause();
  }
};
playButton.addEventListener('click', playAudio);