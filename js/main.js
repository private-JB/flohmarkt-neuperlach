$(function () {

  // Global vars
  var $window = $(window);
  var $document = $(document);
  var $html = $('html');
  var $body = $('body');


  /**
   * DETECT DEVICE VIA USER AGENT
   */


  // detect user agent
  var ua = navigator.userAgent;

  var isTouchDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua));

  /**
   * DISABLE SCROLL COMPLETELY
   */

  function disablePageScroll() {
    document.addEventListener('touchmove', disabledScroll, false);
    window.addEventListener('DOMMouseScroll', disabledScroll, false);
    window.onwheel = disabledScroll; // modern standard
    window.onmousewheel = document.onmousewheel = disabledScroll; // older browsers, IE
    window.ontouchmove  = disabledScroll; // mobile
    document.onkeydown  = disabledScroll;
  }

  function enablePageScroll() {
    document.removeEventListener('touchmove', disabledScroll, false);
    window.removeEventListener('DOMMouseScroll', disabledScroll, false);
    window.onwheel = null; // modern standard
    window.onmousewheel = document.onmousewheel = null; // older browsers, IE
    window.ontouchmove  = null; // mobile
    document.onkeydown  = null;
  }

  function disabledScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * REMOVE SCROLLBAR AND LOCK SCROLL FOR OVERLAYS
   */

  function lockScroll() {

    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    // var scrollPosition = [
    //   self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    //   self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    // ];

    // notice previous scroll position
    // $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));

    TweenMax.set($html, {overflow: 'hidden'})

    // scroll to current position
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // add right margin to fix jumping window
    var marginR = $body.outerWidth() - initWidth;
    var marginB = $body.outerHeight() - initHeight;

    $body.css({'margin-right': marginR, 'margin-bottom': marginB});
    // TweenMax.set($('#navbar'), {right: marginR})
  }

  function unlockScroll() {

    // var scrollPosition = $html.data('scroll-position');

    $html.css('overflow', $html.data('previous-overflow'));

    // scroll to current position
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // remove right margin
    $body.css({'margin-right': 0, 'margin-bottom': 0});
    // TweenMax.set($('#navbar'), {right: 0})
  }

  /**
   * OPEN / CLOSE IMPRINT
   */

  var $imprintOverlay = $('#imprintOverlay');
  var $linkImprint = $('#linkImprint');
  var $btnCloseImprint = $('#btnCloseImprint');

  $linkImprint.on('click', function () {
    // open imprint overlay
    TweenMax.set($imprintOverlay, {display: 'block', onComplete:function () {
      TweenMax.to($imprintOverlay, 0.3, {autoAlpha: 1})
    }});
  });

  $btnCloseImprint.on('click', function () {
    // close imprint overlay
    TweenMax.to($imprintOverlay, 0.3, {autoAlpha: 0, onComplete: function () {
      TweenMax.set($imprintOverlay, {display: 'none'});
    }});
  })


  /**
   * INTRO ANIMATION
   */

  var innerHeight = window.innerHeight;

  function startIntroAnimation() {
  }

  window.addEventListener('resize', function() {
    var innerHeight = window.innerHeight;

    TweenMax.set($("#hero"), {height: innerHeight});
    TweenMax.set($('.main-content'), {minHeight: innerHeight});
  });

  TweenMax.set($("#hero"), {height: innerHeight});
  TweenMax.set($('.main-content'), {minHeight: innerHeight});


});
