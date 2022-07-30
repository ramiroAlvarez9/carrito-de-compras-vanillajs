let productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));

/*Toma el largo del array que se encuentra en localStorage, y devuelve el numero del mismo.*/

const cantidadDeComprasDelCarrito = () => JSON.parse(localStorage.getItem('productos')).length;

//filtra los precios del carrito de compras
const preciosDelCarrito = productosEnLocalStorage.map(element => element.productoPrecio)

//retorna la sumatoria de los precios en el carrito de compras.
const totalAPagarActual = preciosDelCarrito.reduce( (acumulador, numero) => acumulador + numero, 0)

//actualiza el precio total a pagar        
const actualizarTotalAPagarActual = () => $(".totalAPagar__container--text--number").text( `total a pagar: ${totalAPagarActual}` ) 


function mostrarProductosAgregadosEnPantalla() {


    /* Muestra las productos agregados al carrito de compras en pantalla, que se encuentran en localStorage */

    for (let i = 0; i < productosEnLocalStorage.length; i++) {

        $(".main").append(`
        <div class ="productos__container">
            <h6 class ="productos__container--nombre">${productosEnLocalStorage[i].productoNombre}</h6>
                <div class ="productos__container--precio" >${productosEnLocalStorage[i].productoPrecio}$</div>
                <a href = "carrito.html" class = "productos__container--delete deleteButton${i}">Eliminar ${productosEnLocalStorage[i].productoNombre} del carrito</button>
            </div>
        </div>`
        )



        $(`.deleteButton${i}`).click(() => {

            if (productosEnLocalStorage[i].productoNombre === productosEnLocalStorage[i].productoNombre) {

                productosEnLocalStorage.splice(i, 1);

            }
            localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage));


            
        })


    }

    actualizarContadorDeCarritoDeCompras()

    actualizarTotalAPagarActual()
}


function actualizarContadorDeCarritoDeCompras() {

    /* Muestra en el DOM la cantidad de productos agregados al carrito. */

    if (JSON.parse(localStorage.getItem('productos')).length === 0) {

        $(".header__carritoCounterLength").css("visibility", "hidden");

    } else {

        $(".header__carritoCounterLength").css("visibility", "visible");

        $(".header__carritoCounterLength").text(cantidadDeComprasDelCarrito())

    }
}

mostrarProductosAgregadosEnPantalla()