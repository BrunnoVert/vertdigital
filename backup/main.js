var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period + 3000;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// navigation starts here
$("#toggle").click(function () {
  $(this).toggleClass('on');
  $("#resize").toggleClass("active");
});
$("#resize ul li a").click(function () {
  $(this).toggleClass('on');
  $("#resize").toggleClass("active");
});
$(".close-btn").click(function () {
  $(this).toggleClass('on');
  $("#resize").toggleClass("active");
});

$(function () {
  $(document).scroll(function () {
    var $nav = $(".nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

new WOW().init();

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


//CONTACT FORM processing
function formSubmit(event) {
  var url = "https://script.google.com/macros/s/AKfycbzOIb5MJYMtGIblfo4AvFXOKKx8OVrUh61OKt2JD18N5snpgIo/exec";
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.onload = function () { // request successful
    // we can use server response to our request now


  };

  request.onerror = function () {
    // request failed
    disableSendButton();
  };

  request.send(new FormData(event.target)); // create FormData from form that triggered event
  event.preventDefault();
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId) {
  document.getElementById(formId).addEventListener("submit", formSubmit);

}

attachFormSubmitEvent(`contact-form`);

//get testimonials
function getTestimonials(cb) {
  let url = 'https://script.google.com/macros/s/AKfycbw_cj5GxyRdLy3Hl6F77XpwOrKLKsPBAPVlRvDcAih-szTHdiWl/exec';
  let request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = function () { // request successful
    // we can use server response to our request now
    let result = JSON.parse(request.responseText);

    if (!result['data']) {
      return;
    }

    cb(result['data']);
  };

  request.onerror = function () {
    // request failed
  };

  request.send();
}

function templateTestimonials(data) {
  if (!data.length) {
    return;
  }
  return data.map(dataObj => {
    let template = `
      <div class="slide">
        <blockquote>
              <p>${dataObj.message}</p>
              <img class="img-testimonials" src="${dataObj.image}">
              <p><cite>&mdash; ${dataObj.name}</cite></p>
        </blockquote>
      </div>
  `
    return template;
  })
}

function appendTestimonials(data) {
  let testimonials = templateTestimonials(data);
  console.log(testimonials)
  $('#carousel').append(testimonials.join(''));
  siteCarousel();
}

getTestimonials(appendTestimonials);


//counter effect
var counter = function () {

  $('#section-counter').waypoint(function (direction) {

    if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

      var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
      $('.number').each(function () {
        var $this = $(this),
          num = $this.data('number');
        $this.animateNumber(
          {
            number: num,
            numberStep: comma_separator_number_step
          }, 7000
        );
      });

    }

  }, { offset: '95%' });

}
counter();

var siteCarousel = function () {
  if ($('.nonloop-block-13').length > 0) {
    $('.nonloop-block-13').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      nav: true,
      navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
      responsive: {
        600: {
          margin: 0,
          nav: true,
          items: 2
        },
        1000: {
          margin: 0,
          stagePadding: 0,
          nav: true,
          items: 3
        },
        1200: {
          margin: 0,
          stagePadding: 0,
          nav: true,
          items: 4
        }
      }
    });
  }

  $('.slide-one-item').owlCarousel({
    center: false,
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    smartSpeed: 1000,
    autoplay: true,
    pauseOnHover: false,
    autoHeight: true,
    nav: false,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
  });


};


window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
