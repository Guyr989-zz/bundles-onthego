document.addEventListener('DOMContentLoaded', init);

const TypeWriter = function (el, words, wait = 3000) {
  this.el = el;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.txt = '';
  this.wordIndex = 0;
  this.type();
  this.isDeleting = false;
};


TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = `<span class="txt">${this.txt}</span>`;

  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 3;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    $('.carousel').carousel('next');
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};


function init() {
  const el = document.querySelector('.txt-type');
  const words = JSON.parse(el.getAttribute('data-words'));
  const wait = el.getAttribute('data-wait');


  // init typeWriter
  new TypeWriter(el, words, wait);

}