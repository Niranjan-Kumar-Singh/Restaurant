// checkout.js

// Sample cart items data
const cartItems = [
    { id: 1, name: "Cappuccino", price: 180, quantity: 4, category: "coffee" },
    { id: 2, name: "Cheeseburger Pizza", price: 390, quantity: 2, category: "pizza" },
    { id: 3, name: "Fried Chicken", price: 120, quantity: 1, category: "chicken" },
    { id: 4, name: "Coca-Cola Zero", price: 350, quantity: 3, category: "cold_drink" },
    { id: 5, name: "Margherita Pizza", price: 180, quantity: 1, category: "pizza" },
    { id: 6, name: "Chocolate Éclair", price: 300, quantity: 4, category: " pastry" }
  ];
  
  // Function to calculate the total price
  function calculateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice.toFixed(2);
  }
  
  // Function to display the cart items
  function displayCartItems() {
    const cartItemsHtml = cartItems
      .map((item) => {
        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${(item.quantity * item.price).toFixed(2)}</td>
          </tr>
        `;
      })
      .join("");
    document.getElementById("cart-items").innerHTML = cartItemsHtml;
    document.getElementById("total-price").textContent = `₹${calculateTotalPrice()}`;
  }
  
  // Function to handle the payment mode selection
  function handlePaymentModeSelection() {
    const paymentModeSelect = document.getElementById("payment-mode");
    const paymentMethodsDiv = document.getElementById("payment-methods");
    const paymentMethodSelect = document.getElementById("payment-method");
    const cashMethodsDiv = document.getElementById("cash-methods");
    const cardMethodsDiv = document.getElementById("card-methods");
    const upiMethodsDiv = document.getElementById("upi-methods");
  
    paymentModeSelect.addEventListener("change", (e) => {
      const selectedPaymentMode = e.target.value;
      if (selectedPaymentMode === "select") {
        paymentMethodsDiv.style.display = "none";
      } else if (selectedPaymentMode === "pay-after-meal") {
        paymentMethodsDiv.style.display = "none";
        document.getElementById("total-price").style.display = "block";
      } else {
        paymentMethodsDiv.style.display = "block";
        paymentMethodSelect.addEventListener("change", (e) => {
          const selectedPaymentMethod = e.target.value;
          if (selectedPaymentMethod === "select") {
            cashMethodsDiv.style.display = "none";
            cardMethodsDiv.style.display = "none";
            upiMethodsDiv.style.display = "none";
          } else if (selectedPaymentMethod === "cash") {
            cashMethodsDiv.style.display = "block";
            cardMethodsDiv.style.display = "none";
            upiMethodsDiv.style.display = "none";
            document.getElementById("cash-amount").value = calculateTotalPrice();
          } else if (selectedPaymentMethod === "card") {
            cashMethodsDiv.style.display = "none";
            cardMethodsDiv.style.display = "block";
            upiMethodsDiv.style.display = "none";
          } else if (selectedPaymentMethod === "upi") {
            cashMethodsDiv.style.display = "none";
            cardMethodsDiv.style.display = "none";
            upiMethodsDiv.style.display = "block";
          }
        });
      }
    });
  }
  
  // Initialize the cart items display and payment mode selection
  displayCartItems();
  handlePaymentModeSelection();