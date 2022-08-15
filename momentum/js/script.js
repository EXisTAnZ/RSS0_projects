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
  playButton = document.querySelector('.play'),
  playNextButton = document.querySelector('.play-next'),
  playPrevButton = document.querySelector('.play-prev'),
  audioLen = document.querySelector('.length'),
  audioName = document.querySelector('.song-name'),
  volumeButton = document.querySelector('.volume-button'),
  volumeEl = document.querySelector('.volume'),
  volumeSlider = document.querySelector('.volume-slider'),
  volumePercentage = document.querySelector('.volume-percentage'),
  timeline = document.querySelector('.timeline'),
  progressBar = document.querySelector('.progress'),
  currentDuration = document.querySelector('.duration .current'),
  weatherError = document.querySelector('.weather-error'),
  optionsListAddit = document.querySelector('.options-list-addit'),
  optionsTitle = document.querySelector('.options-title')

let language = "ru",
  blockVisible = 127,
  photoSrcId = 0;

const translates = {
  en: {
    weather: {
      city: "Magas",
      cityPlaceholder: "[ Enter city ]",
      humidity: "Humidity",
      wind: "Wind"
    },
    greetings: {
      night: "Good night",
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening"
    },
    greetingInputPlaceholder: "[ Enter name ]",
    date: {
      locales: "en-US",
      options: {
        weekday: "long",
        month: "long",
        day: "numeric"
      }
    },
    toDo: {
      title: "Todo List",
      placeholder: "[ Enter tasks ]"
    },
    options: {
      title: "Options",
      inputPlaceholder: "[ Enter tags ]",
      blocks: ["Weather", "Audio Player", "Time", "Date", "Greetings", "Todo List", "Quotes"],
      language: "Lang",
      photoSource: "Photo Source"
    }
  },
  ru: {
    weather: {
      city: "Магас",
      cityPlaceholder: "[ Введите город ]",
      humidity: "Влажность",
      wind: "Скорость ветра"
    },
    greetings: {
      night: "Доброй ночи",
      morning: "Доброе утро",
      afternoon: "Добрый день",
      evening: "Добрый вечер"
    },
    greetingInputPlaceholder: "[ Введите имя ]",
    date: {
      locales: "ru-RU",
      options: {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    },
    toDo: {
      title: "Список дел",
      placeholder: "[ Введите задачи ]"
    },
    options: {
      title: "Настройки",
      inputPlaceholder: "[ Введите тэги ]",
      blocks: ["Погода", "Патефон", "Время", "Дата", "Приветствие", "Список дел", "Цитатник"],
      language: "Язык",
      photoSource: "Источник фото"
    }
  }
}

// randomizer
const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

let slideNum = getRandomNum(20);
// bg slider
const setBg = () => {
  const timeOfDay = getTimeOfDay();
  const bgNum = slideNum;

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.toString().padStart(2, '0')}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};
const nextSlide = () => {
  if (slideNum == 20) slideNum = 0;
  slideNum++;
  setBg();
}
const prevSlide = () => {
  if (slideNum == 1) slideNum = 21;
  slideNum--;
  setBg();
}

slideNext.addEventListener('click', nextSlide);
slidePrev.addEventListener('click', prevSlide);

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
  const options = translates[language].date.options;
  const currentDate = day.toLocaleDateString(translates[language].date.locales, options);
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
  const timeOfDay = getTimeOfDay(),
    greetText = translates[language].greetings[timeOfDay];
  greeting.textContent = `${greetText},`;
  name.placeholder = translates[language].greetingInputPlaceholder;
};
showGreeting();

// local storage S A V E AND L O A D
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', language);
  localStorage.setItem('blockVisible', blockVisible);
  localStorage.setItem('photoSrcId', photoSrcId);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) name.value = localStorage.getItem('name');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city')
  else city.value = translates[language].weather.city;
  if (localStorage.getItem('language')) language = localStorage.getItem('language')
  else language.value = 'ru';
  if (localStorage.getItem('blockVisible')) blockVisible = localStorage.getItem('blockVisible')
  else blockVisible.value = 127;
  if (localStorage.getItem('photoSrcId')) photoSrcId = localStorage.getItem('photoSrcId')
  else photoSrcId.value = 0;
}
const decToBinArr = (dec) => dec.toString(2).split('');


