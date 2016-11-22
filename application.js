$(document).ready(function() {

  if (this.body.scrollTop > window.innerHeight) {
    $('.navbar').addClass('navbar-fixed-top');
    $('#about').css('margin-top', '70px');
  } else {
    $('.navbar').removeClass('navbar-fixed-top');
    $('#about').css('margin-top', '0');
  }

  $(document).on('scroll', function() {
    //fix navbar after header
    if (this.body.scrollTop > window.innerHeight) {
      $('.navbar').addClass('navbar-fixed-top');
      $('#about').css('margin-top', '70px');
    } else {
      $('.navbar').removeClass('navbar-fixed-top');
      $('#about').css('margin-top', '0');
    }
  });

  $(document).on('click', '.navbar-collapse', $('.navbar-toggle').trigger.bind($('.navbar-toggle'), 'click'));

  $(document).on('click', '.scroll', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'));
  });

});

function smoothScroll(anchor) {
  $('body').animate({scrollTop: $(anchor).offset().top - 50 }, 'slow');
}
