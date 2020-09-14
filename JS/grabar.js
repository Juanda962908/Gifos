var imagess = document.getElementById('imageness')
var recorder; 
var image = document.getElementById('imagen')
var nuevoVideo = document.getElementById('isavideo')/// va a cambiar el nombr en elHTML
let form = new FormData();
let daiaId = '';
let apiKey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
let upLoadKey = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`
let resultDisplay = document.getElementById('gridMisGif')
var downloadref = document.getElementById('btn-download')
/*var urlGif = '';*/
//////////
/*var secondimage = document.getElementById('secondpreview');  
var thirdimage = document.getElementById('thirdpreview')  */ 
var ventana_Uno = document.getElementById("ventanaUnoGrabar");   
var ventana_Dos = document.getElementById("ventanaDosGrabar")


/////////////////
document.getElementById("btn-cancel").onclick = function hideShow() {
    ventana_Uno.style.display = "none";
}


function hideShow1(one, two) {
  ventana_Uno.style.display = "none"
  ventana_Dos.style.display = "flex"
}



