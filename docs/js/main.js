/* FoxOne site – raster toggle + load choreography. No libraries. */
(function () {
  'use strict';

  var html = document.documentElement;

  function loaded() { html.classList.add('loaded'); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(loaded); }
  setTimeout(loaded, 900);

  var toggles = Array.prototype.slice.call(
    document.querySelectorAll('#rasterBtn, [data-raster-toggle]')
  );
  function setRaster(on) {
    if (on) { html.setAttribute('data-raster', 'on'); }
    else { html.removeAttribute('data-raster'); }
    toggles.forEach(function (b) { b.setAttribute('aria-pressed', String(on)); });
  }
  function toggleRaster() { setRaster(!html.hasAttribute('data-raster')); }
  toggles.forEach(function (b) { b.addEventListener('click', toggleRaster); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'g' && e.key !== 'G') { return; }
    if (e.metaKey || e.ctrlKey || e.altKey) { return; }
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) { return; }
    toggleRaster();
  });
}());
