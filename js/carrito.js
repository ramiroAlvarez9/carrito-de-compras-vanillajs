let productosEnLocalStorage =JSON.parse(localStorage.getItem('productos')) ;

for (let i = 0 ; i < productosEnLocalStorage.length;i++){

    $(".main").append( `
    <div class ="productos__container">
            <h6 class ="productos__container--nombre">${productosEnLocalStorage[i].productoNombre}</h6>
                <div class ="productos__container--precio" >${productosEnLocalStorage[i].productoPrecio}$</div>
                <a href = "carrito.html" class = "productos__container--delete deleteButton${i}">Eliminar ${productosEnLocalStorage[i].productoNombre} del carrito</button>
            </div>
    </div>`
    )
    $(`.deleteButton${i}`).click(() => {
        
        if(productosEnLocalStorage[i].productoNombre === productosEnLocalStorage[i].productoNombre ){

            productosEnLocalStorage.splice(i,1);

        }
        localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage));
    })

    
}

