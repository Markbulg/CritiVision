$(function() {
  var btn = document.getElementById("btnId");
  
  btn.innerHTML = "Play";
  
  $("#navBarId").load("menu.html", function() {
	var activeItem, navBar;
	
    navBar = document.getElementById('navBarId');
    activeItem = document.querySelector('[href="playrain.html"]');
 	navBar.classList.add('panel-menu-transparent');
    activeItem.classList.add('ui-active');
  });
});

function togglePlay() {
  var aud = document.getElementById("audioId");
  var vid = document.getElementById("videoId");
  var btn = document.getElementById("btnId");

  if (vid.paused) {
    aud.play();
    vid.play();
    btn.innerHTML = "Pause";
  }
  else {
    aud.pause();
    vid.pause();
    btn.innerHTML = "Play";
  }
}
