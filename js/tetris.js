$(function() {
  // Set menu
  $("#navBarId").load("menu.html", function() {
	var activeItem, navBar;
	
    navBar = document.getElementById('navBarId');
    activeItem = document.querySelector('[href="tetris.html"]');
	navBar.classList.add('ui-navpanel');
    activeItem.classList.add('ui-active');
  });
});