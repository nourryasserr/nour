// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Select all "Add To Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productBox = button.closest('.box');
        const productTitle = productBox.querySelector('.product-title').textContent;
        const productPriceElement = productBox.querySelector('.product-text span');

        // Extract product price
        let productPrice = 0;
        if (productPriceElement) {
            productPrice = parseFloat(productPriceElement.textContent.replace('$', '').trim());
        }
        const productImage = productBox.querySelector('img').src;
        const productId = productBox.dataset.id;

        // Check if product already exists in the cart
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // If product already exists, increase its quantity
            existingProduct.quantity += 1;
        } else {
            // If new product, add it to the cart
            cart.push({
                title: productTitle,
                price: productPrice,
                image: productImage,
                id: productId,
                quantity: 1
            });
        }

        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));

        alert(`${productTitle} has been added to your cart!`);
    });
});
