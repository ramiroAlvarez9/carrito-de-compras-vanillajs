/*
    Todo el codigo se engobla en un get, que cuando hay informacion, se ejecuta el programa,
    
    cuando no, sale un mensaje de alerta.
    
*/
$.get("./js/productos.json", data => {

    function generarProductos() {

        /*Crea los productos en el DOM*/

        for (let i = 0; i < data.productos.length; i++) {

            $(".main__container").append(
                `<div class ="main__card">
                
                <img src = ${data.productos[i].imagen} class = "main__card--img main__card--element">

                    <h1 class = "main__card--title main__card--element">${data.productos[i].nombre}</h1>
                    <p class = "main__card--p main__card--element">${data.productos[i].descripcion}</p>
                    <h3 class = "main__card--h3 main__card--element">${data.productos[i].precio}</h3>
                    <button class = "main__card--button main__card--element button${i}">AGREGAR AL CARRITO</button>
                    
                    <span class = "main__card--advise main__card--advise-${data.productos[i].nombre}"> Producto agregado al carrito </span>

                </div>`
            )

            guardarProductosEnCarrito(i)

            actualizarMensajeDeProductoAgregadoYContadorDeCarrito(data.productos[i].nombre)
        }
    }


    function guardarProductosEnCarrito(i) {
        /*
        
            Genera un evento en cada boton de los productos 
            Cuando se ejecuta el evento, se guarda el producto en el localStorage, y se muestra un mensaje de "producto agregado al carrito".
        */

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


            mostrarMensajeDeProductoAgregado(productosObject.productoNombre)

            //en cada click, actualiza el contador del carrito]

            actualizarContadorDeCarritoDeCompras()

        })
    }

    /* Muestra el mensaje de producto agregado en cada uno de los mismos */
    const mostrarMensajeDeProductoAgregado = nombreDelProducto => $(`.main__card--advise-${nombreDelProducto}`).css("visibility", "visible");
    
    /*Toma el largo del array que se encuentra enlocalStorage, y devuelve el numero del mismo.*/
    const cantidadDeComprasDelCarrito = () => JSON.parse(localStorage.getItem('productos')).length;


    function actualizarContadorDeCarritoDeCompras() {

        /* Muestra en el DOM la cantidad de productos agregados al carrito. */

        if(JSON.parse(localStorage.getItem('productos')).length === 0 ) {
            
            $(".header__carritoCounterLength").css("visibility", "hidden");

        } else {

            $(".header__carritoCounterLength").css("visibility", "visible");

            $(".header__carritoCounterLength").text(cantidadDeComprasDelCarrito())

        }
    }

    function actualizarMensajeDeProductoAgregadoYContadorDeCarrito(nombreDelProducto) {

        /*Recorre la lista de productos en localStorage, y muestra un mensaje de " Producto agregado al carrito " , si es que este mismo(su nombre) existe dentro de la base de datos del navegador */

        let arrayDeProductosEnLocalStorage = JSON.parse(localStorage.getItem('productos'))

        arrayDeProductosEnLocalStorage.forEach(elemento => {

            elemento.productoNombre === nombreDelProducto ? $(`.main__card--advise-${nombreDelProducto}`).css("visibility", "visible") : null;

        });

        actualizarContadorDeCarritoDeCompras()

    }


    generarProductos()


}).fail(() => {

    swal("La api no existe");

});

