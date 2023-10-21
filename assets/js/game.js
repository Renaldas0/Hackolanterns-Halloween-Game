// How many cells span across the width and height of the screen
const xCells = 16;
const yCells = 7;

// List of image files
const doorImages = ['doors/door-easy', 'doors/door-medium', 'doors/door-hard', 'doors/door-puzzle'];
const paintingImages = [
    'paintings/painting-blank',
    'paintings/painting-man-headless',
    'paintings/painting-man-shadow',
    'paintings/painting-man',
    'paintings/painting-skeleton',
    'paintings/painting-woman-zombie',
    'paintings/painting-woman',
    'paintings/painting-zombie-head',
];
const shelfImages = ['shelves/shelf-empty', 'shelves/shelf-eyeball', 'shelves/shelf-witch-hat'];

window.addEventListener('resize', updateScreenSize);
window.onload = gameInit();


/**
 * Is called when the page is loaded. Sets up the game
 */
function gameInit() {
    randomizeWallpaper();
    updateScreenSize();

    setImageById('door-1', getRandomDoor());
    setImageById('door-2', getRandomDoor());
    setImageById('door-3', getRandomDoor());
    barricadeDoor('door-3');
    populateRoom();
}


/**
 * Repositions the grid cells depending on the screen size
 */
function updateScreenSize() {
    let gameContainer = document.getElementById('game-grid');
    let floor = document.getElementById('floor');
    let width = window.innerWidth;
    let cellSize = width / xCells;

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
}


/**
 * Chooses an element from an array at random
 * @param {Array} myArray The array to choose from
 * @param {Boolean} deleteElement If true, the element will be deleted from the array
 * @returns {Any} The chosen element from the array
 */
function chooseFromArray(myArray, deleteElement) {
    let index = Math.floor(Math.random() * myArray.length);
    let element = myArray[index];
    if (deleteElement) {
        myArray.splice(index, 1);
    }
    return element;
}


/**
 * Gets the information of the grid
 * @returns {Object} { width: The width of the grid in cells, height: The height of the grid in cells,
 * cellSize: How big a cell is in pixels }
 */
function getGridSize() {
    let gameContainer = document.getElementById('game-grid');
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
    let gameContainer = document.getElementById('game-grid');
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
 * Gets the position of an element in the game grid
 * @param {Object} element The element that you want to get the coordinates from
 */
function getElementGridPosition(element) {
    let x = element.style.gridColumnStart;
    let y = element.style.gridRowStart;

    return {
        x: x,
        y: y
    };
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
    let gameContainer = document.getElementById('game-grid');
    gameContainer.style.backgroundImage = `url(./assets/images/game/wallpapers/wallpaper-${wallpaperName}.png)`;

    updateWallpaper(wallpaperName);
}


/**
 * Updates the properties of the wallpaper background
 * @param {String} wallpaperName The name of the wallpaper that is set
 */
function updateWallpaper(wallpaperName) {
    let gameContainer = document.getElementById('game-grid');

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
    let gameContainer = document.getElementById('game-grid');
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
 * Sets a certain element to a specified image
 * @param {String} element The element to be updated
 * @param {String} imageName The name of the image. Starts from the "assets/images/game/" directory
 */
function setImage(element, imageName) {
    element.style.backgroundImage = `url(./assets/images/game/${imageName}.png)`;
}


/**
 * Sets an element with the specified id to a given image
 * @param {String} element The element to be updated
 * @param {String} imageName The name of the image. Starts from the "assets/images/game/" directory
 */
function setImageById(id, imageName) {
    let element = document.getElementById(id);
    setImage(element, imageName);
}


/**
 * Picks a random door and returns it
 * @returns {String} The name of the chosen door
 */
function getRandomDoor() {
    return doorImages[Math.floor(Math.random() * doorImages.length)];
}


/**
 * Adds a barricade to a door
 * @param {String} doorId The door you wish to barricade
 */
function barricadeDoor(doorId) {
    let door = document.getElementById(doorId);
    let barricade = document.createElement('div');
    barricade.className = 'barricade';
    door.appendChild(barricade);
}


/**
 * Adds a selection of new props to the room
 */
function populateRoom() {
    // Setting positions where props can be placed. These will be ids assigned to the components
    let wallPositions = [
        'prop-wall prop-left',
        'prop-wall prop-mid-left',
        'prop-wall prop-mid',
        'prop-wall prop-mid-right',
        'prop-wall prop-right'
    ];
    let floorPositions = [
        'prop-floor prop-left',
        'prop-floor prop-mid-left',
        'prop-floor prop-mid-right',
        'prop-floor prop-right'
    ];
    //Paintings
    setProp(paintingImages, wallPositions);
    setProp(shelfImages, wallPositions);
    console.log(wallPositions);
}


/**
 * Adds a new prop into the room
 * @param {Array} imageArray The array of all the images this prop will have
 * @param {Array} positionArray An array of all possible positions the prop could be placed
 */
function setProp(imageArray, positionArray) {
    let gameContainer = document.getElementById('game-grid');
    let newProp = document.createElement('div');

    // Getting the prop's position
    let chosenPosition = chooseFromArray(positionArray, true);
    newProp.classList = 'prop ' + chosenPosition;

    // Getting the image for the prop
    let propImage = chooseFromArray(imageArray, false);
    newProp.style.backgroundImage = `url(./assets/images/game/${propImage}.png)`;
    gameContainer.appendChild(newProp);
}


// Function to open the question modal
const door = document.querySelector('.door');
const divElement = document.querySelector('#overlay');
function showOverlay(door) {
    divElement.classList.remove('hide');
}
door.addEventListener('click', showOverlay);
