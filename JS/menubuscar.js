//Constante que se ejecuta cuando se carga la página inicialmente
window.onload = ocultarmenu(), ocultarTemas(), SailorDay()
var wordSugerido
var wordSimilar
var WordOtroMas
const resultSugerido =document.getElementById('resultadosugerido')
const resultSimilar = document.getElementById('resultadosimilar')
const resultOtromas = document.getElementById('otromas')
const opcionesBusqueda = document.getElementById('tipobusquedas')
const contenedorBusquedas = document.getElementById('contenedorbusqueda')
contenedorBusquedas.onmousemove = ocultarmenu()
//-------------------------------------------------------------------------------------------------
/** Funcón que define el estilo a mostrar del menú buscar
 * 
 */
function mostrarmenu() {
  document.getElementById("tipobusquedas").style.height = "160px"
  document.getElementById("tipobusquedas").style.visibility = 'visible'
  document.getElementById("tipobusquedas").style.marginTop = "15px"
}


//-------------------------------------------------------------------------------------------------
/**Función que al ser llamada oculta el menú de buscar
 * 
 */
function ocultarmenu() {

  document.getElementById("tipobusquedas").style.visibility = 'hidden'
}
//-------------------------------------------------------------------------------------------------
/**Función que oculta las opciones de estilo de la página
 * 
 */

function ocultarTemas() {
  document.getElementById('TextoTemas').style.visibility = 'hidden'
}


//-------------------------------------------------------------------------------------------------
/** Función que despliega el box de los temas
 * 
 */

function Desplegar() {
  //let activador = true
  const Temas = document.getElementById('TextoTemas')

  if (Temas.style.visibility === 'visible') {
    Temas.style.visibility = 'hidden'
  } else {
    Temas.style.visibility = 'visible'
  }
}


//-------------------------------------------------------------------------------------------------
/** Función que toma el color de los estilos Night y los aplica a la página
 * 
 */

function SailorNight() {

  document.getElementById('estilos').href = './CSS/dark.css'
  document.getElementById('logoimagen').src = './images/gifOF_logo_dark.png'
  ocultarTemas()

}

//-------------------------------------------------------------------------------------------------
/**Función que toma el color Day y los aplica a la página
 * 
 */


function SailorDay() {
  document.getElementById('estilos').href = './CSS/style.css'
  document.getElementById('logoimagen').src = './images/gifOF_logo.png'
  ocultarTemas()
}

//-------------------------------------------------------------------------------------------------
/**Función que habilita o deshabilita el botón de buscar según se escribe o no 
 * Esta función se activa con el evento onkeyup desde el archivo html
 */



function ActivaDesactivaBotonBuscar() {
  var inputValorBuscar = document.getElementById("inputbusqueda")
  var botonBuscar = document.getElementById("botonlupa")


  if (inputValorBuscar.value.trim() !== "") {
    console.log(inputValorBuscar.value)
    botonBuscar.removeAttribute('disabled')
    buscarWord(inputValorBuscar.value)
    contenedorBusquedas.onmouseout = mostrarmenu()
    
  } else {
    botonBuscar.setAttribute('disabled', 'true')
    resultSugerido.innerHTML = ' '
    resultSimilar.innerHTML = ' '
    resultOtromas.innerHTML = ' '
    contenedorBusquedas.onmousemove = ocultarmenu()
    
  }

}

//-------------------------------------------------------------------------------------------------
/** Funcción que realiza la busqueda de algún tema sugerido
 * 
 */


function resultados_de__opciones_busquedas(valorAbuscar) {


  document.getElementById("tendenciatitulo").innerHTML = 'Resultados de busqueda para:  ' + valorAbuscar
  document.getElementById("gridtendencias").innerHTML = ''
  let Mostrar_resultado = document.getElementById('gridtendencias')
  let apikey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${valorAbuscar}&limit=16&offset=0&rating=G&lang=e`
  document.getElementById('inputbusqueda').value = ''
  document.getElementById("sugeridosection").style.visibility = "hidden"
  document.getElementById("tendenciasection").style.marginTop = "10px"
   
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      json.data.forEach(item => {
        var gifurl = item.images.original.url

        const contenedor_imagen = document.createElement('div')
        Mostrar_resultado.appendChild(contenedor_imagen)
        contenedor_imagen.classList.add('gridcontenedorimagen')

        const nuevo_Gif = document.createElement('img')
        contenedor_imagen.appendChild(nuevo_Gif)
        nuevo_Gif.src = gifurl
        nuevo_Gif.classList.add('gifBuscado')

        const divtitle = document.createElement('div')
        divtitle.classList.add('footer')
        contenedor_imagen.appendChild(divtitle)

        const gtitle = document.createElement('p')
        divtitle.appendChild(gtitle)
        gtitle.innerHTML = item.title
      })
    })
    .catch(err => console.log(err))

   


}

function resultados_de_busqueda_sugerido() {
  
  resultados_de__opciones_busquedas(wordSugerido)
  ocultarmenu()
  guardarBusqueda(wordSugerido)
}

function resultado_similar() {
  
  resultados_de__opciones_busquedas(wordSimilar)
  ocultarmenu()
  guardarBusqueda(wordSimilar)

}

function resultado_otromas() {
  
  resultados_de__opciones_busquedas(WordOtroMas)
  ocultarmenu()
  guardarBusqueda(WordOtroMas)

}

//-------------------------------------------------------------------------------------------------

/**Función que guarda 4 busquedas y las muestra, a la quinta busqueda vuelve a guardar hasta tener 4 busquedas
 * 
 */

var arrayHistorial = []
const contenedorHistorial = document.getElementById('contenedorHistorial')

function guardarBusqueda (textBusqueda) {
  arrayHistorial.push(textBusqueda)    
  arrayHistorial.forEach(element =>{
    contenedorHistorial.innerHTML += `<div class="box">${'#'}${element}</div>`
    arrayHistorial=[]      
  })
  

}
//-------------------------------------------------------------------------------------------------
/**Función que llama a la api Datamuse para buscar palabras relacionadas
 * 
 */


/* 
const btnBUscar = document.getElementById('buscar') */
/* btnBUscar.addEventListener('click', buscarWord) */

function buscarWord(valorWord){



  const url = 'https://api.datamuse.com/words?ml='+valorWord
    fetch(url)
    .then(res => res.json())
    .then(data => {
      /*   console.log(data) */
       console.log(data[0].word)
    /*    console.log(data[1].word)
       console.log(data[2].word) */
       resultSugerido.innerHTML = data[0].word
       resultSimilar.innerHTML = data[1].word
       resultOtromas.innerHTML = data[2].word 

       wordSugerido=(data[0].word)
       wordSimilar=(data[1].word)
       WordOtroMas=(data[2].word)


    
    })

    .catch(err => console.log(err))

}