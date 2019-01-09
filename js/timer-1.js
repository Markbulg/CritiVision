timer1NS = {};  
//timer1NS.timerDuration  = (30 * 1000); 
//timer1NS.timerActivated = false;
//timer1NS.timeStarted;
//timer1NS.timerHandle;
	  
$(function() {
  var data = {
    timerDuration  : (30 * 1000)
  , timerActivated : false
  , timeStarted    : 0
  , timerHandle    : 0 	
  };
  timer1NS = data; 
  
  // Set menu
  $("#navBarId").load("menu.html", function() {
	var activeItem, navBar;
	
    navBar = document.getElementById('navBarId');
    activeItem = document.querySelector('[href="timer-1.html"]');
	navBar.classList.add('panel-menu-transparent');
    activeItem.classList.add('ui-active');
  });
  
  $("#stopId").prop('disabled',true);  	 
  setNumbersStart();
  
  function setNumbersStart() {
    $("div1").text("0");
    $("div2").text("0");
    $("div3").text("3");		
    $("div4").text("0");
    $("div5").text("0");
    $("div6").text("0");
  };
});
 	
$("#startId").click(function() {
  $(this).prop('disabled',true);     
  $("#stopId").prop('disabled',false);  	  
  
  startTimer();
});
	  
$("#stopId").click(function() {
  $(this).prop('disabled',true);     
  $("#startId").prop('disabled',false);  
  
  stopTimer();
});
	
function startTimer() {
  var aud = document.getElementById("audioId");
  
  if (timer1NS.timerActivated == false) {
    timer1NS.timerActivated = true;
	activateNumbers();
	
	function activateNumbers() {
      $("div3").text("2 1 0");
      $("div4").text("9 8 7 6 5 4 3 2 1 0");
      $("div5").text("9 8 7 6 5 4 3 2 1 0");
      $("div6").text("9 8 7 6 5 4 3 2 1 0");
    };
  }
		
  $(".moveten").css('animation-play-state', 'running');
  $(".movesix").css('animation-play-state', 'running');
  
  timer1NS.timeStarted = $.now();
  timer1NS.timerHandle = setTimeout(function() {
    timerExpired();
  }, timer1NS.timerDuration);
  
  aud.play();
  
  function timerExpired() {
    var vid = document.getElementById("videoId"); 
	
    $(".moveten").css('animation-play-state', 'paused');
    $(".movesix").css('animation-play-state', 'paused');
		 
    clearTimeout(timer1NS.timerHandle);
    setNumbersZero();
    aud.pause();
		
    timer1NS.timerHandle = setTimeout(function() {
      $("#videoId").css('visibility', 'visible');
      $("#timerId").css('visibility', 'hidden');
		
      vid.play()
      vid.onended = function() {
        resetTimer();
      };
    }, 1300);
	
	function setNumbersZero() {
      $("div1").remove();
      $("div2").remove();
      $("div3").remove();
      $("div4").remove();
      $("div5").remove();
      $("div6").remove();
		
      var sel = '<div1 class="numbers">0</div1>';
      $(sel).appendTo("#cell1Id");
      sel = '<div2 class="numbers">0</div2>';
      $(sel).appendTo("#cell2Id");
      sel = '<div3 class="numbers">0</div3>';
      $(sel).appendTo("#cell3Id");
      sel = '<div4 class="numbers">0</div4>';
      $(sel).appendTo("#cell4Id");
      sel = '<div5 class="numbers">0</div5>';
      $(sel).appendTo("#cell5Id");
      sel = '<div6 class="numbers">0</div6>';
      $(sel).appendTo("#cell6Id");
    };
  }

  function resetTimer() {
    $("#videoId").css('visibility', 'hidden');
    
    timer1NS.timerDuration  = (30 * 1000); 
    timer1NS.timeStarted    = 0;
    timer1NS.timerActivated = false;
 
    clearTimeout(timer1NS.timerHandle);
    location.reload();
  }  

}

function stopTimer() {
  var aud = document.getElementById("audioId");
  
  clearTimeout(timer1NS.timerHandle);
  $(".moveten").css('animation-play-state', 'paused');
  $(".movesix").css('animation-play-state', 'paused');
  aud.pause();
  
  timer1NS.timerDuration = timer1NS.timerDuration - ($.now() - timer1NS.timeStarted);
}
