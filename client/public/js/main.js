$(document).ready(function(){
  $('.button-collapse').sideNav({
    closeOnClick: true,
  });
  $('select').material_select();
});

function ConfirmDelete()
{
  var confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete)
      Materialize.toast('Successfully Deleted', 4000, 'redded');
  else
    return false;
}
