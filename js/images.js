$(function() {
  // Set menu
  $("#navBarId").load("menu.html", function() {
	var activeItem, navBar;
	
    navBar = document.getElementById('navBarId');
    activeItem = document.querySelector('[href="images.html"]');
	navBar.classList.add('ui-navpanel');
    activeItem.classList.add('ui-active');
  });
  
  
  var imagesLoaded = document.createAttribute('imagesLoaded');
  var input        = document.getElementById('upload-areaId');
  
  input.setAttributeNode(imagesLoaded);
  imagesLoaded.value = 'none';
  
  $("#rowId").hide();
  $("#images-containerId").hide();
  $("#progressContainerId").hide(); 
  $("#instructionId").hide();   
  $("#cancel-upload-btnId").prop('disabled',true);  
});

function readImages(p_input) {
  if (p_input.files && p_input.files[0]) {
	$("#upload-btnId").prop('disabled',true);     
    $("#cancel-upload-btnId").prop('disabled',false);  
  
	var fileLen      = p_input.files.length;
	var imagesLoaded = p_input.getAttributeNode('imagesLoaded');

 	if (fileLen > 1) {
	  imagesLoaded.value = 'more';
	  processMore(p_input);
	}
	else {
	  imagesLoaded.value = 'one';
	  processOne(p_input);
	}
  }
}    
	
function  processOne(p_input) {
  var container = document.getElementById('image-containerId');
  var $rowId    = $('#rowId');
  
  container.innerHTML = '';
  $rowId.show(function() {
    var reader = new FileReader();
	reader.onload = function(e) {
      var img = new Image();
	  
	  $('#upload-area-containerId').hide();
	  
	  img.src = e.target.result; // File contents here
      img.setAttribute("class", "image");
	  img.setAttribute("id", "uploadId"); 
	  container.appendChild(img);
	  
	  img.onload = function() {
        loadComplete();
      }
    };

    reader.readAsDataURL(p_input.files[0]);
  });
}

function processMore(p_input) {
  var file;
  var container  = document.getElementById('images-containerId');
  var $container = $('#images-containerId');
  var $instruction = $('#instructionId');
  var fileLen    = p_input.files.length;
  var progress   = document.getElementById('progressId');
  var $progressContainer  = $('#progressContainerId');
  
  progress.max = fileLen;
  $progressContainer.show();
  $instruction.show();

  $container.show(function() {
	for(var x = 0; x < fileLen; x++) {
	  setLi(container, x);
	}
	
    for(var x = 0; x < fileLen; x++) {
	  file = p_input.files[x];
	  
	  if(file.type.indexOf('image') != -1) {     // Very primitive validation

        var reader = new FileReader();
		
        reader.onload = (function(p_index, f) {
		  return function(e) {
            var li    = document.getElementById('li' + p_index);
	        var img   = document.createElement('img');
		  
		    $('#upload-area-containerId').hide();
	        img.src = e.target.result;             // File contents here
	        img.setAttribute("class", "images");
		    li.appendChild(img);
		  
		    if (img.complete) {
			  imgComplete(img);
	        }
            else {
              img.onload = function() {
                imgComplete(this);
	          };
			  img.onerror = function() {
                imgError(this);
	          };
		    }
	
		    $(img).click(function() {
              imageClicked(p_input, this);
            });
		  
          };
		})(x, file);
		
        reader.readAsDataURL(file);
	  }
	}
	
	function setLi(p_container, p_index) {
	  var li = document.createElement('li');
	  
	  li.setAttribute('id', 'li' + p_index);
	  li.classList.add('li');
	  li.classList.add('is-loading');
	  p_container.appendChild(li);
	}
	
	function imgComplete(p_img) {
      var li = p_img.parentElement;
  
      progress.value++;
      li.classList.remove('is-loading');
    }

    function imgError(p_img) {
      var li = p_img.parentElement;
  
      li.classList.remove('is-loading');
      li.classList.add('is-broken');
    }

    function imageClicked(p_input, p_img) {
      var containerOne = document.getElementById('image-containerId');
      var $rowId       = $('#rowId');
	  var imagesLoaded = p_input.getAttributeNode('imagesLoaded');
 
      while (container.hasChildNodes()) {                              //delete images
        container.removeChild(container.firstChild);
      } 
  
      container.value='';                                              //reset area
      $container.hide();
	  $progressContainer.hide();
	  $instruction.hide();
  
      $rowId.show(function() {
	    p_img.classList.remove("images");
	    p_img.classList.add("image");
	    p_img.setAttribute("id", "uploadId");
	
        containerOne.appendChild(p_img);
	    if (p_img.complete) {
          loadComplete();
	    }
        else {
          p_img.onload = function() {
            loadComplete();
	      }
	    }
      });
  
      imagesLoaded.value = 'one';
    }

  });
}
	

