$(function () {
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

  window.addEventListener('resize', function() {
    var innerHeight = window.innerHeight;

    TweenMax.set($("#hero"), {height: innerHeight});
    TweenMax.set($('.main-content'), {minHeight: innerHeight});
  });

  TweenMax.set($("#hero"), {height: innerHeight});
  TweenMax.set($('.main-content'), {minHeight: innerHeight});
});
