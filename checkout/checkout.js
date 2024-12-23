// 1) initalize cart 
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];    

// Select DOM elements to display products in the cart
const cartList = document.querySelector('.list');
const totalQuantityElem = document.querySelector('.totalQuantity');
const totalPriceElem = document.querySelector('.totalPrice');

function displayCart() {
  cartList.innerHTML = '';

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('item');

    // Safely parse the price from the string
    const itemTotalPrice = item.quantity * parseFloat(item.price);
    totalPrice += itemTotalPrice;
    totalQuantity += item.quantity;

    productDiv.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
      <div class="info">
        <div class="name">${item.title}</div>
        <div class="price">$${parseFloat(item.price).toFixed(2)} / 1 product</div>
      </div>
      <div class="quantity">Quantity: ${item.quantity}</div>
      <div class="returnPrice">$${(item.quantity * item.price).toFixed(2)}</div>
      <button class="remove-btn" onclick="decreaseQuantity(${index})">X</button> 
    `;

    cartList.appendChild(productDiv);


  });
  //updating totals
  totalQuantityElem.textContent = totalQuantity;
  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to decrease product quantity by 1 or remove the product if quantity is 1
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    // If quantity is 1, remove the product from the cart
    cart.splice(index, 1);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cart));

  // Re-render the cart view
  displayCart();
}

// Checkout button logic
document.querySelector('.buttonCheckout').addEventListener('click', checkout);

function isValidName(name) {
  // Name should not be empty and should contain only letters and spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim());
}

function isValidPhone(phone) {
  // Phone number should contain only digits and have a length of 10
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.trim());
}

function isValidAddress(address) {
  // Address should not be empty
  return address.trim() !== '';
}

function showError(input, message) {
  input.style.border = '2px solid #D5B85A';

  let error = input.nextElementSibling;
  if (error && error.tagName === 'SMALL') {
    error.textContent = message;
  } else {
    error = document.createElement('small');
    error.style.color = '#D5B85A';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }
}

function clearError(input) {
  input.style.border = '';
  let error = input.nextElementSibling;
  if (error && error.tagName === 'SMALL') {
    input.parentNode.removeChild(error);
  }
}

function checkout() {
  // Check if the cart is empty
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to proceed.');
    return; // Exit the function if the cart is empty
  }

  // Get input elements
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const countryInput = document.getElementById('country');
  const cityInput = document.getElementById('city');

  // Get input values
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const country = countryInput.value.trim();
  const city = cityInput.value.trim();

  let isValid = true;

  // Validate name
  if (!isValidName(name)) {
    showError(nameInput, 'Name should only contain letters and spaces.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Validate phone
  if (!isValidPhone(phone)) {
    showError(phoneInput, 'Phone should contain exactly 10 digits.');
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  // Validate address
  if (!isValidAddress(address)) {
    showError(addressInput, 'Address cannot be empty.');
    isValid = false;
  } else {
    clearError(addressInput);
  }

  // Validate country
  if (country === '') {
    showError(countryInput, 'Country cannot be empty.');
    isValid = false;
  } else {
    clearError(countryInput);
  }

  // Validate city
  if (city === '') {
    showError(cityInput, 'City cannot be empty.');
    isValid = false;
  } else {
    clearError(cityInput);
  }

  // Final validation check
  if (isValid) {
    alert(`Order Confirmed for ${name}!`);
    localStorage.removeItem('cartItems'); // Clear the cart
    window.location.href = 'haircare.html'; // Redirect to product page
  } else {
    // Show an alert immediately if there are errors
    alert('Please correct the highlighted errors and try again.');
  }
}
  

// Load the cart on page load
displayCart();



  