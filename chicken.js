document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const cards = document.querySelectorAll(".card");
    const footer = document.querySelector("footer");
    const noResultsMessage = document.createElement("div");
    const sections = document.querySelectorAll(".noodles-section"); 
    const addCartButtons = document.querySelectorAll(".add-to-cart");
  
    // Create "No item found" message
    noResultsMessage.textContent = "No item found";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.position = "fixed";
    noResultsMessage.style.top = "50%";
    noResultsMessage.style.left = "50%";
    noResultsMessage.style.transform = "translate(-50%, -50%)";
    noResultsMessage.style.fontSize = "36px";
    noResultsMessage.style.color = "yellow";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.fontWeight = "bold";
    noResultsMessage.style.zIndex = "100";
  
    // Append the "No item found" message to the body
    document.body.appendChild(noResultsMessage);
  
    // Show footer by default
    footer.style.display = "block";
  
    // Function to filter the noodles cards
    const filterItems = () => {
      const searchTerm = searchBox.value.toLowerCase();
      let visibleCount = 0;
  
      cards.forEach((card) => {
        const cardName = card
          .querySelector(".card-text")
          .textContent.toLowerCase();
  
        if (cardName.includes(searchTerm)) {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });
  
      // Show or hide the no results message
      noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
  
      // Show footer when search box is empty, hide it when there is input
      footer.style.display = searchTerm === "" ? "block" : "none";
    };
  
    // Add event listener to add to cart button
    addCartButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle the button's text and color
        if (btn.classList.contains('added')) {
          btn.textContent = 'Add to Cart';
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.classList.remove('added');
        } else {
          btn.textContent = 'Added to Cart';
          btn.style.backgroundColor = '#3e8e41';
          btn.style.color = '#fff';
          btn.classList.add('added');
        }
      });
    });
  
    // Event listener for the search box
    searchBox.addEventListener("keyup", filterItems);
  });