const modal = document.getElementById("rulesModal"); // Get the modal element
const closeBtn = document.getElementsByClassName("close")[0]; // Get the close button

// Function to display the modal
function displayModal() {
  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
}

// Event listener to show the modal when a trigger element is clicked
document.getElementById("openModalBtn").addEventListener("click", displayModal);

// Event listener to close the modal when the close button is clicked
closeBtn.addEventListener("click", hideModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    hideModal();
  }
});

// Event listener to allow the user to start the quiz via the start button in modal
let startButtons = document.getElementsByClassName('startQuizBtn');
for (let startButton of startButtons) {
    startButton.addEventListener("click", function() {
        window.location.href = "game.html";
      });
}
