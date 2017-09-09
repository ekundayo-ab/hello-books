$(document).ready(function(){
  $('.button-collapse').sideNav({
    closeOnClick: true,
  });
  $('select').material_select();
});
$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

function ConfirmDelete()
{
  var x = confirm("Are you sure you want to delete?");
  if (x)
      Materialize.toast('Successfully Deleted', 4000, 'redded');
  else
    return false;
}
