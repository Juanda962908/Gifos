var imagess = document.getElementById('imageness')
var recorder; 
var image = document.getElementById('imagen')
var nuevoVideo = document.getElementById('video')/// va a cambiar el nombr en elHTML
let form = new FormData();
let daiaId = '';
let apiKey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
let upLoadKey = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`
let resultDisplay = document.getElementById('gridMisGif')
var downloadref = document.getElementById('btn-download')
var ventana_Uno = document.getElementById("ventanaUnoGrabar");   
var ventana_Dos = document.getElementById("ventanaDosGrabar")
var ventana_Tres = document.getElementById("ventanaTresGrabar")

/////////////////
document.getElementById("btn-cancel").onclick = function hideShow() {
    ventana_Uno.style.display = "none";
}


function ocultar_Ventana_Uno(one, two) {
  ventana_Uno.style.display = "none"
  ventana_Dos.style.display = "flex"
}

function ocultar_Ventana_Dos(one,two){
  ventana_Dos.style.display = "none";
  ventana_Tres.style.display = "flex";
}

function ocultar_Ventana_Tres() {
  ventana_Tres.style.display = "none";
  ventana_Cuatro.style.display = "flex";
}


function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({
  video: true
  })
  .then(function(stream) {
    myvideo.srcObject = stream;
    myvideo.play();
    callback && callback(stream);
  })
  .catch(function(error) {
  console.error(error);
  alert("Ups, necesitamos tu cámara! Actualiza la página y vuelve a intentarlo");
  })
  }


  function verImagen(){
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
        height: {max: 480}        
        }
    })
        .then(function(stream){
            nuevoVideo.srcObject = stream;
            nuevoVideo.play();
        })
        .catch(err => console.log(err))
    }


    function captureCamera(callback) {
      navigator.mediaDevices.getUserMedia({ 
          video: true 
      })
      .then(function(camera) {
          callback(camera);
      }).catch(function(error) {
          alert('Unable to capture your camera. Please check console logs.');
          console.error(error);
      });
  }


  function startRecordingNow() {
  
    /*this.disabled = true;*/
    captureCamera(function(camera) {
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
            },
            onGifPreview: function(gifURL) {
                image.src = gifURL;
            }
        });
        recorder.startRecording();
        recorder.camera = camera;
        document.getElementById('btn-stop-recording').disabled = false;
    });
};
