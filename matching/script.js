
// matching/script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    // Define card values (you can add more for a larger game)
    const cardValues = ["A", "B", "C", "D"];
    // Duplicate the values for pairs
    let cards = [...cardValues, ...cardValues];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // Lock board during comparison

    // Shuffle array using Fisher-Yates algorithm
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Initialize the game board
    function initGame() {
      gameBoard.innerHTML = ""; // Clear previous content
      shuffle(cards);
      firstCard = null;
      secondCard = null;
      lockBoard = false;

      // Create card elements dynamically
      cards.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.textContent = "?"; // Hide value initially
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
      });
    }

    // Handle card click events
    function handleCardClick(e) {
      const card = e.target;
      // If board is locked or card already revealed, do nothing
      if (lockBoard || card.textContent !== "?") return;

      // Reveal card's value
      card.textContent = card.dataset.value;

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;
      // Check for a match after a short delay
      setTimeout(checkForMatch, 800);
    }

    // Check if the two selected cards match
    function checkForMatch() {
      if (firstCard.dataset.value === secondCard.dataset.value) {
        // If they match, change background color to indicate a match
        firstCard.style.backgroundColor = "#90ee90";
        secondCard.style.backgroundColor = "#90ee90";
      } else {
        // If not a match, flip the cards back over
        firstCard.textContent = "?";
        secondCard.textContent = "?";
      }
      // Reset selection and unlock the board
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    // Start the game on page load
    initGame();
  });
