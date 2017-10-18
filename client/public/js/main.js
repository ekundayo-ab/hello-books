
function ConfirmDelete()
{
  var confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete)
  Materialize.toast('Successfully Deleted', 4000, 'redded');
  else
  return false;
}

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