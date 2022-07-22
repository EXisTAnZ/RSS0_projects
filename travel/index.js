console.log('Travel #3 \n in progress...')
function sleep(millis) {
  var t = (new Date()).getTime();
  var i = 0;
  while (((new Date()).getTime() - t) < millis) {
      i++;
  }
}
//слайдер
let slidercontainer = document.getElementById('slidercontainer'),
  slider = document.getElementById('slider'),
  radioSlider = document.getElementsByClassName('slider_item'),
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
  prev.addEventListener('click', move);
  next.addEventListener('click', move);
}
for (const radio of radioSlider) {
  radio.onclick = (e) => {
    //get number of class radio convert it to slide# and click on corresponding slide   
    document.querySelector('.slide'+e.target.className.substring(17,18)).click(); 
  }
}
addNameId(slides);
getSlidesStatus();

function move(event) {
  if (event == undefined) return;
  getSlidesStatus();
  let direction;
  direction = (event.target.id == 'next') ? 1 : -1;
  
  if (direction == -1) {
    length += parseFloat(getComputedStyle(prev).width)
    slider.prepend(next.cloneNode(true));
    slider.lastElementChild.remove();
  } else {
    length -= parseFloat(getComputedStyle(prev).width)
    slider.append(prev.cloneNode(true));
    slider.firstElementChild.remove();
  }
  //slider.style.overflow = 'none';
  slider.style.transform = `translateX(${-length}px)`;
  slidercontainer.style.transform = `translateX(${length}px)`;

  for (const radio of radioSlider){
    radio.classList.remove('active');
    document.querySelector('.radio'+event.target.className.substring(11,12)).classList.add('active');
    console.log(radio.classList, '.radio'+event.target.className.substring(11,12))
  }
  addNameId(slides);
  getSlidesStatus();
}

move();