window.addEventListener('load', getLocalStorage)

// weather
async function getWeather(lang) {
  lang = language;
  city.placeholder = translates[lang].weather.cityPlaceholder;
  city.value = translates[lang].weather.city, localStorage.getItem('city') && (city.value = localStorage.getItem('city'));
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=6ce0dfa51ad31904fa3bf991156c8033&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == 200) {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translates[lang].weather.wind}: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `${translates[lang].weather.humidity}: ${data.main.humidity}%`;
    weatherError.textContent = '';
  } else {
    weatherError.textContent = data.message;
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
  console.log(lang)
}
getWeather();

city.onchange = () => {
  localStorage.setItem('city', city.value);
  weatherIcon.className = 'weather-icon owf';
  getWeather();
};

// qoutes load
async function getQuotes() {
  const quotes = `quotes${language}.json`;
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
    sSong.classList.add('song-name')
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
    playSong[playNum].classList.add('item-active');
    audio.play();
  } else {
    isPlay = false;
    playButton.classList.remove('pause');
    audio.pause();
  }
};
playButton.addEventListener('click', playAudio);

playSong.forEach((el, id) => {
  el.addEventListener('click', () => {
    playNum = id;
    isPlay = false;
    playAudio();
  });
});

const playNext = () => {
  playNum += 1;
  if (playNum > playList.length - 1) playNum = 0;
  isPlay = false;
  playAudio();
};

playNextButton.addEventListener('click', playNext);

const playPrev = () => {
  playNum -= 1;
  if (playNum < 0) playNum = playList.length - 1;
  isPlay = false;
  playAudio();
};

playPrevButton.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);

audio.addEventListener(
  "loadeddata",
  () => {
    audioName.textContent = document.querySelector('.item-active .song-name').textContent;
    audioLen.textContent = getTimeCodeFromNum(audio.duration);
    //audio.volume = .75;
  },
  false
);

//progress bar
//click on timeline to skip around
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);
//check audio percentage and update time accordingly
setInterval(() => {
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  currentDuration.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);
//volume slider click change volume
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  volumePercentage.style.width = newVolume * 100 + '%';
}, false)

//volume button mute\unmute
volumeButton.addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

//RENEW ALL BLOCKS
const reshowAll = () => {
  showOptions();
  getWeather();
  getQuotes();
  showGreeting();
  showTime();
  showDate();
}

// O P T I O N S
showOptions();
const blocksForShow = document.querySelectorAll('.block-item'),
  arrBlocks = ['.weather', '.player', '.time', '.date', '.greeting-container', '.todo-list', '.quotes'];

blocksForShow.forEach((el, id) => {
  el.addEventListener('click', () => {
    el.classList.toggle('crossed');
    document.querySelector(arrBlocks[id]).classList.toggle('unvisible');
  })
});

// language select
const optionLanguage = document.querySelector('.option-language')
optionLanguage.addEventListener('click', () => {
  if (language == 'ru') language = 'en'
  else language = 'ru';
  optionLanguage.innerHTML = translates[language].options.language + ' (' + language + ')';
  reshowAll();
})
//show OPTIONS
function showOptions(lang) {
  lang = language,
    optionsTitle.innerHTML = translates[lang].options.title;
  optionsListAddit.innerHTML = "";
  const blocks = translates[lang].options.blocks;
  blocks.forEach(el => {
    let li = document.createElement("li");
    li.classList.add("option-item");
    li.classList.add("block-item");
    li.innerHTML = el;
    optionsListAddit.appendChild(li);
  })
  const blocksForShow = document.querySelectorAll('.block-item'),
    arrBlocks = ['.weather', '.player', '.time', '.date', '.greeting-container', '.todo-list', '.quotes'];

  blocksForShow.forEach((elbl, id) => {
    elbl.addEventListener('click', () => {
      console.log(elbl);
      elbl.classList.toggle('crossed');
      document.querySelector(arrBlocks[id]).classList.toggle('unvisible');
    })
  });
}
