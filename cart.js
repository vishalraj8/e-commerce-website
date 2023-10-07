let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Brown chex shirt',
        tag:'Brownchexshirt',
        price: 20,
        incart: 0
    },
    {
        name:'Black shirt',
        tag:'Blackshirt',
        price: 25,
        incart: 0
    },
    {
        name:'black chex shir',
        tag:'blackchexshirt',
        price: 40,
        incart: 0
    },
    {
        name:'red chex shirt',
        tag:'redchexshirt',
        price: 59,
        incart: 0
    },
    {
        name:'black shirt',
        tag:'blackshirt',
        price: 56,
        incart: 0
    },
    {
        name:'designer shirt',
        tag:'designershirt',
        price: 45,
        incart: 0
    },
    {
        name:'t-shirt',
        tag:'tshirt',
        price: 15,
        incart: 0
    },
    {
        name:'Casual shirt',
        tag:'Casualshirt',
        price: 6,
        incart: 0
    },
    {
        name:'black Casual shirt',
        tag:'blackCasualshirt',
        price: 99,
        incart: 0
    },
    {
        name:'Dark green casual',
        tag:'Darkgreencasual',
        price: 19,
        incart: 0
    },
    {
        name:'oxford shirt',
        tag:'oxfordshirt',
        price: 12,
        incart: 0
    },
    {
        name:'nasa tshirt',
        tag:'nasatshirt',
        price: 5,
        incart: 0
    }
];
let cart = JSON.parse(localStorage.getItem('productsInCart')) || {};
        let totalCost = parseFloat(localStorage.getItem('totalcost')) || 0;

        const cartItemsContainer = document.querySelector('.cart-items'); 

        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener('click', () => {
                let product = products[i];

                if (cart[product.tag] === undefined) {
                    product.incart = 1;
                    cart[product.tag] = product;
                } else {
                    cart[product.tag].incart += 1;
                }

                localStorage.setItem('productsInCart', JSON.stringify(cart));

                totalCost += product.price;
                localStorage.setItem('totalcost', totalCost);
                updateCartUI();
                displayProductInCart(product);
            });
        }
        function updateCartUI() {
            let productNumbers = 0;
            for (let tag in cart) {
                productNumbers += cart[tag].incart;
            }
            document.querySelector('.cart1 span').textContent = productNumbers;
        }
        function displayCartOnCartPage() {
            let cartItemsContainer = document.querySelector('.cart-items');
            let cartTotal = document.querySelector('.cart-total span');
        
            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;
        
            for (let tag in cart) {
                let product = cart[tag];
                let cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${product.name}</span>
                    <span>$${product.price.toFixed(2)}</span>
                    <span>${product.incart}</span>
                    <span>$${(product.price * product.incart).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItem);
        
                totalPrice += product.price * product.incart;
            }
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        function displayProductInCart(product) {
            const productImage = document.createElement('img');
            productImage.src = `D:/projects/${product.tag}.jpg`;
            productImage.alt = product.name;
            cartItemsContainer.appendChild(productImage);
            alert('Product removed from cart');
        }
        function clearCart() {
            const confirmClear = window.confirm('Are you sure you want to clear the cart?');
        
            if (confirmClear) {
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('totalcost');
                cart = {};
                totalCost = 0;
                displayCartOnCartPage();
                updateCartUI();
                alert('Cart cleared');
            }
        }
        function removeProduct(tagToRemove) {
        }
        
        function init() {
            displayCartOnCartPage();
        }
        
        window.addEventListener('load', () => {
            init();
            const clearCartButton = document.getElementById('clear-cart');
            clearCartButton.addEventListener('click', clearCart);
        
            document.addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-button')) {
                    const tagToRemove = event.target.getAttribute('data-tag');
                    removeProduct(tagToRemove);
                }
            });
        });
        