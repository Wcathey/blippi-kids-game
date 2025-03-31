// learning/script.js
document.addEventListener("DOMContentLoaded", () => {
    // Define the set of colors available in the game
    const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

    // Cache DOM elements
    const colorDisplay = document.getElementById("colorDisplay");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");
    const overlay = document.getElementById("overlay");

    let correctColor = "";

    // Fisher-Yates shuffle algorithm
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Initialize or reset the game
    function initGame() {
      // Clear previous feedback and options
      feedback.textContent = "";
      optionsContainer.innerHTML = "";

      // Pick a new correct color randomly
      correctColor = colors[Math.floor(Math.random() * colors.length)];

      // Update the display square with the correct color
      colorDisplay.style.backgroundColor = correctColor;

      // Create an array of options including the correct color
      let options = [correctColor];
      while (options.length < 4) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (!options.includes(randomColor)) {
          options.push(randomColor);
        }
      }
      // Shuffle the options for randomness
      options = shuffle(options);

      // Dynamically generate buttons for each color option
      options.forEach(color => {
        const btn = document.createElement("button");
        btn.classList.add("color-option");
        btn.textContent = color;
        // Set the button's text color to match the color option
        btn.style.color = color;
        btn.addEventListener("click", () => {
          checkAnswer(color);
        });
        optionsContainer.appendChild(btn);
      });
    }

    // Function to check if the selected answer is correct
    function checkAnswer(selectedColor) {
      if (selectedColor === correctColor) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        showOverlay();
      } else {
        feedback.textContent = "Try again!";
        feedback.style.color = "red";
      }
    }

    // Show a full-screen overlay with the "CORRECT!" message, then reinitialize the game
    function showOverlay() {
      overlay.textContent = "CORRECT!";
      overlay.style.display = "block";
      // After 2 seconds, hide the overlay and reset the game
      setTimeout(() => {
        overlay.style.display = "none";
        initGame();
      }, 2000);
    }

    // Start the game initially
    initGame();
  });
