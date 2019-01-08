timer2NS = {};  
//timer2NS.timerDuration = (30 * 1000); 
//timer2NS.timeTarget    = 0;
//timer2NS.timeStarted   = 0;
//timer2NS.intervalHandle;

$(function() {
  var data = {
    timerDuration  : (30 * 1000)
  , timeTarget     : 0
  , timeStarted    : 0
  , intervalHandle : 0 	
  };
  timer2NS = data; 

  // Set menu
  $("#navBarId").load("menu.html", function() {
	var activeItem, navBar;
	
    navBar = document.getElementById('navBarId');
    activeItem = document.querySelector('[href="timer-2.html"]');
	navBar.classList.add('panel-menu-transparent');
	try {
      activeItem.classList.add('ui-active');
	}
	catch(err) {
	  alert("Error: " + err);
	}
  });
  
  $("#stopId").prop('disabled',true);  	 
  showCountDown();
  
  function showCountDown() {
    var hours, minutes, seconds, hseconds, hseconds_left;
    var tiles = document.getElementById("tilesId"); 
	  
    hseconds_left =  timer2NS.timerDuration / 10;

    hours = pad(Math.floor(hseconds_left / 360000));
    hseconds_left = hseconds_left % 360000;
		  
    minutes = pad(Math.floor(hseconds_left / 6000));
    hseconds_left = hseconds_left % 6000;
	  
    seconds = pad(Math.floor(hseconds_left / 100));
    hseconds_left = hseconds_left % 100;
	  
    hseconds = pad(Math.floor(hseconds_left));

    tiles.innerHTML = "<span>" + hours + "</span><span>" + minutes  + "</span><span>" + seconds  + "</span><span>" + hseconds + "</span>"; 
  }

});
 	
$("#startId").click(function() {
  startTimer();
	
  $(this).prop('disabled',true);     
  $("#stopId").prop('disabled',false);

  function startTimer() {
    timer2NS.timeStarted = $.now();
    timer2NS.timeTarget  = timer2NS.timeStarted + timer2NS.timerDuration;

    timer2NS.intervalHandle = setInterval(function () {
      countDownTimer();
    }, 10);
  }

  function countDownTimer() {
    var hours, minutes, seconds, hseconds, hseconds_left, timeLeft;    
    var tiles = document.getElementById("tilesId"); 
	  
    timeLeft = timer2NS.timeTarget - $.now();
	  
    hseconds_left = (timeLeft) / 10;
      
    hours = pad(Math.floor(hseconds_left / 360000));
    hseconds_left = hseconds_left % 360000;
		  
    minutes = pad(Math.floor(hseconds_left / 6000));
    hseconds_left = hseconds_left % 6000;
	  
    seconds = pad(Math.floor(hseconds_left / 100));
    hseconds_left = hseconds_left % 100;
	  
    hseconds = pad(Math.floor(hseconds_left));

    tiles.innerHTML = "<span>" + hours + "</span><span>" + minutes  + "</span><span>" + seconds  + "</span><span>" + hseconds + "</span>"; 
	  
    if (hours + minutes + seconds + hseconds === '00000000') {
      timerExpired();
    }
  }

  function timerExpired() {
    var vid = document.getElementById("videoId"); 
	var handle;
	
	clearInterval(timer2NS.intervalHandle);
	
    handle = setTimeout(function() {
      $("#videoId").css('visibility', 'visible');
      $("#countDownId").css('visibility', 'hidden');
		
      vid.play()
      vid.onended = function() {
        resetTimer();
      };
    }, 1300);
	
    function resetTimer() {
	  $("#videoId").css('visibility', 'hidden');
	  
      timer2NS.timerDuration = (30 * 1000); 
      timer2NS.timeTarget    = 0; 
      timer2NS.timeStarted   = 0; 
	  
	  clearTimeout(handle);
	  location.reload();
    }  
  }
});
	  
$("#stopId").click(function() {
  stopTimer();
		
  $(this).prop('disabled',true);     
  $("#startId").prop('disabled',false);  
  
  function stopTimer() {
    timer2NS.timerDuration = timer2NS.timerDuration - ($.now() - timer2NS.timeStarted);	
    clearInterval(timer2NS.intervalHandle);
  }
});
	
function pad(n) {
  return (n < 10 ? '0' : '') + n;
}
	