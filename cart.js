// Get the checkout button element
const checkoutBtn = document.getElementById('checkout-btn');

// Add an event listener to the checkout button
checkoutBtn.addEventListener('click', () => {
  // Redirect to checkout.html when the button is clicked
  window.location.href = 'checkout.html';
});

let cart = [
    { id: 1, name: "Cappuccino", price: 5, quantity: 4, category: "Beverages" },
    { id: 2, name: "Cheeseburger", price: 10, quantity: 2, category: "Food" },
    { id: 3, name: "Fried Chicken", price: 8, quantity: 1, category: "Food" },
    { id: 4, name: "Coca Cola", price: 3, quantity: 3, category: "Beverages" },
    { id: 5, name: "Margherita Pizza", price: 12, quantity: 1, category: "Food" },
    { id: 6, name: "Chocolate Éclair", price: 6, quantity: 4, category: "Pastry" }
  ];
  
  function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
  
    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
         <div class="quantity-controls">
          <span>${item.quantity}</span>
          <div>
            <button class="increase-quantity" data-item-id="${item.id}">+</button>
            <button class="decrease-quantity" data-item-id="${item.id}">-</button>
          </div>
        </td>
        <td id="total-price-${item.id}">$${item.price * item.quantity}</td>
      `;
      cartItems.appendChild(row);
    });
  
    const totalRow = document.createElement('tr');
    totalRow.classList.add('total-row');
    totalRow.innerHTML = `
      <td colspan="3">Total:</td>
      <td id="total-amount">$${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</td>
    `;
    cartItems.appendChild(totalRow);
  }
  
  function addEventListeners() {
    // Add event listeners to the buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const itemId = button.dataset.itemId;
        increaseQuantity(itemId);
      });
    });
  
    document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const itemId = button.dataset.itemId;
        decreaseQuantity(itemId);
      });
    });
  }
  
  function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
      const totalPriceElement = document.getElementById(`total-price-${item.id}`);
      totalPriceElement.textContent = `$${item.price * item.quantity}`;
      const quantityElement = totalPriceElement.parentNode.parentNode.cells[2].children[0];
      quantityElement.textContent = item.quantity;
      updateTotalAmount();
    }
  }
  
  function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        cart = cart.filter(i => i.id !== itemId);
        displayCartItems();
        addEventListeners();
      } else {
        const totalPriceElement = document.getElementById(`total-price-${item.id}`);
        totalPriceElement.textContent = `$${item.price * item.quantity}`;
        const quantityElement = totalPriceElement.parentNode.parentNode.cells[2].children[0];
        quantityElement.textContent = item.quantity;
        updateTotalAmount();
      }
    }
  }
  
  function updateTotalAmount() {
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `$${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}`;
  }
  
  displayCartItems();
  addEventListeners();