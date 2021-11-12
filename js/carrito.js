


const mostrarProductosDelCarrito = () => {
    let productosEnLocalStorage =JSON.parse(localStorage.getItem('productos'));
    const productosContainer = document.querySelector('.main');
    console.log(productosContainer)
    for(let i = 0; i < productosEnLocalStorage.length; i++){
    
        let nombre = productosEnLocalStorage[i].productoNombre;
        let precio = productosEnLocalStorage[i].productoPrecio;
    
        productosContainer.innerHTML += `

            <div class ="productos__container">

                    <h6 class ="productos__container--nombre">${nombre}</h6>
                        <div class ="productos__container--precio" >${precio}$</div>
                        <a href = "/carrito.html"class = "productos__container--delete" onclick = "eliminarProducto('${nombre}')">Eliminar ${nombre} del carrito</a>
                    </div>
            
            </div>`
    }   
}

const eliminarProducto = (nombre) => {
    let productosDelLocalStorage =JSON.parse(localStorage.getItem('productos'));

    for(let i = 0; i < productosDelLocalStorage.length ; i++){

        if(productosDelLocalStorage[i].productoNombre === nombre ){

            productosDelLocalStorage.splice(i,1);

        }
    }
    localStorage.setItem('productos', JSON.stringify(productosDelLocalStorage));    
}

mostrarProductosDelCarrito();
