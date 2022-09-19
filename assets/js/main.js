(function () {

  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = container.querySelectorAll('.indicator');
  const pauseBtn = container.querySelector('#pause');
  const prevBtn = container.querySelector('#prev');
  const nextBtn = container.querySelector('#next');
  
  const SLIDES_COUNT = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  
  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;
  
  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }
  
  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  
  function gotoNext() {
    gotoNth(currentSlide + 1);
  }
  
  function pause() {
    isPlaying = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = 'Play';
  }
  
  function play() {
    isPlaying = true;
    timerID = setInterval(gotoNext, 2000);
    pauseBtn.innerHTML = 'Pause';
  }
  
  function pausePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }
  
  function prev() {
    gotoPrev();
    pause();
  }  
  
  function next() {
    gotoNext();
    pause();
  }
  
  function indicate(e) {
    const target = e.target;
  
    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.getAttribute('data-slide-to');
  
      if(isNaN(dataSlide)) return;
      gotoNth(dataSlide);
    }
  }
  
  function pressKey(e) {
    if(e.code === CODE_LEFT_ARROW) prev();
    if(e.code === CODE_RIGHT_ARROW) next();
    if(e.code === CODE_SPACE) pausePlay();
  }
  
  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) prev();
    if (swipeStartX - swipeEndX > 100) next();
  }
  
  function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', gotoPrev);
    nextBtn.addEventListener('click', gotoNext);
    indicatorsContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart)
    container.addEventListener('touchend', swipeEnd)
    document.addEventListener('keydown', pressKey)
  }
  
function init() {
  timerID = setInterval(gotoNext, 2000);
  initListeners();
}

init();

}());

