function tendencias() {
  let apikey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
  let urltendencia = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=16&offset=0&rating=G&lang=e`;
  let Mostrar_resultado = document.getElementById('gridtendencias');
  

  fetch(urltendencia)
    .then(response => {
      return response.json();

    })

    .then(json => {
      console.log(json)

      json.data.forEach(item => {

        const contenedor_imagen = document.createElement('div')
        contenedor_imagen.classList.add('gridcontenedorimagen');
        Mostrar_resultado.appendChild(contenedor_imagen);

        const nuevoGif = document.createElement('img')
        nuevoGif.src = item.images.original.url;
        contenedor_imagen.appendChild(nuevoGif);

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
tendencias();





function resultados_de_busquedas() {
  document.getElementById("tendenciatitulo").innerHTML = 'Resultados de busqueda' // Cambio el título  
  document.getElementById("gridtendencias").innerHTML = '' //dejamos el contenido del div gidtrendin vacio
  let Mostrar_resultado = document.getElementById('gridtendencias')
  let apikey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"
  let x = document.getElementById("inputbusqueda").value
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${x}&limit=16&offset=0&rating=G&lang=e`;

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