console.log('Travel #3 \n in progress...')
function sleep(millis) {
  var t = (new Date()).getTime();
  var i = 0;
  while (((new Date()).getTime() - t) < millis) {
    i++;
  }
}
//---------------!!! BURGER !!!---------------//
let burger = document.getElementById("burger");
let button = document.getElementById("burger_icon");
let cross = document.getElementById("burger_cross");

button.addEventListener('click', e => {
  e.stopPropagation();
  burger.classList.add('burger-active');
});

document.addEventListener('click', e => {
  let element = e.target;
  let its_hamburger = element == burger;
  if (burger.classList.contains('burger-active') && !its_hamburger) {
    burger.classList.remove('burger-active');
  }
})

//---------------!!! SLIDER !!!---------------//

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
  ar_prev = document.getElementById('arrow_left');
  ar_next = document.getElementById('arrow_right');

  cur.removeEventListener('click', move);
  prev.addEventListener('click', move);
  next.addEventListener('click', move);

  ar_prev.onclick = (e) => prev.click();
  ar_next.onclick = (e) => next.click();
}
for (const radio of radioSlider) {
  radio.onclick = (e) => {
    //get number of class radio convert it to slide# and click on corresponding slide   
    document.querySelector('.slide' + e.target.className.substring(17, 18)).click();
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
  slider.style.transform = `translateX(${-length}px)`;
  slidercontainer.style.transform = `translateX(${length}px)`;

  for (const radio of radioSlider) {
    //change activation of radiobuttons
    radio.classList.remove('slider_active');
    document.querySelector('.radio' + event.target.className.substring(11, 12)).classList.add('slider_active');
  }
  addNameId(slides);
  getSlidesStatus();
}

move();

//---------------!!! END OF SLIDER !!!---------------//

//---------------!!! POPUP !!!-----------------------//

  const loginForm = {
      title: "Log in to your account",
      btn: "Sign In",
      footer: "Don't have an account?",
      link: "Register"
  }
  const registerForm = {
      title: "Create account",
      btn: "Sign Up",
      footer: "Already have an account?",
      link: "Log in"
  }
  const headerButton = document.getElementById('header_button')
  const popupClassName = 'popup-active';
  const popup = document.getElementById('popup');
  const popupClick = document.getElementById('clickToCreate');
  const popupTitle = document.getElementById('popup_title');
  const popupButton = document.getElementById('popup_btn');
  const footerText = document.getElementById('footer_text');
  const loginButton = document.getElementById('loginButton');
  const accountLink = document.getElementById('account_link')
  
  
  function ChangePopUpWindow(e) {
      let popupForms = (e.target.innerHTML === "Register")?registerForm:loginForm;
      popup.classList.toggle(popupClassName);
      popupTitle.innerHTML = popupForms.title;
      popupButton.innerHTML = popupForms.btn;
      footerText.innerHTML = popupForms.footer;
      popupClick.innerHTML = popupForms.link;

  }

  function makePopUpVisible(e){
      
      popup.classList.remove(popupClassName);
      popupTitle.innerHTML = loginForm.title;
      popupButton.innerHTML = loginForm.btn;
      footerText.innerHTML = loginForm.footer;
      popupClick.innerHTML = loginForm.link;
      e.stopPropagation();
      burger.classList.remove('burger-active');
      popup.classList.toggle('popup-visible');
  }

  function makePopUpInvisible(e) {
      let target = e.target;
      let its_popup = popup == target || popup.contains(target);
      if (popup.classList.contains('popup-visible') && !its_popup) {
          popup.classList.remove('popup-visible');
          
        }
  }

  function alertLoginPassword() {
      let loginValue = document.getElementById('login').value;
      let passwordValue = document.getElementById('password').value;
      alert(`Login: ${loginValue}\nPassword: ${passwordValue}`);
  }
  accountLink.addEventListener('click',makePopUpVisible);
  popupClick.addEventListener('click', ChangePopUpWindow);
  headerButton.addEventListener('click', makePopUpVisible);
  loginButton.addEventListener('click', alertLoginPassword);
  document.addEventListener('click', makePopUpInvisible);
