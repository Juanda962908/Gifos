// Función para hacer el llamado y colocar los gifs//

function resultadosDeBusquedas(){
    document.getElementById("tendenciatitulo").innerHTML = 'Resultados de busqueda' // Cambio el título  
    document.getElementById("gridtendencias").innerHTML ='' //dejamos el contenido del div gidtrendin vacio
    let Mostrar_resultado = document.getElementById('gridtendencias')
    let x = "shoes"

    let searchitemsurl = 'https://api.giphy.com/v1/gifs/search?api_key=0wR2gDCbwTeV9uLT48UGhTtnp9HGMYpY&q=' + x + '&limit=16&offset=0&rating=G&lang=en';

    fetch(searchitemsurl)
        .then(response => {
            return response.json();
        })
        .then(json => {
            json.data.forEach (item => {
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

function busquedaOp1(){

    resultadosDeBusquedas()

}