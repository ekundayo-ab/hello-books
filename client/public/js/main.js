$(document).ready(function(){
  $('select').material_select();
  $('body').on('click', '.button-collapse', function(event){
    event.preventDefault();
    const $parent = $(this);
    $parent.sideNav({
      closeOnClick: true
    });
  });
  $('.button-collapse').sideNav({
    closeOnClick: true,
  });
});

