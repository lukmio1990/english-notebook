//GSAP
const iconsCheck = document.querySelectorAll('.fa-check--home');
iconsCheck.forEach(item => TweenMax.set(item, { visibility: 'visible' }));

TweenMax.staggerFrom(iconsCheck, 1.5, { opacity: 0, x: 20 }, 0.5);

// HAMBURGER

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.sidebar');

const handleClick = () => {
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('sidebar--active');
};

hamburger.addEventListener('click', handleClick);

// NOTE CONFIG
const btnCog = [...document.querySelectorAll('.note__cog')];
console.log(btnCog);

btnCog.forEach(item => {
  item.addEventListener('click', e => {
    const li = e.target.parentElement.parentElement;
    li.children[0].classList.toggle('options__btn--active');
  });
});

// QUIZ

const quizInput = document.querySelector('.quiz__input');
const quizSolution = document.querySelector('.quiz__solution');
const quizTranslate = document.querySelector('.quiz__translate');
const quizCheck = document.querySelector('.quiz__check');
const quizNext = document.querySelector('.quiz__next');

quizCheck.addEventListener('click', e => {
  e.preventDefault();
  const value = quizInput.value;

  if (value === quizTranslate.textContent) {
    quizSolution.textContent = 'dobrze';
    quizSolution.style.color = 'green';
    quizInput.value = '';
    quizInput.setAttribute('type', 'disabled');
    quizCheck.style.display = 'none';
  } else {
    quizSolution.textContent = 'źle';
    quizSolution.style.color = 'red';
  }
});
