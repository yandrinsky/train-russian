$(document).ready(function(){
  $('.sidenav').sidenav();
  var instance = M.Sidenav.getInstance($('.sidenav'));
  $('.sidenav-trigger').click(()=>{
    instance.open();
  })
  



});

