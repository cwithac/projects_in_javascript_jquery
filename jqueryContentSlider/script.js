$( () => {

  $('.slide').hide();
  $('.slide').first().addClass('active');
  $('.active').show();

  $('#arrow-next').on('click', nextSlide);
  $('#arrow-prev').on('click', prevSlide);

  if(autoswitch) {
    setInterval(nextSlide, autoswitchSpeed);
  };

}); //

let speed = 500;
let autoswitch = true;
let autoswitchSpeed = 4000;

const nextSlide = () => {
  $('.active').removeClass('active').addClass('prevActive');
    if($('.prevActive').is(':last-child')) {
      $('.slide').first().addClass('active');
    } else {
      $('.prevActive').next().addClass('active');
    }
  $('.prevActive').removeClass('prevActive');
  $('.slide').fadeOut(speed);
  $('.active').fadeIn(speed);
};

const prevSlide = () => {
  $('.active').removeClass('active').addClass('prevActive');
    if($('.prevActive').is(':first-child')) {
      $('.slide').last().addClass('active');
    } else {
      $('.prevActive').prev().addClass('active');
    }
  $('.prevActive').removeClass('prevActive');
  $('.slide').fadeOut(speed);
  $('.active').fadeIn(speed);
}
