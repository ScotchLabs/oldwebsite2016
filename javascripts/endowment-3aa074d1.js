$(document).ready(function() {
  var slides = $('.slide').toArray();
  var animations = ["fadeIn", "transition.slideLeftIn", "transition.swoopIn",
    "transition.slideUpBigIn", "transition.shrinkIn", "transition.expandIn"];
  var outs = ["fadeOut", "transition.slideRightOut", "fadeOut",
    "transition.slideUpBigOut", "transition.shrinkOut", "transition.expandOut"];

  function completeAnimation(self, count, skipSpecial, delay) {
    if ($(self).hasClass('roll') && !skipSpecial) {
      console.log('ROLL');
      $(self).velocity({marginTop:-650}, {
        queue: false,
        duration: 3000,
        complete: completeAnimation(self, count, true)
      });
    } else {
      if ($(self).hasClass('slow'))
        delay = 8000;
      $(self).velocity(outs[count % outs.length], {
        delay: delay || 4000,
        complete: function() {
          if (count+1 < slides.length) {
            nextSlide(count+1);
          } else {
            $('.cta').velocity("fadeIn", {
              queue: false,
              delay: 1000,
              duration: 1000,
            });
          }
        }
      });
    }
  };

  function nextSlide(count) {
    $(slides[count]).velocity(animations[count % animations.length], {
      delay: 500,
      complete: function() {
        completeAnimation(this, count)
      }
    });
  };

  $('.play').on('click', function() {
    $('.play-button').velocity('fadeOut');
    nextSlide(0);
  });

  $('.skip').on('click', function() {
    $('.play-button').velocity('fadeOut');
    $('.cta').velocity("fadeIn", {
      queue: false,
      delay: 1000,
      duration: 1000,
    });
  });
});
