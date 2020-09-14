
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

