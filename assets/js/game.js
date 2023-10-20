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
}


/**
 * Repositions the grid cells depending on the screen size
 */
function updateScreenSize() {
    let gameContainer = document.getElementById('game-container');
    let floor = document.getElementById('floor');
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    // Then updating the wallpaper to match the new grid
    updateWallpaper(getWallpaper());
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
        let bottomCellPosition = parseFloat(gridInfo[0]) * (gridInfo.length - 2);
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