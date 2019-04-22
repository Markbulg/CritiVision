var video = document.querySelector('#webcam');

function webcam(btn) {
   if(btn == 'pause') {
     video.pause();
   } else {
     video.play();
   }
}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
    video.srcObject = stream;
  })
    .catch(function(e) {
    console.log(e);
  });
}