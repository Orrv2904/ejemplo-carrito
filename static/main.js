document.addEventListener('DOMContentLoaded', () => {
    const productsDatabase = [
        {
            id: 1,
            name: 'Regular pizza',
            price: 400,
            image: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg',
        },
        {
            id: 2,
            name: 'Sicilian pizza',
            price: 500,
            image: 'https://media.gettyimages.com/id/938742222/es/foto/pizza-de-pepperoni-cheesy.jpg?s=612x612&w=gi&k=20&c=PV3H9VSGmPqj2aevNly3yHT50b0gfzLbL6IJDs6WT2c=',
        },
        {
            id: 3,
            name: 'Sub Cheeseburger',
            price: 300,
            image: 'https://burrataandbubbles.com/wp-content/uploads/2020/02/cheeseburger-sub-featured-image.jpg',
        },
        {
            id: 4,
            name: 'Greek Salad',
            price: 250,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmBU3ESWllEpTAVgTcM37QlCurLPQsjv05Zg&usqp=CAU',
        },
    ];

    let cart = [];
    const currency = 'C$';
    const itemsContainer = document.querySelector('#items');
    const cartContainer = document.querySelector('#carrito');
    const totalContainer = document.querySelector('#total');
    const clearButton = document.querySelector('#boton-vaciar');



    function renderProducts() {
        productsDatabase.forEach((product) => {
            const productNode = document.createElement('div');
            productNode.classList.add('card', 'col-sm-4');

            const productCardBody = document.createElement('div');
            productCardBody.classList.add('card-body');

            const productTitle = document.createElement('h5');
            productTitle.classList.add('card-title');
            productTitle.textContent = product.name;

            const productImage = document.createElement('img');
            productImage.classList.add('img-fluid');
            productImage.setAttribute('src', product.image);

            const productPrice = document.createElement('p');
            productPrice.classList.add('card-text');
            productPrice.textContent = `${product.price}${currency}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'btn-primary');
            addToCartButton.textContent = '+';
            addToCartButton.setAttribute('marker', product.id);
            addToCartButton.addEventListener('click', addToCart);

            productCardBody.appendChild(productImage);
            productCardBody.appendChild(productTitle);
            productCardBody.appendChild(productPrice);
            productCardBody.appendChild(addToCartButton);
            productNode.appendChild(productCardBody);
            itemsContainer.appendChild(productNode);
        });
    }

    function addToCart(event) {
        cart.push(event.target.getAttribute('marker'));
        renderCart();
    }

    function renderCart() {
        cartContainer.textContent = '';
        const uniqueCart = [...new Set(cart)];
        uniqueCart.forEach((item) => {
            const product = productsDatabase.find((product) => product.id === parseInt(item));
            const numberOfUnits = cart.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

            const cartNode = document.createElement('li');
            cartNode.classList.add('list-group-item', 'text-right', 'mx-2');
            cartNode.textContent = `${numberOfUnits} x ${product.name} - ${product.price}${currency}`;
            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'mx-5');
            removeButton.textContent = 'X';
            removeButton.style.marginLeft = '1rem';
            removeButton.dataset.item = item;
            removeButton.addEventListener('click', removeCartItem);

            cartNode.appendChild(removeButton);
            cartContainer.appendChild(cartNode);
        });

        totalContainer.textContent = calculateTotal();
    }

    function removeCartItem(event) {
        const id = event.target.dataset.item;
        cart = cart.filter((cartItemId) => cartItemId !== id);
        renderCart();
    }

    function calculateTotal() {
        return cart.reduce((total, item) => {
            const product = productsDatabase.find((product) => product.id === parseInt(item));
            return total + product.price;
        }, 0).toFixed(2);
    }

    function clearCart() {
        cart = [];
        renderCart();
    }

    clearButton.addEventListener('click', clearCart);

    renderProducts();
    renderCart();


    let confirmarPedidoButton = document.getElementById("confirmarPedidoButton");
    let pedidoForm = document.getElementById("pedidoForm");
    
    confirmarPedidoButton.addEventListener("click", function() {
        Swal.fire({
            title: '¿Desea continuar con el pedido?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                pedidoForm.submit();
            }
        });
    });

});

