function buscar_sugeridos() {
  let contenedor_sugerido = document.getElementById("sugeridos")
  let sugeridos_hoy = ["bread", "Messi", "Avión", "Guitarra"]
  let apikey = "8Oc7NtbE0yskmJrjyzaHNBxjHycKZ3pp"

  sugeridos_hoy.forEach(items=>{

    let url_sugeridos = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${items}&limit=1&offset=0&rating=G&lang=e`

    fetch(url_sugeridos)
    .then(response=>{
      return response.json()
    })
    .then(json=>{

      json.data.forEach(obj=>{

        let url = obj.images.original.url

        const cajagif_sugerido = document.createElement('div')
        cajagif_sugerido.classList.add('cajagifsugerido')
        contenedor_sugerido.appendChild(cajagif_sugerido)

        const titulo_sugerido = document.createElement('div')
        titulo_sugerido.classList.add("contenedortitulo")
        cajagif_sugerido.appendChild(titulo_sugerido)

        const parrafo_sugerido = document.createElement('p')
        parrafo_sugerido.classList.add('parrafosugerido')
        titulo_sugerido.appendChild(parrafo_sugerido)
        parrafo_sugerido.innerHTML = `#${obj.title}`

        const boton_cerrar = document.createElement('img')
        boton_cerrar.classList.add("botoncerrar")
        titulo_sugerido.appendChild(boton_cerrar)
        boton_cerrar.src = "./images/button3.svg"

        const imagen_sugerido = document.createElement('img')
        imagen_sugerido.classList.add("imagensugerido")
        cajagif_sugerido.appendChild(imagen_sugerido)
        imagen_sugerido.src = url

        const boton_vermas = document.createElement('button')
        boton_vermas.classList.add('vermas');
        cajagif_sugerido.appendChild(boton_vermas);
        boton_vermas.onclick = function boton_ver_masresultados(){

        document.getElementById('gridtendencias').innerHTML = ''
        const Mostrar_resultado = document.getElementById('gridtendencias')
        const tendencia_titulo = document.getElementById('tendenciatitulo').innerHTML
        const cambiar_titulo = tendencia_titulo.replace("Tendencias","Resultados de busqueda")
        document.getElementById("tendenciatitulo").innerHTML = cambiar_titulo 
        
        var buscar_item = items

        let buscar_item_url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${buscar_item}&limit=16&offset=0&rating=G&lang=e`



        fetch(buscar_item_url)
        .then(response => {
          return response.json()
        })
        .then(json => {
          json.data.forEach(item => {
            var gifurl = item.images.original.url;
    
            const contenedor_imagen = document.createElement('div')
            Mostrar_resultado.appendChild(contenedor_imagen)
            contenedor_imagen.classList.add('gridcontenedorimagen')
    
            const nuevo_Gif = document.createElement('img')
            contenedor_imagen.appendChild(nuevo_Gif)
            nuevo_Gif.src = gifurl;
            nuevo_Gif.classList.add('gifBuscado');
    
            const divtitle = document.createElement('div')
            divtitle.classList.add('footer')
            contenedor_imagen.appendChild(divtitle);
    
            const gtitle = document.createElement('p')
            divtitle.appendChild(gtitle);
            gtitle.innerHTML = item.title;
          })
        })
        .catch(err => console.log(err))
        }

        const texto_boton = document.createElement('p')
        texto_boton.classList.add('vermasp')
        boton_vermas.appendChild(texto_boton)

        var vermastext = document.createTextNode("Ver más")
        texto_boton.appendChild(vermastext)




      })
    })    
  }) 

}


buscar_sugeridos()