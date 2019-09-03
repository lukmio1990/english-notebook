//GSAP
const iconsCheck = document.querySelectorAll('.fa-check--home');
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
