/*
    Todo el codigo se engobla en un get, que cuando hay informacion, se ejecuta el programa,
    
    cuando no, sale un mensaje de alerta.
    
*/
$.get("./js/productos.json", data => {

    function guardarProductosEnCarrito(i){

        /*genera un evento en cada boton de los productos */

        $(`.button${i}`).click(() => {

            let productosObject = {
                productoNombre: data.productos[i].nombre,
                productoPrecio: data.productos[i].precio
            }

            if (localStorage.getItem('productos') === null) {
                let productosArray = []
                productosArray.push(productosObject)
                localStorage.setItem('productos', JSON.stringify(productosArray))
            }
            else {
                let productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));
                productosEnLocalStorage.push(productosObject);
                localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage))
            }
            mostrarMensajeDeProductoAgregado(productosObject.productoNombre, i)
        })

    }

    function generarProductos () {

        /*Crea los productos en el DOM*/

        for (let i = 0; i < data.productos.length; i++) {

            $(".main__container").append(
                `<div class ="main__card">
                
                <img src = ${data.productos[i].imagen} class = "main__card--img main__card--element">

                    <h1 class = "main__card--title main__card--element">${data.productos[i].nombre}</h1>
                    <p class = "main__card--p main__card--element">${data.productos[i].descripcion}</p>
                    <h3 class = "main__card--h3 main__card--element">${data.productos[i].precio}</h3>
                    <button class = "main__card--button main__card--element button${i}">AGREGAR AL CARRITO</button>
                    
                    <span class = "main__card--advise main__card--advise${i}"> Producto agregado al carrito </span>

                </div>`
            )

            guardarProductosEnCarrito(i)

        
        }
    }

    /* Indica si los elementos son iguales, o no. */
    const sonCoincidentes = ( elemento1,elemento2 ) => elemento1 === elemento2;

    function mostrarMensajeDeProductoAgregado( nombreDelProducto, i) {

        /*Recorre la lista de productos en localStorage, y muestra un mensaje de " Producto agregado al carrito " , si es que este mismo(su nombre) existe dentro de la base de datos del navegador */
        
        let arrayDeProductosEnLocalStorage = JSON.parse(localStorage.getItem('productos'))
        
        arrayDeProductosEnLocalStorage.forEach( elemento => {
             
            sonCoincidentes(elemento.productoNombre, nombreDelProducto) ? $(`.main__card--advise${i}`).css("visibility", "visible") : null ; 

        });

    }

    generarProductos()
    

}).fail(() => {

    swal("La api no existe");

});

