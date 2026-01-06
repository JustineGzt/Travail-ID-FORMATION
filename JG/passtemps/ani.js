// ani.js
$(document).ready(function () {
  $('.description').hide();

  $('.gallery li .btn').click(function(e){
    e.preventDefault();

    // slideUp all descriptions
    $('.description').slideUp('normal');

    // toggle current description
    if($(this).next('.description').is(':hidden')){
      $(this).next('.description').slideDown('normal');
    }
  });
});