function loadComplete() {
  imageZoom("uploadId", "resultId");
}

function removeUpload() {
  var progress     = document.getElementById('progressId');
  var input        = document.getElementById('upload-areaId');
  var imagesLoaded = input.getAttributeNode('imagesLoaded');
  $("#cancel-upload-btnId").prop('disabled',true);
  $("#upload-btnId").prop('disabled',false);    
  
  if (imagesLoaded.value == "one")
	removeOne();
  else
	removeMore();

  imagesLoaded.value = 'none';
  progress.value = '0';
}
  
function removeOne() {
  var img, lens;
 
  img  = document.getElementById("uploadId");
  lens = document.getElementById("img-zoom-lensId");
  
  lens.parentNode.removeChild(lens);
  img.parentNode.removeChild(img);
  
  document.getElementById('upload-areaId').value='';               //reset area
  document.getElementById('image-containerId').value='';
  document.getElementById('resultId').value='';
 
  $("#rowId").hide(); 
  $('#upload-area-containerId').show();
}

function removeMore() {
  var container  = document.getElementById('images-containerId');
  var $container = $('#images-containerId');
  var $progressContainer = $('#progressContainerId');
  var $instruction = $('#instructionId');
  
  while (container.hasChildNodes()) {   
    container.removeChild(container.firstChild);
  } 
  
  document.getElementById('upload-areaId').value='';               //reset area
  container.value='';                                              //reset area
  $container.hide();
  $progressContainer.hide();
  $instruction.hide();
  $('#upload-area-containerId').show();
}

$('#upload-area-containerId').bind('dragover', function () {
  $('#upload-area-containerId').addClass('image-dropping');
});

$('#upload-area-containerId').bind('dragleave', function () {
  $('#upload-area-containerId').removeClass('image-dropping');
});

function imageZoom(p_img, p_result) {
      var img, lens, result, cx, cy;
	  
      img    = document.getElementById(p_img);
      result = document.getElementById(p_result);
      
      lens = document.createElement("DIV");              // create lens:
      lens.setAttribute("class", "img-zoom-lens");
	  lens.setAttribute("id", "img-zoom-lensId");
     
      img.parentElement.insertBefore(lens, img);         // insert lens:
      
      cx = result.offsetWidth / lens.offsetWidth;        // calculate the ratio between result DIV and lens:
      cy = result.offsetHeight / lens.offsetHeight;
	  
      result.style.backgroundImage = "url('" + img.src + "')";  // set background properties for the result DIV:
      result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
     
      lens.addEventListener("mousemove", moveLens);
	  lensmousemove = true;
	  
      img.addEventListener("mousemove", moveLens);
	  imgmousemove = true;
     	  
      lens.addEventListener("touchmove", moveLens);       // and also for touch screens:
	  lenstouchmove = true;
	  
      img.addEventListener("touchmove", moveLens);
	  imgtouchmove = true;
	  
      function moveLens(e) {
        var pos, x, y;
        
        e.preventDefault();                               // prevent any other actions that may occur when moving over the image:
        
        pos = getCursorPos(e);
        
        x = pos.x - (lens.offsetWidth / 2);               // calculate the position of the lens:
        y = pos.y - (lens.offsetHeight / 2);
        
        if (x > img.width - lens.offsetWidth) {           // prevent the lens from being positioned outside the image:
		  x = img.width - lens.offsetWidth;
		}
        if (x < 0) {
		  x = 0;
		}
        if (y > img.height - lens.offsetHeight) {
		  y = img.height - lens.offsetHeight;
		}
        if (y < 0) {
		  y = 0;
		}
        
        lens.style.left = x + "px";                       // set the position of the lens:
        lens.style.top  = y + "px";
        
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";   //display what the lens "sees":
      }
	  
      function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        
        a = img.getBoundingClientRect();                  // get the x and y positions of the image:
        
        x = e.pageX - a.left;                             // calculate the cursor's x and y coordinates, relative to the image:
        y = e.pageY - a.top;
        
        x = x - window.pageXOffset;                       // consider any page scrolling: 
        y = y - window.pageYOffset;
        return {x : x, y : y};
      }
}
	