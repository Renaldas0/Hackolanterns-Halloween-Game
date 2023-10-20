// How many cells span across the width of the screen
const cellScreenLarge = 16;
const cellScreenMedium = 12;
const cellScreenSmall = 6;

window.addEventListener('resize', updateScreenSize);
window.onload = gameInit();


/**
 * Is called when the page is loaded. Sets up the game
 */
function gameInit() {
    updateScreenSize();
}


/**
 * Repositions the grid cells depending on the screen size
 */
function updateScreenSize() {
    let gameContainer = document.getElementById('game-container');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let xCells = 0;

    if (width < 600) {
        xCells = cellScreenSmall;
    }
    else if (width < 1200) {
        xCells = cellScreenMedium;
    }
    else {
        xCells = cellScreenLarge;
    }
    let cellSize = width / xCells;
    let yCells = Math.floor(height / cellSize);

    // Adjusting the css grid
    let columnStyle = ""
    let rowStyle = "";
    for (let i = 0; i < xCells; i++) {
        columnStyle += `${cellSize}px`;
        if (i < xCells - 1) {
            columnStyle += " ";
        }
    }
    for (let i = 0; i < yCells; i++) {
        rowStyle += `${cellSize}px`;
        if (i < yCells - 1) {
            rowStyle += " ";
        }
    }
    gameContainer.style.gridTemplateColumns = columnStyle;
    gameContainer.style.gridTemplateRows = rowStyle;
    gameContainer.style.backgroundSize = `${cellSize * 2}px`;
}