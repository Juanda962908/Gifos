var imagess = document.getElementById('imageness');
var recorder; 
var image = document.getElementById('imagen');
var nuevoVideo = document.getElementById('isavideo');/// va a cambiar el nombr en elHTML
let form = new FormData();
let daiaId = '';
let apiKey = '0wR2gDCbwTeV9uLT48UGhTtnp9HGMYpY';
let upLoadKey = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
let resultDisplay = document.getElementById('gridMisGif');
var downloadref = document.getElementById('btn-download');
/*var urlGif = '';*/
//////////
/*var secondimage = document.getElementById('secondpreview');  
var thirdimage = document.getElementById('thirdpreview')  */ 
var first = document.getElementById("window1");   
var second = document.getElementById("window2");
var third = document.getElementById("window3"); 
var fourth = document.getElementById("window4");  
var fifth = document.getElementById("window5");   
var sixth = document.getElementById("window6");
var smallprev = document.getElementById("small");
////


/////////////////
document.getElementById("btn-cancel").onclick = function hideShow() {
    first.style.display = "none";
}

function hideShow1(one, two) {
    first.style.display = "none";
    second.style.display = "flex";
  }

  function hideShow2() {
    second.style.display = "none";
    third.style.display = "flex";
  }

  function hideShow3() {
    third.style.display = "none";
    fourth.style.display = "flex";
  }

  function hideShow6() {
    fourth.style.display = "none";
    second.style.display = "flex";
  }

  function hideShow4() {
    fifth.style.display = "none";
    first.style.display = "block"
  }
  function hideShow5() {
    fourth.style.display = "none"
    fifth.style.display = "block";
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
  });
  }

//////



////////////



//ver preview
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

//graba el guif
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
//empieza a grabar y genera un archivo de esa grabacion
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


function stopRecordingCallback() {
    imagess.src = URL.createObjectURL(recorder.getBlob()); /*para mostrar preview?*/
    descargaGif = URL.createObjectURL(recorder.getBlob());/*descarga URL*/
    console.log(descargaGif);

    form.append('file', recorder.getBlob(), 'andy.gif');
    console.log(form.get('file'))
    recorder.camera.stop(); //sino como freno la camara?s
}

function stopRecordingNow() {
    this.disabled = true;
    recorder.camera.stop();
    recorder.stopRecording(stopRecordingCallback);
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
  fifth.style.display = "none";
  sixth.style.display = "block";
}, 5000);


fourth.style.display = "none";
fifth.style.display = "flex";

downloadref.href = descargaGif;



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
        fetch("https://api.giphy.com/v1/gifs/" + dataId + "?&api_key=" +apiKey)
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



















//para cuando se cancela la carga del guif, y tambien te deberia llevar a la primera ventana
function myStopFunction() {
  clearTimeout(finishupload);
  fifth.style.display = "none";
  first.style.display = "block";
}
//para volver a iniciar el ciclo en la ultima pantalla
function hideall() {
  sixth.style.display = "none";
  first.style.display = "block"
}

//para copiar el enlace del guif (ultima pantalla)
function copytext() {
  var copyhere = document.getElementById('fieldforcopy');
  copyhere.value = urlGif;
  var copyText = document.getElementById("myInput");//copia al porta papeles
  
  copyhere.select();/* Select the text field */
  
  document.execCommand("copy");/* Copy the text inside the text field */
  alert("Yay! Ya tenés tu enlace copiado al portapapeles");
}


//para hacer la barra de carga
function move() {
  var i = 0;

  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 0.2);
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
}

function clearLocalStorage(){

  window.onload = localStorage.clear();
}

clearLocalStorage()

