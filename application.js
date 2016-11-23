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

  $(document).on('focusin', '#search-input', activateRocket.bind(event, true));

  $(document).on('focusout', '#search-input', activateRocket.bind(event, false));

  $(document).on('submit', '#search', function(e) {
    e.preventDefault();
    $(document).off('focusout', '#search-input');
    activateRocket(true);
    $('#rocket').animate({
      top: '-=40vh'
    }, 2000);
    $('#search').animate({
      top: '-=40vh'
    }, 2000);
  });

  var client = algoliasearch('6YNC2SJ10O', '38564c2dd6e90e69fb009943988c1314');
  var tags = client.initIndex('tags');
  var portfolio = client.initIndex('portfolio');

  $(document).on('input', '#search-input', function() {
    $('#suggestion').css('display', 'block');
    if ( $('#search-input').val() === '' ) return;
    tags.search($('#search-input').val(), function(err, content) {
      var renderedSuggestion = '';
      content.hits.forEach(function(hit) {
        renderedSuggestion += '<a class="tag-suggestion" href="' + hit.name + '">' + hit.name + '</a> ';
      })
      $('#suggestion span').html('');
      $('#suggestion span').append(renderedSuggestion);
    });
  });

  $(document).on('click', '.tag-suggestion', function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    $('#search-input').val($target.attr('href'));
    $('#suggestion').css('display', '');
    $('#search').trigger('submit');
  })

});

function smoothScroll(anchor) {
  $('body').animate({scrollTop: $(anchor).offset().top - 50 }, 'slow');
}

function activateRocket(bool, e) {
  if (bool) {
    $('#rocket-wrap').addClass('shake-constant');
    $('.fire').css('display', 'block');
  } else {
    $('#rocket-wrap').removeClass('shake-constant');
    $('.fire').css('display', '');
  }
}
