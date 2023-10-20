// Different properties for different screen sizes
const screenSmall = {
    cells: 6,
    floorHeight: 0,
}
const screenMedium = {
    cells: 12,
    floorHeight: 2,
}
const screenLarge = {
    cells: 16,
    floorHeight: 1,
}


window.addEventListener('resize', updateScreenSize);
window.onload = gameInit();


/**
 * Is called when the page is loaded. Sets up the game
 */
function gameInit() {
    randomizeWallpaper();
    updateScreenSize();
    updateDoorPositions();
}


/**
 * Repositions the grid cells depending on the screen size
 */
function updateScreenSize() {
    let gameContainer = document.getElementById('game-container');
    let floor = document.getElementById('floor');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Categorizing the size of the screen
    let screenSize = null;
    if (width < 600) {
        screenSize = screenSmall;
    }
    else if (width < 1200) {
        screenSize = screenMedium;
    }
    else {
        screenSize = screenLarge;
    }
    let xCells = screenSize.cells;
    let cellSize = width / xCells;
    let yCells = Math.floor(height / cellSize) - screenSize.floorHeight;

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

    // Adjusting the floor
    floor.style.height = `${cellSize / 8}px`;
    floor.style.backgroundSize = `${cellSize * 2}px`;

    // Then updating the rest of the room components to match the new grid
    updateWallpaper(getWallpaper());
    updateDoorPositions();
}


/**
 * Gets the information of the grid
 * @returns {Object} { width: The width of the grid in cells, height: The height of the grid in cells,
 * cellSize: How big a cell is in pixels }
 */
function getGridSize() {
    let gameContainer = document.getElementById('game-container');
    let gridCols = gameContainer.style.gridTemplateColumns;
    let gridRows = gameContainer.style.gridTemplateRows;

    gridCols = gridCols.split(' ');
    gridRows = gridRows.split(' ');

    return {
        width: gridCols.length,
        height: gridRows.length,
        cellSize: gridCols[0]
    };
}


/**
 * Gets the real coordinate of a cell in pixels
 * @param {Integer} index The Y position of the cell in the grid. Negative numbers start at the end
 * of the grid and move backwards
 * @returns {Float} The Y coordinate of the cell
 */
function getYCellPosition(index) {
    let gameContainer = document.getElementById('game-container');
    let gridInfo = gameContainer.style.gridTemplateRows;
    gridInfo = gridInfo.split(' ');
    // Converting 
    let finalIndex = index;
    if (finalIndex < 0) {
        finalIndex += gridInfo.length - 1;
    }
    return parseFloat(gridInfo[0]) * finalIndex;
}


/**
 * Chooses a random wallpaper and applies it
 */
function randomizeWallpaper() {
    let wallpapers = ['m', 'ribbon', 'squares', 'stripes', 'zig-zag'];
    let selectedPaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    setWallpaper(selectedPaper);
}


/**
 * Applies a specific wallpaper to the game container
 * @param {String} wallpaperName The name of the wallpaper
 */
function setWallpaper(wallpaperName) {
    let gameContainer = document.getElementById('game-container');
    gameContainer.style.backgroundImage = `url(./assets/images/game/wallpapers/wallpaper-${wallpaperName}.png)`;

    updateWallpaper(wallpaperName);
}


/**
 * Updates the properties of the wallpaper background
 * @param {String} wallpaperName The name of the wallpaper that is set
 */
function updateWallpaper(wallpaperName) {
    let gameContainer = document.getElementById('game-container');

    // Clearing any previously set variables
    gameContainer.style.backgroundRepeat = 'repeat';
    gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    // The ribbon wallpaper only repeats along the Y axis once and sits at the bottom of the wall
    if (wallpaperName === 'ribbon') {
        gameContainer.style.backgroundRepeat = 'repeat-x';
        gameContainer.style.backgroundColor = 'rgb(40, 14, 50)';

        let gridInfo = gameContainer.style.gridTemplateRows;
        gridInfo = gridInfo.split(' ');
        let bottomCellPosition = getYCellPosition(-1);
        gameContainer.style.backgroundPositionY = `${bottomCellPosition}px`;
    }
}


/**
 * Finds the wallpaper that is currently decorating the room
 * @returns {String} The found wallpaper
 */
function getWallpaper() {
    let gameContainer = document.getElementById('game-container');
    let wallpaperStyle = gameContainer.style.backgroundImage;

    if (wallpaperStyle === '') {
        return '';
    }
    // Removing the ".png)" part of the style property
    wallpaperStyle = wallpaperStyle.slice(0, wallpaperStyle.length - 6);
    // Then removing the "url(./assets/images/game/wallpapers/wallpaper-" part
    wallpaperStyle = wallpaperStyle.slice(47);
    return wallpaperStyle;
}


/**
 * 
 */
function updateDoorPositions() {
    let doors = document.getElementsByClassName('door');
    let gridSize = getGridSize();

    for (let i = 0; i < doors.length; i++) {
        let door = doors[i];
        door.style.gridRowStart = gridSize.height - 1;
        door.style.gridRowEnd = gridSize.height + 1;
        door.style.backgroundColor = 'black';

        if (i === 0) {
            door.style.gridColumnStart = (gridSize.width / 4);
            door.style.gridColumnEnd = (gridSize.width / 4) + 2;
        }
        else if (i === 1) {
            door.style.gridColumnStart = (gridSize.width / 2);
            door.style.gridColumnEnd = (gridSize.width / 2) + 2;
        }
        else {
            door.style.gridColumnStart = (gridSize.width / 4) * 3;
            door.style.gridColumnEnd = ((gridSize.width / 4) * 3) + 2;
        }
    }
}