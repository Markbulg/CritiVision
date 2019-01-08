$(function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
	  
  $("#windowsizeId span").text("window: " + w + " x " + h);
});
	
$(window).resize(function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
	  
  $("#windowsizeId span").text("window: " + w + " x " + h);
});
	
function substrReverse(s,n) {
  len = s.length - n;
  return s.substring(0,len);
}