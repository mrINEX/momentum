// DOM Elements
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const nextBackground = document.querySelector('.next-background');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const nextQuote = document.querySelector('.next-quote');
const city = document.querySelector('.city');

// constants
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY = ['morning', 'day', 'evening', 'night'];
const MS = 3600000;

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

// Set Params
let countNight = randomInteger(1, 20);
let countMorning = randomInteger(1, 20);
let countAfternoon = randomInteger(1, 20);
let countEvening = randomInteger(1, 20);

function changeBg(src) {
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${src}')`;
  };
};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function counts() {
  let today = new Date();
  const hour = today.getHours();

  let night = countNight % 20 || 20;
  let morning = countMorning % 20 || 20;
  let afternoon = countAfternoon % 20 || 20;
  let evening = countEvening % 20 || 20;
  return { hour, night, morning, afternoon, evening};
}

// Set Background and Greeting
function setBgGreet() {
  const { hour, night, morning, afternoon, evening } = counts();

  if (hour < 6) {
    // Night
    changeBg(`./assets/images/night/${addZero(night)}.jpg`);
    greeting.textContent = 'Good Night, ';
    countNight += 1;
  } else if (hour < 12) {
    // Morning
    changeBg(`./assets/images/morning/${addZero(morning)}.jpg`);
    greeting.textContent = 'Good Morning, ';
    countMorning += 1;
  } else if (hour < 18) {
    // Afternoon
    changeBg(`./assets/images/day/${addZero(afternoon)}.jpg`);
    greeting.textContent = 'Good Afternoon, ';
    countAfternoon += 1;
  } else {
    // Evening
    changeBg(`./assets/images/evening/${addZero(evening)}.jpg`);
    greeting.textContent = 'Good Evening, ';
    countEvening += 1;
  }

  setTimeout(setBgGreet, MS);
}

nextBackground.addEventListener('click', () => {
  const { hour, night, morning, afternoon, evening } = counts();
  nextBackground.disabled = true;
  setTimeout(() => {
    nextBackground.disabled = false;
  }, 1000);

  if (hour < 6) {
    changeBg(`./assets/images/night/${addZero(night)}.jpg`);
    countNight += 1;
  } else if (hour < 12) {
    changeBg(`./assets/images/morning/${addZero(morning)}.jpg`);
    countMorning += 1;
  } else if (hour < 18) {
    changeBg(`./assets/images/day/${addZero(afternoon)}.jpg`);
    countAfternoon += 1;
  } else {
    changeBg(`./assets/images/evening/${addZero(evening)}.jpg`);
    countEvening += 1;
  }
})

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
        name.blur();
      } else {
        getName();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem('name', e.target.innerText);
    } else {
      getName();
    }
  }
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Minsk';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Input City
function inputCity() {
  city.textContent = '';
  city.focus();
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem('city', e.target.innerText);
        city.blur();
      } else {
        getCity();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem('city', e.target.innerText);
    } else {
      getCity();
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
        focus.blur();
      } else {
        getFocus();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem('focus', e.target.innerText);
    } else {
      getFocus();
    }
  }
}

// Quote

async function getQuote() {
  nextQuote.disabled = true;
  setTimeout(() => {
    nextQuote.disabled = false;
  }, 1000);
  try {
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    const data = await res.json();
    const number = randomInteger(1, data.length);
    const { text, author} = data[number];
    blockquote.textContent = text;
    figcaption.textContent = author;
  } catch (e) {
    console.log('Error:', e.message);
  }
}

document.addEventListener('DOMContentLoaded', getQuote);
nextQuote.addEventListener('click', getQuote);

name.addEventListener('click', inputName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', inputFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('click', inputCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();
