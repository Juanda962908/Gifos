var imagess = document.getElementById('imageness')
var recorder; 
var image = document.getElementById('imagen')
var nuevoVideo = document.getElementById('video')
let form = new FormData();
let daiaId = '';
let apiKey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
let upLoadKey = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`
let resultDisplay = document.getElementById('gridMisGif')
var downloadref = document.getElementById('btn-download')


//----------------- Ventanas ----------------------------

var ventana_Uno = document.getElementById("ventanaUnoGrabar") 
var ventana_Dos = document.getElementById("ventanaDosGrabar")
var ventana_Tres = document.getElementById("ventanaTresGrabar")
var ventana_Cuatro = document.getElementById("ventanaCuatroGrabar")
var ventana_Cinco = document.getElementById("ventanaCincoGrabar")
var ventana_Seis = document.getElementById("ventanaSeisGrabar")
var smallprev = document.getElementById("small")


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

function ocultar_Ventana_Cuatro(){
  ventana_Cinco.style.display="none"
  ventana_Uno.style.display="flex"
}

function ocultar_Ventana_Cinco(){
  ventana_Cuatro.style.display="none"
  ventana_Cinco.style.display="block"
}

function ocultar_Ventana_Seis(){
  ventana_Cuatro.style.display="none"
  ventana_Dos.style.display="flex"
}


function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({
  video: true
  })
  .then(function(stream) {
    myvideo.srcObject = stream;
    myvideo.play
    callback && callback(stream)
  })
  .catch(function(error) {
  console.error(error)
  alert("Enciende tu Cámara ")
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
        alert('La camára no está acitvada');
        console.error(error);
    });
  }

  function startRecordingNow() {
  
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




function stopRecordingCallback() {
  imagess.src = URL.createObjectURL(recorder.getBlob())
  descargaGif = URL.createObjectURL(recorder.getBlob())
  console.log(descargaGif)

  form.append('file', recorder.getBlob(), 'juanda.gif')
  console.log(form.get('file'))
  recorder.camera.stop()
}

function stopRecordingNow() {
  this.disabled = true
  recorder.camera.stop()
  recorder.stopRecording(stopRecordingCallback)
};




function postgif() {


  var i = 0;

  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar2");
    var width = 1;
    var id = setInterval(frame, 40);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }



  finishupload = setTimeout(function(){ 
    ventana_Cinco.style.display = "none"
    ventana_Seis.style.display = "block"
  }, 4000);
  
  
  ventana_Cuatro.style.display = "none"
  ventana_Cinco.style.display = "flex"
  
  downloadref.href = descargaGif



///////Con esto sube el Gif a Giphy

    fetch(upLoadKey, {
        method: "POST",
        body: form
    })
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(data =>{
        let dataId = data.data.id;
        fetch("https://api.giphy.com/v1/gifs/"+dataId+"?&api_key="+apiKey)
            .then(response => {
                return response.json()
            })
            .then(obj => {
                console.log(obj)

                urlGif = obj.data.images.original.url;
                smallprev.src = urlGif;
                console.log(urlGif);

                var aninput = document.getElementById("emptyfield");
                aninput.value = urlGif;


                localStorage.setItem(dataId, JSON.stringify(obj));//envio al local Storage el data id
                console.log(localStorage)                 //y su contenido (obj) para guardarlo, por cada gif subido
                    
                var kv = localStorage.getItem(dataId);
                var kvParse = JSON.parse(kv);  //le saco el stringgify
                var keyUrl = kvParse.data.images.original.url; //obtengo la URL para poder mostrar el Gif

                const trendCaja = document.createElement('div');//con esto hago que mi Gif recien grabado y subido al locasStorage
                resultDisplay.appendChild(trendCaja);          //aparezca en la seccion sin necesidad de recargar la pagina
                trendCaja.classList.add('gridCont');

                const nuevoGif = document.createElement('img');
                trendCaja.appendChild(nuevoGif);
                nuevoGif.src = keyUrl;
                })
            })
       
       

}




function move() {
  var i = 0

  if (i == 0) {
    i = 1
    var elem = document.getElementById("myBar")
    var width = 1;
    var id = setInterval(frame, 0.2);
    function frame() {
      if (width >= 100) {
        clearInterval(id)
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%"
      }
    }
  }
}


function cargarLocalStorage(){

  for(i = 0; i < localStorage.length; i++){
      var keyval = localStorage.key(i);

      var kv = localStorage.getItem(keyval);
      var kvParse = JSON.parse(kv);  //le saco el stringgify
      var keyUrl = kvParse.data.images.original.url; //obtengo la URL para poder mostrar el Gif en el contenedor (Mis GUIFOS)

      const trendCaja = document.createElement('div');
      resultDisplay.appendChild(trendCaja);
      trendCaja.classList.add('gridCont');

      const nuevoGif = document.createElement('img');
      trendCaja.appendChild(nuevoGif);
      nuevoGif.src = keyUrl;
  }
}
cargarLocalStorage();
 





function myStopFunction() {
  clearTimeout(finishupload)
  ventana_Cinco.style.display = "none"
  ventana_Uno.style.display = "block"
}

function hideall() {
  location.reload()
  ventana_Seis.style.display = "none"
  ventana_Uno.style.display = "block"
}


function copytext() {
  var copyhere = document.getElementById('fieldforcopy')
  copyhere.value = urlGif
  var copyText = document.getElementById("myInput")
  
  copyhere.select()
  
  document.execCommand("copy")
  alert("Yay! Ya tenés tu enlace copiado al portapapeles")
}


