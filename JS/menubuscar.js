
window.onload =  ocultarmenu(),ocultarTemas(),SailorDay()

function mostrarmenu(){
   document.getElementById("tipobusquedas").style.height="160px"
    document.getElementById("tipobusquedas").style.visibility='visible'
document.getElementById("tipobusquedas").style.marginTop="15px"
}

function ocultarmenu(){
    document.getElementById("tipobusquedas").style.visibility='hidden'
}

function ocultarTemas(){  
    document.getElementById('TextoTemas').style.visibility='hidden'
}




function Desplegar(){
    //let activador = true
    const Temas= document.getElementById('TextoTemas')    

    if(Temas.style.visibility==='visible'){
        Temas.style.visibility='hidden'        
    }
    else{
        Temas.style.visibility='visible'       
    }
}

function SailorNight(){

    document.getElementById('estilos').href = './CSS/dark.css'
    document.getElementById('logoimagen').src = './images/gifOF_logo_dark.png'
    ocultarTemas()

}

function SailorDay(){
    document.getElementById('estilos').href = './CSS/style.css'
    document.getElementById('logoimagen').src = './images/gifOF_logo.png'
    ocultarTemas()
}









function resultados_de__opciones_busquedas(valorAbuscar) {
  document.getElementById("tendenciatitulo").innerHTML = 'Resultados de busqueda' // Cambio el título  
  document.getElementById("gridtendencias").innerHTML = '' //dejamos el contenido del div gidtrendin vacio
  let Mostrar_resultado = document.getElementById('gridtendencias')
  let apikey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
  let x = document.getElementById("inputbusqueda").value
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${valorAbuscar}&limit=16&offset=0&rating=G&lang=e`;

document.getElementById("sugeridosection").style.visibility = "hidden"
document.getElementById("tendenciasection").style.marginTop="10px"

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      json.data.forEach(item => {
        var gifurl = item.images.original.url;

        const contenedor_imagen = document.createElement('div');
        Mostrar_resultado.appendChild(contenedor_imagen);
        contenedor_imagen.classList.add('gridcontenedorimagen');

        const nuevo_Gif = document.createElement('img');
        contenedor_imagen.appendChild(nuevo_Gif);
        nuevo_Gif.src = gifurl;
        nuevo_Gif.classList.add('gifBuscado');

        const divtitle = document.createElement('div')
        divtitle.classList.add('footer');
        contenedor_imagen.appendChild(divtitle);

        const gtitle = document.createElement('p')
        divtitle.appendChild(gtitle);
        gtitle.innerHTML = item.title;
      })
    })
    .catch(err => console.log(err));
}

function resultados_de_busqueda_sugerido(){
  x="pepsi"
  resultados_de__opciones_busquedas(x)
}

function resultado_similar(){
  x="moto"
  resultados_de__opciones_busquedas(x)

}

 function resultado_otromas(){
   x="programacion"
   resultados_de__opciones_busquedas(x)

 }