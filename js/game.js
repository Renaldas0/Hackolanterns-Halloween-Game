// How many cells span across the width of the screen
const xCells = 16;

window.addEventListener('resize', changeScreenSize);

/**
 * Repositions the grid cells depending on the screen size
 */
function changeScreenSize() {
    let gameContainer = document.getElementById('game-container');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cellSize = width / xCells;
    let yCells = Math.floor(height / cellSize);

    // Adjusting the css grid
    let rowStyle = "";
    for (let i = 0; i < yCells; i++) {
        rowStyle += `${cellSize}px`;
        if (i < yCells - 1) {
            rowStyle += " ";
        }
    }
    gameContainer.style.gridTemplateRows = rowStyle;
    gameContainer.style.backgroundSize = `${cellSize * 2}px`;
}