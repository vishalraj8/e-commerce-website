let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Brown chex shirt',
        tag:'Brownchexshirt',
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


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalcost(products[i])
    })
}

function onLoadcartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if( productNumbers ){
        document.querySelector('.cart1 span').textContent = productNumbers;
   }
    
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if( productNumbers ){
         localStorage.setItem('cartNumbers', productNumbers + 1);
         document.querySelector('.cart1 span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart1 span').textContent = 1;
    }

    setItem(product);
   
}
function setItem(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalcost(product){
    //console.log("The product price is",product.price);
    let cartcost = localStorage.getItem('totalcast');
    
    console.log("my cartcost is", cartcost);
    console.log(typeof cartcost);
    
    if(cartcost != null){
        cartcost = parseInt(cartcost);
        localStorage.setItem("totalcost", cartcost + 
        product.price);
    }else{
        localStorage.setItem("totalcost", product.price);
    }
    
}
onLoadcartNumbers();