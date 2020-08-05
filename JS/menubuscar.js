function mostrarmenu(){

   document.getElementById("tipobusquedas").style.height="160px"
    document.getElementById("tipobusquedas").style.visibility='visible'

}

function ocultarmenu(){
    document.getElementById("tipobusquedas").style.visibility='hidden'
}

window.onload =  ocultarmenu()