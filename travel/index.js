console.log('Travel #3 \n in progress')

//слайдер
let slider = document.getElementById('slider'),
  pinsParent = document.getElementById('slider_item'),
  length = 0,
  slides = document.getElementsByClassName('slide');
function addNameId(arr) {
  let massive = ['prev', 'cur', 'next'];
  for (let i = 0; i < arr.length; i++) {
    arr[i].id = massive[i];
  }
}
function getSlidesStatus() {
  prev = document.getElementById('prev');
  cur = document.getElementById('cur');
  next = document.getElementById('next');
  cur.removeEventListener('click', move);
  prev.addEventListener('click', move)
  next.addEventListener('click', move);
}
addNameId(slides);
getSlidesStatus();

function move(event) {
  if (event == undefined) return;
  getSlidesStatus();
  let direction;
  if (event.id == undefined) {
    direction = (event.target.id == 'next') ? 1 : -1;
  } else {
    direction = -1;
  }
  if (direction == -1) {
    length += parseFloat(getComputedStyle(prev).width)
    slider.prepend(next.cloneNode(true));
    slider.lastElementChild.remove();
  } else {
    length -= parseFloat(getComputedStyle(prev).width)
    slider.append(prev.cloneNode(true));
    slider.firstElementChild.remove();
  }
  slider.style.transform = `translateX(${-length}px)`;
  addNameId(slides);
  getSlidesStatus();
}

move();
