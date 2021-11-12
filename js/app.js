const productosTienda = [
    {nombre: "Mouse", descripcion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", precio: 1000, imagen: "./img/mouse.jpg"},
    {nombre: "Teclado", descripcion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", precio: 2000, imagen: "./img/teclado.jpg"},
    {nombre: "Monitor", descripcion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", precio: 10000, imagen: "./img/monitor.jpg"}
];

const tarjetas = i => {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "main__card");
    return cardDiv;
}
const generarImagenes = i => {

    let img = document.createElement("img");
    img.setAttribute("src", productosTienda[i].imagen)
    img.setAttribute("class", "main__card--img main__card--element")
    return img;
}

const titulos = i => {
    let title = document.createElement("h1")
    title.setAttribute("class", "main__card--title main__card--element")
    title.innerHTML = productosTienda[i].nombre;
    return title;
}

const descripciones = i => {

    let description = document.createElement("p");
    description.setAttribute("class", "main__card--p main__card--element")
    description.innerHTML = productosTienda[i].descripcion;
    return description;   

}

const precios = i => {

    let price = document.createElement("h3");
    price.setAttribute("class", "main__card--h3 main__card--element")
    price.innerHTML = `${productosTienda[i].precio}$`;
    return price;
    
}

const botones = i => {
    let button = document.createElement("button");
    button.setAttribute("class", "main__card--button main__card--element")
    button.innerHTML = "AGREGAR AL CARRITO";
    return button;
}


const guardarProductosEnCarrito = (button, i) => {
    
    button.addEventListener("click", () => {
        
        const productoNombre = productosTienda[i].nombre;
        const productoPrecio = productosTienda[i].precio;

        let productosObject = {
            productoNombre,
            productoPrecio,
        }       
    
        if(localStorage.getItem('productos') === null){
            let productosArray = []
            productosArray.push(productosObject)
            localStorage.setItem('productos', JSON.stringify(productosArray))
        }else{ 
            let productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));
            productosEnLocalStorage.push(productosObject);
            localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage))
        }             
    })
}

const mostrarTodosLosProductos = (main,cardDiv,img,title,description,price,button) =>{

    cardDiv.appendChild(img)
    cardDiv.appendChild(title) 
    cardDiv.appendChild(description)   
    cardDiv.appendChild(price)
    cardDiv.appendChild(button)
    main.appendChild(cardDiv)
}

for (let i = 0; i < productosTienda.length; i++) {

    //genero un main que contenga cada card
    const main = document.createElement("main")
    main.setAttribute("class", "main")
    document.body.appendChild(main)

    let cardDiv = tarjetas();
    const img = generarImagenes(i);
    const title = titulos(i);
    const description = descripciones(i)
    const price = precios(i);
    const button = botones(i);

    guardarProductosEnCarrito(button,i)
    
    mostrarTodosLosProductos(main,cardDiv,img,title,description,price,button)

}