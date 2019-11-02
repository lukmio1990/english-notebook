// MESSAGE

if (document.querySelector('.message')) {
  const closeBtn = document.querySelector('.message__btn');
  const message = document.querySelector('.message');
  console.log(closeBtn);

  // message.style.animation = 'displayMessage 1s 2s ';
  let timeoutMessage = window.setTimeout(
    () => (message.style.display = 'none'),
    2200
  );

  const closeMessage = () => {
    clearTimeout(timeoutMessage);
    message.style.animation = 'displayMessage 1s ';
    window.setTimeout(() => (message.style.display = 'none'), 1000);
  };

  closeBtn.addEventListener('click', closeMessage);
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
// const quizSolution = document.querySelector('.quiz__solution--span');
const quizTranslate = document.querySelector('.quiz__translate');
const quizCheck = document.querySelector('.quiz__check');
const quizNext = document.querySelector('quiz__next primaryBtn');
const reply = document.querySelector('.quiz__reply');
const solutionCorrect = document.querySelector('.fa-check-circle');
const solutionUncorrect = document.querySelector('.fa-times-circle');

if (quizCheck) {
  quizCheck.addEventListener('click', e => {
    e.preventDefault();
    const value = quizInput.value.toLowerCase();

    if (value.trim() === quizTranslate.textContent.toLowerCase()) {
      solutionCorrect.style.animation = 'solution 1s both';
      // quizSolution.style.color = 'green';
      quizInput.value = '';
      quizInput.setAttribute('disabled', true);
      quizInput.setAttribute('placeholder', 'kliknij dalej');
      quizCheck.style.display = 'none';
      reply.value = 1;
    } else {
      solutionUncorrect.style.animation = 'solution 1s both';
      // quizSolution.style.color = 'red';
      quizCheck.style.display = 'none';
      quizTranslate.style.opacity = 1;
      reply.value = 0;
      quizInput.setAttribute('disabled', true);
      quizInput.setAttribute('placeholder', 'kliknij dalej');
    }
  });
}

//SEARCH

const allItems = [...document.querySelectorAll('.note')];
const inputWord = document.querySelector('.search__input');
const counter = document.querySelector('.counter');

if (counter && allItems.length > 0) {
  counter.textContent = allItems.length;
}

if (inputWord) {
  inputWord.addEventListener('input', e => {
    let visibleCards = allItems.filter(card =>
      card.childNodes[1].textContent
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    let hiddenCards = allItems.filter(
      card =>
        !card.childNodes[1].textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );
    show(visibleCards);
    hidden(hiddenCards);
  });
}

const show = visibleCards => {
  visibleCards.forEach(card => {
    card.classList.remove('hidden');
    card.classList.add('active');
  });
};

const hidden = hiddenCards => {
  hiddenCards.forEach(card => {
    card.classList.add('hidden');
    card.classList.remove('active');
  });
};

// EXERCISES

//button
const exerciseBtn = document.querySelector('.exercise__btn');
//wordENG
const elementsWord = [...document.querySelectorAll('.exercise__solution')];
//wordPL
const elementsTranslate = [...document.querySelectorAll('.exercise__word')];
//wordInput
const exerciseAnswer = [...document.querySelectorAll('.exercise__input')];
//wynik
const exerciseSolution = document.querySelector('.exercises__solution-span');

let words = elementsWord.length;
let goodAnswer = 0;

//sprawdzanie odpowiedzi
const checkExercise = () => {
  exerciseAnswer.forEach((word, index) => {
    if (
      word.value.toLowerCase().trim() ===
      elementsWord[index].textContent.toLowerCase().trim()
    ) {
      elementsTranslate[index].style.color = '#4bff0f';
      goodAnswer++;
    } else {
      elementsTranslate[index].style.color = '#ff2a1e';
    }
  });
};

scoreExercise = () => {
  exerciseSolution.textContent = `${goodAnswer}/${words}`;
};

//reset ćwiczenia
const resetExercise = () => {
  exerciseAnswer.forEach(item => (item.value = ''));
  exerciseSolution.textContent = '0/0';
  exerciseBtn.textContent = 'Sprawdź';
  elementsTranslate.forEach(item => (item.style.color = 'black'));
};

//main function
const solutionExercise = () => {
  if (exerciseBtn.textContent === 'Sprawdź') {
    exerciseBtn.textContent = 'Reset';
    checkExercise();
    scoreExercise();
  } else {
    resetExercise();
  }
};

exerciseBtn.addEventListener('click', solutionExercise);
