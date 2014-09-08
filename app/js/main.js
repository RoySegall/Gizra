$(function() {
  // Homepage slideshow.
  $('#slideshow .scene').parallax();

  // About-story images.
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    $('.section2').backstretch("/assets/images/about-story/lamp.jpg");
    $('.section4').backstretch("/assets/images/about-story/fish.jpg");
  }
});
