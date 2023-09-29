let carts = document.querySelectorAll('.add-cart');

// Your products array
let products = [
    {
        name: 'Brown chex shirt',
        tag: 'Brownchexshirt',
        price: 20,
        incart: 0
    },
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
let totalCost = parseInt(localStorage.getItem('totalcost')) || 0;
const cartItemsContainer = document.querySelector('.cart-items'); // Container for cart items

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // Get the selected product from the products array
        let product = products[i];

        // Add the product to the cart
        if (cart[product.tag] === undefined) {
            product.incart = 1;
            cart[product.tag] = product;
        } else {
            cart[product.tag].incart += 1;
        }

        // Update the cart in local storage
        localStorage.setItem('productsInCart', JSON.stringify(cart));

        // Update the total cost
        totalCost += product.price;
        localStorage.setItem('totalcost', totalCost);

        // Update the cart icon and total quantity
        updateCartUI();

        // Add the product image to the cart
        displayProductInCart(product);
    });
}

// Function to update the cart icon and total quantity
function updateCartUI() {
    let productNumbers = 0;

    for (let tag in cart) {
        productNumbers += cart[tag].incart;
    }

    document.querySelector('.cart1 span').textContent = productNumbers;
}

// Function to display the cart items on the cart page
function displayCartOnCartPage() {
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartTotal = document.querySelector('.cart-total span'); // Update this selector to target the total span element

    cartItemsContainer.innerHTML = ''; // Clear previous items
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

    // Update the cart total
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to initialize the cart and total cost on the cart page load
function initCartPage() {
    displayCartOnCartPage();
}

// Call the initCartPage function on the cart page load
window.addEventListener('load', initCartPage);


// Function to add a product image to the cart
function displayProductInCart(product) {
    const productImage = document.createElement('img');
    productImage.src = `D:/projects/${product.tag}.jpg`; // Adjust the path to your product images
    productImage.alt = product.name;
    cartItemsContainer.appendChild(productImage);
}

// Function to initialize the cart and total cost on page load
function init() {
    onLoadcartNumbers();
    displayCart();
}
// Function to calculate the total cost of items in the cart
function calculateTotalCost(cart) {
    let totalCost = 0;

    for (let tag in cart) {
        const product = cart[tag];
        totalCost += product.price * product.incart;
    }

    return totalCost;
}

// Call the calculateTotalCost function to get the total cost
totalCost = calculateTotalCost(cart);

// Update the total cost in the localStorage
localStorage.setItem('totalcost', totalCost);

// Update the cart total on the cart page
const cartTotal = document.querySelector('.cart-total span');
cartTotal.textContent = `$${totalCost.toFixed(2)}`;

// Call the initCartPage function on the cart page load
window.addEventListener('load', initCartPage);

init();

