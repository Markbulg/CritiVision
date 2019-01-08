$(".mainitem").hover(function() {
       $(".dropdownitem").css("color", "#757575"); //grey
    });
	
    $(".dropdownitem").hover(function() {
      $(this).css("color", "#924343");             //light red
    }, function() {
      $(this).css("color", "#757575");             //grey
    });
		 
	function placeMenu() {
      var nav = document.getElementById("navId");
      if (nav.className === "ui-nav") {
        nav.className += " responsive";
      } else {
        nav.className = "ui-nav";
      }
    }