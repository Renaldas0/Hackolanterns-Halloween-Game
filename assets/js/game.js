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

// Player steps vs. ghost steps
const steps = {
    player: 3,
    ghost: 0
}

// How many milliseconds does the fadeout take
const fadeMilliseconds = 800;

// List of image files
const doorImages = ['door-easy', 'door-medium', 'door-hard', 'door-puzzle'];
const bookshelfImages = [
    'bookshelves/bookshelf-empty',
    'bookshelves/bookshelf-broom',
    'bookshelves/bookshelf-pumpkin',
    'bookshelves/bookshelf-plant'
];
const tallShelfImages = [
    'bookshelves/bookshelf-tall',
    'bookshelves/bookshelf-door',
    'bookshelves/bookshelf-egg',
    'bookshelves/bookshelf-cobweb'
]
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
const shelfImages = ['shelves/shelf-empty', 'shelves/shelf-eyeball', 'shelves/shelf-witch-hat', 'shelves/shelf-cat'];
const lampImages = ['lamps/lamp-normal', 'lamps/lamp-crooked', 'lamps/lamp-alive'];
const corpseImages = ['corpses/corpse-regular', 'corpses/corpse-bloody', 'corpses/corpse-awake'];

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
                let wallpaperChild = floor.children[0];
                if (currentWallpaper === 'ribbon') {
                    wallpaperChild.style.display = 'block';
                    wallpaperChild.style.height = numberPixels(cellSize * 2);
                    wallpaperChild.style.top = numberPixels(-cellSize * 2);
                    wallpaperChild.style.backgroundSize = numberPixels(cellSize * 2);
                }
                else {
                    wallpaperChild.style.display = 'none';
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
    else {
        gameContainer.style.removeProperty('background-position-y');
        gameContainer.style.removeProperty('background-color');
        gameContainer.style.removeProperty('background-repeat');
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
    door.classList.remove('clickable');
}


/**
 * Adds a selection of new props to the room
 */
function populateRoom() {
    // Delete all the old props first
    let props = document.getElementsByClassName('prop');
    while (props.length > 0) {
        props[0].remove();
    }

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
    setProp(paintingImages, wallPositions, 80, 30);
    // Shelves
    setProp(shelfImages, wallPositions, 80, 10);
    // Bookshelves
    setProp(bookshelfImages, floorPositions, 70, 10);
    // Tall bookshelves
    setProp(tallShelfImages, floorPositions, 40, 5);
    // Lamps
    setProp(lampImages, floorPositions, 40, 4);
    // Corpses
    setProp(corpseImages, floorPositions, 10, 0);
}


/**
 * Adds a new prop type into the room. Can place 0-2 props of this type
 * @param {Array} imageArray The array of all the images this prop will have
 * @param {Array} positionArray An array of all possible positions the prop could be placed
 */
function setProp(imageArray, positionArray, percentageFirst, percentageSecond) {
    let tempArray = [...imageArray]
    if (Math.random() * 100 < percentageFirst) {
        createProp(tempArray, positionArray, true);
        if (Math.random() * 100 < percentageSecond) {
            createProp(tempArray, positionArray, true);
        }
    }
}

/**
 * 
 * @param {Array} imageArray A list of images to set the prop to
 * @param {Array} positionArray A list of positions to put the prop
 * @param {Boolean} deleteImageElement True if you don't want any repeating images
 */
function createProp(imageArray, positionArray, deleteImageElement) {
    let gameContainer = document.getElementById('game-grid');
    let newProp = document.createElement('div');

    // Getting the prop's position
    let chosenPosition = chooseFromArray(positionArray, true);
    newProp.classList = 'prop ' + chosenPosition;

    // Getting the image for the prop
    let propImage = chooseFromArray(imageArray, deleteImageElement);
    setImage(newProp, propImage);
    gameContainer.appendChild(newProp);
}


/**
 * Starts the puzzle overlay fadeout
 * @param {Boolean} isIn Fades in if true and out if false
 * @param {Function} callback The function that will be called when the fadeout is complete
 * @param {Any} args Any arguments needed for the function
 */
function startFade(isIn, callback, ...args) {
    let fadeOverlay = document.getElementById('room-overlay');
    fadeOverlay.style.display = 'flex';
    let currentTime = Date.now();
    // Calls the function immediately if the effect is fade in
    if (isIn) {
        callback(...args);
        // Making all the components invisible again
        let components = fadeOverlay.children;
        for (let component of components) {
            if (component.id !== 'overlay') {
                component.style.display = 'none';
            }
        }
        // Hiding the quiz modal
        divElement.classList.add('hide');
    }
    fade(currentTime, isIn, callback, ...args);
}


/**
 * Iterates through a fadeout animation until it has completely faded to black
 * @param {Integer} startingTime The date.now() time the fadeout started
 * @param {Boolean} isIn Fades in if true and out if false
 * @param {Function} callback The function that will be called when the fadeout is complete
 * @param {Any} args Any arguments needed for the function
 */
function fade(startingTime, isIn, callback, ...args) {
    let fadeOverlay = document.getElementById('room-overlay');
    let currentTime = Date.now();
    if (currentTime >= startingTime + fadeMilliseconds) {
        if (isIn) {
            fadeOverlay.style.display = 'none';
        }
        else {
            fadeOverlay.style.backgroundColor = 'black';
            callback(...args);
        }
    }
    else {
        setTimeout(fade, 1, startingTime, isIn, callback, ...args);
        let fadeAmount = (currentTime - startingTime) / fadeMilliseconds;
        if (isIn) {
            fadeOverlay.style.backgroundColor = `rgba(0, 0, 0, ${1 - fadeAmount})`;
        }
        else {
            fadeOverlay.style.backgroundColor = `rgba(0, 0, 0, ${fadeAmount})`;
        }
    }
}


/**
 * Starts the puzzle sequence
 */
const startPuzzle = () => {
    let puzzleChoice = Math.floor(Math.random() * 2);
    if (puzzleChoice === 0) {
        // For the pairs game
        let pairPuzzle = document.getElementById('puzzle-pairs');
        timeCount.textContent = time;
        pairPuzzle.style.display = 'flex';
        generateCards();
    }
    else {
        // For the panels game
        let panelPuzzle = document.getElementById('puzzle-panels');
        panelPuzzle.style.display = 'flex';
        createPanels(3 + Math.floor(Math.random() * 3));
    }
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

    if (!door.className.includes('barricade')) {
        let doorClass = door.classList;
        if (doorClass.contains('door-easy')) {
            startFade(false, generateQuestion, 'easy');
        }
        else if (doorClass.contains('door-medium')) {
            // Medium question logic goes here
            startFade(false, generateQuestion, 'medium');
        }
        else if (doorClass.contains('door-hard')) {
            // Hard question logic goes here
            startFade(false, generateQuestion, 'hard');
        }
        else {
            // Puzzle logic goes here
            startFade(false, startPuzzle);
        }
    }
}

for (let door of doors) {
    door.addEventListener('click', clickDoor);
}

// end of game winning / losing page
const playerScoreSpan = document.getElementById('player-score');
const ghostScoreSpan = document.getElementById('ghost-score');
let playerScore = 3;
let ghostScore = 0;
playerScoreSpan.textContent = playerScore;
ghostScoreSpan.textContent = ghostScore;
let stepsDifference = playerScore - ghostScore;
const endPage = document.getElementById('end-page');
const endMessage = document.getElementById('end-message');
const restartEnd = document.getElementById('restart-game-end');

function endGame() {
    // end page to appear
    endPage.classList.remove('hide');
    endPage.classList.add('end-page-show');
    setTimeout(endTextShow, 3000);
}

function endTextShow() {
    endMessage.classList.remove('hide');
    endMessage.classList.add('end-text-show');
    restartEnd.classList.remove('hide');
    if (playerScore >= 20) {
        endMessage.textContent = `Congratulations. You have escaped from the haunted mansion You win!`;
    }
    else {
        endMessage.textContent = `Unfortunately you didn't outrun the ghost. You lose!`;
    }
}

// restart game from endpage
restartEnd.addEventListener('click', function() {
    window.location.href = "game.html";
  });



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

// Progression through the game

/**
 * Adds points to the player's score and continues through the game
 * @param {Integer} points The amount of points to be added to the player's score
 */
function progress(doorClass) {
    destroyCards();
    //Adding points goes here
    switch (doorClass) {
        case 'door-easy':
            playerScore += 1;
            break;
        case 'door-medium':
            playerScore += 2;
            break;
        case 'door-hard':
            playerScore += 3;
            break;
        case 'door-puzzle':
            playerScore += 2;
            break;
        default:
            break;
    }
    afterRoom();
    // Removing all the barricades
    let barricades = document.getElementsByClassName('barricade');
    while (barricades.length > 0) {
        barricades[0].remove();
    }
    gameInit();

    if (playerScore >= 20) {
        endGame();
    }
}

/**
 * Returns to the game after the player fails a door, and barricades it
 */
function failRoom(doorClass) {
    destroyCards();
    afterRoom();
    let door = document.getElementsByClassName(doorClass)[0];
    barricadeDoor(door.id);

    let barricades = document.getElementsByClassName('barricade');
    if (barricades.length >= 3 || ghostScore >= playerScore) {
        endGame();
    }
}

/**
 * Is called after leaving a room
 */
function afterRoom() {
    ghostScore++;
    playerScoreSpan.textContent = playerScore;
    ghostScoreSpan.textContent = ghostScore;
}

// for score and restart button
const restartGame = document.getElementById('restart')
restartGame.addEventListener('click', function() {
    window.location.href = "game.html";
  });

