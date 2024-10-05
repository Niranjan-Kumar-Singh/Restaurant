document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const categoryCards = document.getElementById("categoryCards");
  const bestSellingCards = document.getElementById("bestSellingCards");
  const searchBox = document.getElementById("search-box");
  const notificationIcon = document.querySelector(".relative > span");
  const notificationBox = document.getElementById("notification-box");
  const notificationList = document.getElementById("notification-list");
  const usernameButton = document.getElementById("username-button");
  const usernameBox = document.getElementById("username-box");
  const usernameBoxLinks = document.querySelectorAll("#username-box a");
  const logoutButton = document.getElementById("logout-button");

  // Card configuration array
  const cardsConfig = [
    { id: "coffeeCard", url: "coffee.html", category: "coffee" },
    { id: "pizzaCard", url: "pizza.html", category: "pizza" },
    { id: "burgerCard", url: "burger.html", category: "burger" },
    { id: "noodlesCard", url: "noodles.html", category: "noodles" },
    { id: "pastryCard", url: "pastry.html", category: "pastry" },
    { id: "icecreamCard", url: "icecream.html", category: "icecream" },
    { id: "kebabsCard", url: "kebabs.html", category: "kebabs" },
    { id: "chickenCard", url: "chicken.html", category: "chicken" },
    { id: "colddrinkCard", url: "colddrink.html", category: "cold drink" },
  ];

  // Add event listeners for each card
  cardsConfig.forEach(({ id, url }) => {
    const card = document.querySelector(`#${id}`);
    if (card) {
      card.addEventListener("click", function () {
        window.location.href = url;
      });
    }
  });

  // Best Selling Card configuration array
  const bestSellingCardsConfig = [
    { class: "coffeeBest", url: "coffee.html", category: "coffee" },
    { class: "pizzaBest", url: "pizza.html", category: "pizza" },
    { class: "noodlesBest", url: "noodles.html", category: "noodles" },
    { class: "burgerBest", url: "burger.html", category: "burger" },
    { class: "icecreamBest", url: "icecream.html", category: "icecream" },
    { class: "pastryBest", url: "pastry.html", category: "pastry" },
    { class: "kebabBest", url: "kebabs.html", category: "kebabs" },
    { class: "chickenBest", url: "chicken.html", category: "chicken" },
    { class: "colddrinkBest", url: "colddrink.html", category: "cold drink" },
  ];

  bestSellingCardsConfig.forEach(({ class: className, url }) => {
    const cards = document.querySelectorAll(`.${className}`);
    cards.forEach((card) => {
      if (card) {
        card.addEventListener("click", function () {
          window.location.href = url;
        });
      }
    });
  });

  function updateCategoryGrid() {
    if (sidebar.classList.contains("sidebar-visible")) {
      categoryCards.classList.remove("xl:grid-cols-9");
      categoryCards.classList.add("xl:grid-cols-7");
    } else {
      categoryCards.classList.remove("xl:grid-cols-7");
      categoryCards.classList.add("xl:grid-cols-9");
    }
  }

  function updateBestSellingGrid() {
    if (sidebar.classList.contains("sidebar-visible")) {
      bestSellingCards.classList.remove("xl:grid-cols-7");
      bestSellingCards.classList.add("xl:grid-cols-5");
    } else {
      bestSellingCards.classList.remove("xl:grid-cols-5");
      bestSellingCards.classList.add("xl:grid-cols-7");
    }
  }

  function toggleSidebar() {
    sidebar.classList.toggle("sidebar-visible");
    updateCategoryGrid();
    updateBestSellingGrid();
  }

  openSidebarButton.addEventListener("click", toggleSidebar);
  closeSidebarButton.addEventListener("click", toggleSidebar);

  function closeElement(element, icon) {
    document.addEventListener("click", function (event) {
      if (
        event.target !== icon &&
        !icon.contains(event.target) &&
        event.target !== element &&
        !element.contains(event.target)
      ) {
        element.classList.remove("show");
        icon.querySelector(".caret").style.transform = "rotate(0deg)";
      }
    });
  }

  function toggleElement(element, icon) {
    icon.addEventListener("click", function () {
      if (element.classList.contains("show")) {
        element.classList.remove("show");
        icon.querySelector(".caret").style.transform = "rotate(0deg)";
      } else {
        element.classList.add("show");
        icon.querySelector(".caret").style.transform = "rotate(180deg)";
      }
    });
  }

  closeElement(usernameBox, usernameButton);
  toggleElement(usernameBox, usernameButton);

  closeElement(notificationBox, notificationIcon);
  toggleElement(notificationBox, notificationIcon);

  const offers = [
    { id: 1, title: "Buy 1 Get 1 Free", description: "On all pizzas" },
    { id: 2, title: "20% Off", description: "On all orders above ₹500" },
    { id: 3, title: "Free Delivery", description: "On all orders above ₹1000" },
    { id: 4, title: "Flat 30% Off", description: "On all burgers" },
    { id: 5, title: "Get 2 Free", description: "On all ice cream orders" },
  ];

  offers.forEach((offer) => {
    const notificationItem = document.createElement("li");
    notificationItem.innerHTML = `
      <h3>${offer.title}</h3>
      <p>${offer.description}</p>
    `;
    notificationList.appendChild(notificationItem);
  });

  // Add event listeners to the links
  usernameBoxLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkText = link.textContent.trim().toLowerCase();

      // Check if the page exists
      if (linkText === "profile") {
        // Redirect to profile page
        window.location.href = "profile.html";
      } else if (linkText === "settings") {
        // Redirect to settings page
        window.location.href = "updateaccount.html";
      } else if (linkText === "logout") {
        // Logout functionality with modal dialog
        const logoutModal = document.getElementById("logout-modal");
        const logoutModalContent = document.getElementById(
          "logout-modal-content"
        );
        const logoutModalCloseButton = document.getElementById(
          "logout-modal-close-button"
        );
        const logoutModalConfirmButton = document.getElementById(
          "logout-modal-confirm-button"
        );

        // Show the logout modal dialog
        logoutModal.style.display = "block";

        // Add event listener to the close button
        logoutModalCloseButton.addEventListener("click", () => {
          logoutModal.style.display = "none";
        });

        // Add event listener to the confirm button
        logoutModalConfirmButton.addEventListener("click", () => {
          // Logout logic here
          console.log("Logout confirmed");
          // Hide the logout modal dialog
          logoutModal.style.display = "none";
        });
      } else {
        // If the page does not exist, create it
        console.log(`Page ${linkText} does not exist. Creating it...`);
        // You can add your page creation logic here
      }
    });
  });

  // Add an event listener to the logout button
  logoutButton.addEventListener("click", () => {
    // Show the modal dialog box
    document.getElementById("logout-modal").style.display = "block";
  });
  // Get the close button element
  const closeButton = document.querySelector(".close");
  // Add an event listener to the close button
  closeButton.addEventListener("click", () => {
    // Hide the modal dialog box
    document.getElementById("logout-modal").style.display = "none";
  });
  // Get the logout confirm button element
  const logoutConfirmButton = document.getElementById("logout-confirm");
  // Add an event listener to the logout confirm button
  logoutConfirmButton.addEventListener("click", () => {
    console.log("Logout confirm button clicked!");

    // Show a confirmation message
    const confirmationMessage = document.getElementById("confirmation-message");
    if (!confirmationMessage) {
      console.error("Confirmation message element not found!");
      return;
    }

    confirmationMessage.textContent = "You have been logged out successfully.";
    confirmationMessage.style.display = "block";

    // Automatically dismiss the message after 2 seconds
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 2000);

    // Hide the modal dialog box
    document.getElementById("logout-modal").style.display = "none";
  });
  // Get the cancel button element
  const cancelButton = document.querySelector(".btn-secondary");
  // Add an event listener to the cancel button
  cancelButton.addEventListener("click", () => {
    // Hide the modal dialog box immediately
    document.getElementById("logout-modal").style.display = "none";
  });

  // Search functionality for filtering category cards
  searchBox.addEventListener("keyup", function () {
    const searchTerm = this.value.toLowerCase().trim();
    const categoryCardElements = document.querySelectorAll("#categoryCards .card");

    // Hide all category cards initially
    categoryCardElements.forEach((card) => {
      card.style.display = "none";
    });

    // Show matching category card(s)
    let found = false; // Track if a match is found
    categoryCardElements.forEach((card) => {
      const cardTitle = card.querySelector(".text-sm").textContent.toLowerCase();
      if (cardTitle.includes(searchTerm)) {
        card.style.display = "block";
        found = true; // A match has been found
      }
    });

    // If no matches found, optionally show a message
    if (!found && searchTerm) {
      alert("No matching category found!");
    } else if (searchTerm === "") {
      // Show all cards if the search box is empty
      categoryCardElements.forEach((card) => {
        card.style.display = "block";
      });
    }
  });

  // Initial category grid and best selling grid setup based on default sidebar state
  updateCategoryGrid();
  updateBestSellingGrid();
});