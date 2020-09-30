$(document).ready(function () {
  console.log('hi');
  console.log($.fn.jquery);

  $('#local').on('click', function() {
    local();
  })
  $('#back').on('click', function() {
    back();
  })
  $('#go').on('click', function() {
    window.open('game.html', '_self')
  })

});

const local = function() {
  $('#modeSelect').addClass('hidden');
  $('#localMode').removeClass('hidden');
}

const back = function() {
  $('#localMode').addClass('hidden');
  $('#modeSelect').removeClass('hidden');
}
