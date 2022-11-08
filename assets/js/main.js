import SwipeCarousel from './carousel-swipe.js';

const carousel = new SwipeCarousel({
  containerID: '.slider',
  slideID: '.item',
  interval: 2000,
  isPlaying: false,
});

carousel.init();
