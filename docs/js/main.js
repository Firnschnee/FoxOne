/* FoxOne site – load choreography. No libraries. */
(function () {
  'use strict';
  var html = document.documentElement;
  function loaded() { html.classList.add('loaded'); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(loaded); }
  setTimeout(loaded, 900);
}());
