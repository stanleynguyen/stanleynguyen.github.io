$(document).ready(function() {

  if ( this.body.scrollTop > $('#header').outerHeight() ) {
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

  $(document).on('click', '.scroll-header', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'), 90);
  });

  $(document).on('click', '.scroll', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'), 50);
  });

  $(document).on('focusin', '#search-input', activateRocket.bind(event, true));

  $(document).on('focusout', '#search-input', activateRocket.bind(event, false));

  var client = algoliasearch('6YNC2SJ10O', '38564c2dd6e90e69fb009943988c1314');
  var tags = client.initIndex('tags');
  var portfolio = client.initIndex('portfolio');

  var ANIMATED = false;

  $(document).on('submit', '#search', function(e) {
    e.preventDefault();
    var $input = $('#search-input');
    console.log($input.val())
    // if ( $target.val() == '' ) return;
    $(document).off('focusout', '#search-input');
    $('#suggestion').css('display', '');
    showSearchResults($input.val(), portfolio);
    if (!ANIMATED) {
      activateRocket(true);
      $('#rocket').animate({
        top: '-=40vh'
      }, 2000);
      $('#search').animate({
        top: '-=40vh'
      }, 2000, function() {
        $('#result').css('display', 'block');
      });
      $('#suggestion').animate({
        top: '-=40vh'
      }, 2000);
      $('#header-next').animate({
        bottom: '-=' + $('#header-next').outerHeight(true),
        opacity: '0'
      }, 2000, function() {
        $('#header-next').css('display', 'none');
      });
      $('#rocket').animate({
        top: '-=60vh'
      }, 1000);
      ANIMATED = true;
    }
  });

  $(document).on('input', '#search-input', function() {
    if ( $('#search-input').val() === '' ) {
      $('#suggestion').css('display', '');
      return;
    }
    tags.search($('#search-input').val(), function(err, content) {
      if (err || content === undefined) {
        $('#suggestion').css('display', '');
        return;
      }
      if (content.hits.length === 0) {
        $('#suggestion').css('display', '');
        return;
      }
      $('#suggestion').css('display', 'block');
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
    $('#search').trigger('submit');
  })

});

function smoothScroll(anchor, offset) {
  $('body').animate({scrollTop: $(anchor).offset().top - offset }, 'slow');
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

function showSearchResults(term, index) {
  console.log('term', term);
  console.log('index', index);
  var startTime = (new Date()).getTime();
  index.search(term, function(err, content) {
    var stopTime = (new Date()).getTime();
    var duration = ( stopTime - startTime ) / 1000;
    if ( err || content == undefined) return console.log('Opps there was an error');
    if ( content.hits.length == 0 ) return console.log('Oops nothing related was found');
    var returnedHtml = '<hr/><small>About ' + content.hits.length + ' results (' + duration + ' seconds)</small><br/><br/>';
    content.hits.forEach(function(hit) {
      returnedHtml += `
        <div class="row">
          <div class="col-xs-12">
            <a href="#${hit.category}" class="scroll-header">${hit.name}</a>
            <p>
              <small class="result-link">#${hit.category}</small>
              <br />
              ${hit.description}
            </p>
          </div>
        </div>`;
    });
    $('#result').html(returnedHtml);
  });
}
