// How many cells span across the width and height of the screen
const xCells = {
    xtraLarge: 16,
    large: 14,
    medium: 8,
    small: 6
};
const yCells = {
    xtraLarge: 7,
    large: 7,
    medium: 12,
    small: 12
};

// How many milliseconds does the fadeout take
const fadeMilliseconds = 800;

// List of image files
const doorImages = ['door-easy', 'door-medium', 'door-hard', 'door-puzzle'];
const bookshelfImages = ['bookshelves/bookshelf-empty', 'bookshelves/bookshelf-broom', 'bookshelves/bookshelf-pumpkin'];
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
    setDoors();
    populateRoom();
}


/**
 * Repositions the grid cells depending on the screen size
 */
function updateScreenSize() {
    let gameContainer = document.getElementById('game-grid');
    let floors = document.getElementsByClassName('floor');
    let width = window.innerWidth;
    let currentWallpaper = getWallpaper();

    // Media queries that the script will use to rearrange the grid
    let screen = '';
    if (width <= 400) {
        screen = 'small';
    }
    else if (width <= 600) {
        screen = 'medium';
    }
    else if (width <= 1200) {
        screen = 'large';
    }
    else {
        screen = 'xtraLarge';
        
    }
    let cellWidth = xCells[screen];
    let cellHeight = yCells[screen];
    let cellSize = width / cellWidth;
    

    // Adjusting the css grid
    let columnStyle = ""
    let rowStyle = "";
    for (let i = 0; i < cellWidth; i++) {
        columnStyle += numberPixels(cellSize);
        if (i < cellWidth - 1) {
            columnStyle += " ";
        }
    }
    for (let i = 0; i < cellHeight; i++) {
        rowStyle += numberPixels(cellSize);
        if (i < cellHeight - 1) {
            rowStyle += " ";
        }
    }
    gameContainer.style.gridTemplateColumns = columnStyle;
    gameContainer.style.gridTemplateRows = rowStyle;
    gameContainer.style.backgroundSize = numberPixels(cellSize * 2);

    // Adjusting the floor
    for (let floor of floors) {
        floor.style.height = numberPixels(cellSize / 8);
        floor.style.backgroundSize = numberPixels(cellSize * 2);

        // Positiong the other 2 floors on mobile devices
        if (floor.id !== 'floor-3') {
            if (width <= 600) {
                if (floor.id === 'floor-1') {
                    floor.style.top = numberPixels(getYCellPosition(4));
                }
                else if (floor.id === 'floor-2') {
                    floor.style.top = numberPixels(getYCellPosition(8));
                }
                if (currentWallpaper === 'ribbon') {
                    let wallpaperChild = floor.children[0];
                    wallpaperChild.style.height = numberPixels(cellSize * 2);
                    wallpaperChild.style.top = numberPixels(-cellSize * 2);
                    wallpaperChild.style.backgroundSize = numberPixels(cellSize * 2);
                }
            }
        }
    }
    // Then updating the rest of the room components to match the new grid
    updateWallpaper(currentWallpaper);
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

    // The ribbon wallpaper only repeats along the Y axis once and sits at the bottom of the wall
    if (wallpaperName === 'ribbon') {
        gameContainer.style.backgroundRepeat = 'repeat-x';
        gameContainer.style.backgroundColor = 'rgb(40, 14, 50)';

        let gridInfo = gameContainer.style.gridTemplateRows;
        gridInfo = gridInfo.split(' ');
        let bottomCellPosition = getYCellPosition(-1);
        gameContainer.style.backgroundPositionY = numberPixels(bottomCellPosition);
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
 * Turns a number into a css-style value in pixels
 * @param {Float} number The number to convert to pixels
 * @returns {String} The css style
 */
function numberPixels(number) {
    return `${number}px`;
}


/**
 * Sets the 3 doors to a random door type
 */
function setDoors() {
    let availableDoors = [...doorImages];

    for (let i = 1; i <= 3; i++) {
        let currentDoor = document.getElementById(`door-${i}`);
        let chosenDoor = chooseFromArray(availableDoors, true);
        currentDoor.className = `door clickable ${chosenDoor}`;
    }
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
    // Paintings
    setProp(paintingImages, wallPositions);
    // Shelves
    setProp(shelfImages, wallPositions);
    // Bookshelves
    setProp(bookshelfImages, floorPositions);
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
    setImage(newProp, propImage);
    gameContainer.appendChild(newProp);
}


/**
 * Starts the puzzle overlay fadeout
 * @param {Function} callback The function that will be called when the fadeout is complete
 * @param {Any} args Any arguments needed for the function
 */
function startFadeOut(callback, ...args) {
    let fadeOverlay = document.getElementById('room-overlay');
    fadeOverlay.style.display = 'flex';
    let currentTime = Date.now();
    fadeOut(currentTime, callback, ...args);
}


/**
 * Iterates through a fadeout animation until it has completely faded to black
 * @param {Integer} startingTime The date.now() time the fadeout started
 * @param {Function} callback The function that will be called when the fadeout is complete
 * @param {Any} args Any arguments needed for the function
 */
function fadeOut(startingTime, callback, ...args) {
    let fadeOverlay = document.getElementById('room-overlay');
    let currentTime = Date.now();
    if (currentTime >= startingTime + fadeMilliseconds) {
        fadeOverlay.style.backgroundColor = 'black';
        callback(...args);
    }
    else {
        setTimeout(fadeOut, 1, startingTime, callback, ...args);
        let fadeAmount = (currentTime - startingTime) / fadeMilliseconds;
        fadeOverlay.style.backgroundColor = `rgba(0, 0, 0, ${fadeAmount})`;
    }
}


/**
 * Starts the puzzle sequence
 */
const startPuzzle = () => {
    let panelPuzzle = document.getElementById('puzzle-panels');
    panelPuzzle.style.display = 'flex';
    createPanels(3 + Math.floor(Math.random() * 3));
}


// Function to open the question modal
const doors = document.getElementsByClassName('door');
const divElement = document.querySelector('#overlay');

/**
 * Is called when a door is clicked
 * @param {Object} doorId The door that was clicked
 */
function clickDoor(event) {
    let door = event.target;
    let doorClass = door.classList;

    if (doorClass.contains('door-easy')) {
        startFadeOut(generateQuestion, 'easy');
    }
    else if (doorClass.contains('door-medium')) {
        // Medium question logic goes here
        startFadeOut(generateQuestion, 'medium');
    }
    else if (doorClass.contains('door-hard')) {
        // Hard question logic goes here
        startFadeOut(generateQuestion, 'hard');
    }
    else {
        // Puzzle logic goes here
        startFadeOut(startPuzzle);
    }
}
for (let door of doors) {
    door.addEventListener('click', clickDoor);
}

// end of game winning / losing page
let playerSteps = 4; // need to change this to what it is currently
let ghostSteps = 6; // need to change this to what it is currently
let stepsDifference = playerSteps - ghostSteps;
let points = 20; // need to change this to what it is currently
const endPage = document.getElementById('end-page');
const endMessage = document.getElementById('end-message');
const restart = document.getElementById('end-game-restart');

function endGame() {
    // check to see if the timer reaches zero
    if (stepsDifference < 0 || points >= 16) {
        // end page to appear
        endPage.classList.remove('hide');
        endPage.classList.add('end-page-show');
        setTimeout(endTextShow, 3000);
    }
}

function endTextShow() {
    endMessage.classList.remove('hide');
    endMessage.classList.add('end-text-show');
    restart.classList.remove('hide');
    if (points >= 20) {
        endMessage.textContent = `Congratulations. You have escaped from the haunted mansion You win!`;
    }
    else if (stepsDifference < 0) {
        endMessage.textContent = `Unfortunately you didn't outrun the ghost. You lose!`;
    }
}

endGame();

// should restart game when in main??
restart.addEventListener('click', gameInit()) 
function generateQuestion(difficulty) {
    switch (difficulty) {
        case 'easy':
            generateEasyQuestion();
            break;
        case 'medium':
            generateMediumQuestion();
            break;
        case 'hard':
            generateHardQuestion();
            break;
    }
    divElement.classList.remove('hide');
}
