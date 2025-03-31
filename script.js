// matching/script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    // Define card values and duplicate for pairs
    const cardValues = ["A", "B", "C", "D"];
    let cards = [...cardValues, ...cardValues];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // Prevent clicking during card comparison

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
      gameBoard.innerHTML = ""; // Clear previous cards
      shuffle(cards);
      firstCard = null;
      secondCard = null;
      lockBoard = false;

      // Create card elements dynamically
      cards.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.textContent = "?"; // Initially hide card value
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
      });
    }

    // Handle card click events
    function handleCardClick(e) {
      const card = e.target;
      // Prevent actions if board is locked or card is already revealed
      if (lockBoard || card.textContent !== "?") return;

      // Reveal the card's value
      card.textContent = card.dataset.value;

      if (!firstCard) {
        firstCard = card;
        return;
      }

      // Set second card and lock the board for comparison
      secondCard = card;
      lockBoard = true;
      setTimeout(checkForMatch, 800);
    }

    // Check if the two revealed cards match
    function checkForMatch() {
      if (firstCard.dataset.value === secondCard.dataset.value) {
        // If matched, keep cards revealed and change their background color
        firstCard.style.backgroundColor = "#90ee90";
        secondCard.style.backgroundColor = "#90ee90";
      } else {
        // If not a match, hide their values again
        firstCard.textContent = "?";
        secondCard.textContent = "?";
      }
      // Reset board state
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    // Start the game when the page loads
    initGame();
  });

  document.getElementById('continueBtn').addEventListener('click', () => {
    const audio = document.getElementById('welcomeAudio');
    // Attempt to play audio after user interaction
    audio.play().catch(err => console.error("Audio playback failed:", err));

    const nameValue = document.getElementById('nameInput').value.trim();
    window.location.href = "games.html?name=" + encodeURIComponent(nameValue);
  });
