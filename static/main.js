document.addEventListener('DOMContentLoaded', () => {
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Regular pizza',
            precio: 400,
            imagen: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg',
        },
        {
            id: 2,
            nombre: 'Scicialian pizza',
            precio: 500,
            imagen: 'https://media.gettyimages.com/id/938742222/es/foto/pizza-de-pepperoni-cheesy.jpg?s=612x612&w=gi&k=20&c=PV3H9VSGmPqj2aevNly3yHT50b0gfzLbL6IJDs6WT2c=',
        },
        {
            id: 3,
            nombre: 'Sub Cheeseburger',
            precio: 300,
            imagen: 'https://burrataandbubbles.com/wp-content/uploads/2020/02/cheeseburger-sub-featured-image.jpg',
        },
        {
            id: 4,
            nombre: 'Greek Salad',
            precio: 250,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmBU3ESWllEpTAVgTcM37QlCurLPQsjv05Zg&usqp=CAU',
        },
    ];

    let carrito = [];
    const divisa = 'C$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {


            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');


            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');


            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;


            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);


            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;


            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);


            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();

    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

        DOMtotal.textContent = calcularTotal();
    }


    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
    }


    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }


    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    renderizarProductos();
    renderizarCarrito();
});