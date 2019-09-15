// MESSAGE

if (document.querySelector('.message')) {
  const closeBtn = document.querySelector('.message__btn');
  const message = document.querySelector('.message');
  console.log(closeBtn);

  closeBtn.addEventListener('click', () => {
    message.style.display = 'none';
    console.log('click');
  });
}

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
btnCog.forEach(item => {
  item.addEventListener('click', e => {
    const li = e.target.parentElement.parentElement;
    li.children[0].classList.toggle('options__btn--active');
  });
});

//RATING NOTE

if (document.querySelectorAll('.rating__content')) {
  const rating = document.querySelectorAll('.rating__content');
  const ratingIcon = document.querySelectorAll('.rating__icon');

  rating.forEach(item => {
    if (item.textContent >= 50) {
      item.previousElementSibling.className = 'fas fa-thumbs-up rating__icon';
    } else if (item.textContent < 50) {
      item.previousElementSibling = 'fas fa-thumbs-down rating__icon';
    }
  });
}

// QUIZ

const quizInput = document.querySelector('.quiz__input');
const quizSolution = document.querySelector('.quiz__solution--span');
const quizTranslate = document.querySelector('.quiz__translate');
const quizCheck = document.querySelector('.quiz__check');
const quizNext = document.querySelector('quiz__next primaryBtn');
const reply = document.querySelector('.quiz__reply');
const solutionCorrect = document.querySelector('.fa-check-circle');
const solutionUncorrect = document.querySelector('.fa-times-circle');

quizCheck.addEventListener('click', e => {
  e.preventDefault();
  const value = quizInput.value.toLowerCase();

  if (value.trim() === quizTranslate.textContent.toLowerCase()) {
    solutionCorrect.style.animation = 'solution 1s both';
    quizSolution.style.color = 'green';
    quizInput.value = '';
    quizInput.setAttribute('disabled', true);
    quizInput.setAttribute('placeholder', 'kliknij dalej');
    quizCheck.style.display = 'none';
    reply.value = 1;
  } else {
    solutionUncorrect.style.animation = 'solution 1s both';
    quizSolution.style.color = 'red';
    quizCheck.style.display = 'none';
    quizTranslate.style.opacity = 1;
    reply.value = 0;
  }
});
