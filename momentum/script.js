// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// constants
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Show Time
function showTime() {
  let today = new Date();
  
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getDay(); // weekday

  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${WEEKDAYS[day]}, ${date} ${MONTHS[month]} `;
  time.innerHTML += `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage =
      "url('./assets/images/night/01.jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Input Name
function inputName() {
  localStorage.setItem('name', name.textContent);
  localStorage.setItem('name-width', name.offsetWidth);
  name.style.width = '3px';
  name.textContent = '';
  name.focus();
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem('name', e.target.innerText);
        name.style.width = 'initial';
        name.blur();
      } else {
        name.style.width = `${localStorage.getItem('name-width')}px`;
        getName();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem('name', e.target.innerText);
      name.style.width = 'initial';
    } else {
      name.style.width = `${localStorage.getItem('name-width')}px`;
      getName();
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Input Focus
function inputFocus() {
  localStorage.setItem('focus', focus.textContent);
  localStorage.setItem('focus-width', focus.offsetWidth);
  focus.style.width = '3px';
  focus.textContent = '';
  focus.focus();
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem('focus', e.target.innerText);
        focus.style.width = 'initial';
        focus.blur();
      } else {
        focus.style.width = `${localStorage.getItem('focus-width')}px`;
        getFocus();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem('focus', e.target.innerText);
      focus.style.width = 'initial';
    } else {
      focus.style.width = `${localStorage.getItem('focus-width')}px`;
      getFocus();
    }
  }
}

name.addEventListener('click', inputName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', inputFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
