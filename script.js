const boton_subida = document.getElementById("boton_subir_resenia");

function agregar_resenia()
{
    //Se obtienen las constantes de elementos de la pagina ya existentes
    const titulo_resenia = document.getElementById("titulo").value;
    const imagen_portada = document.getElementById("portada").value;
    const resenia_texto = document.getElementById("resenia_texto_principal").value;
    const cuerpo_articulos = document.getElementById("resenias_total");
    const urlPattern = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+\/?)\S*$/;

    //Se verifica la validez de los datos ingresados, si se falla algun checkeo se sale de la funcion
    if(titulo_resenia.length < 2 || titulo_resenia.length > 120)
    {
        alert("El titulo de la novela debe tener entre 2 y 120 caracteres");
        return;
    }
    else if(resenia_texto.length < 500 || resenia_texto.length > 2000)
    {
        alert("La reseña debe tener entre 500 y 2000 caracteres");
        return;
    }
    else if(!urlPattern.test(imagen_portada.trim()))
    {
        alert("Debe ingresar una URL valida de la imagen de portada de la novela");
        return;
    }

    /*Como parte del proceso de verificacion se checkea si el link ingresado carga exitosamente una imagen,
    si funciona se agrega el articulo a la pagina si no es rechazado */
    let imagen_nueva = document.createElement("img");
    imagen_nueva.setAttribute("src", imagen_portada);
    imagen_nueva.setAttribute("alt", "Imagen no disponible");
    imagen_nueva.onerror = function()
    {
        alert("La URL ingresada no es un link a una imagen");
        return;
    }
    imagen_nueva.onload = function()
    {
        let titulo_nuevo = document.createElement("h3");
        titulo_nuevo.innerText = titulo_resenia;
        let texto_nuevo = document.createElement("p");
        texto_nuevo.innerText = resenia_texto;
        let nueva_resenia = document.createElement("article");
        nueva_resenia.append(imagen_nueva, titulo_nuevo, texto_nuevo);

        /*Con queryselector se busca al primer articulo de la pagina y se inserta al nuevo articulo antes de este,
        de esta manera el nuevo articulo aparece al principio de la pagina. */
        cuerpo_articulos.insertBefore(nueva_resenia, document.querySelector("article"));
    }
}

boton_subida.addEventListener("click", agregar_resenia);