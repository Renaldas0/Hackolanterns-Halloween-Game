// Stores all the possible panel combinations
const panel3x3 = [
    [[1, 1, 1],
     [0, 1, 0],
     [1, 1, 1]],

    [[0, 1, 0],
     [1, 1, 1],
     [0, 1, 0]],

    [[0, 1, 0],
     [1, 0, 1],
     [0, 1, 0]],

    [[1, 0, 1],
     [0, 0, 0],
     [1, 0, 1]],

    [[1, 0, 0],
     [0, 1, 0],
     [0, 0, 1]],

    [[1, 0, 1],
     [0, 1, 0],
     [0, 1, 0]],

    [[0, 0, 1],
     [0, 1, 0],
     [1, 0, 0]]
];
const panel4x4 = [
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    
    [[1, 1, 1, 1],
     [1, 0, 0, 1],
     [1, 0, 0, 1],
     [1, 1, 1, 1]],
    
    [[1, 0, 0, 1],
     [0, 1, 1, 0],
     [0, 1, 1, 0],
     [1, 0, 0, 1]],
    
    [[1, 0, 0, 1],
     [1, 0, 1, 1],
     [1, 1, 0, 1],
     [1, 0, 0, 1]],
    
    [[0, 1, 0, 1],
     [0, 1, 0, 1],
     [0, 1, 0, 1],
     [0, 1, 0, 1]],
    
    [[1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0],
     [1, 1, 1, 1]],
    
    [[0, 1, 1, 0],
     [0, 1, 1, 0],
     [0, 1, 1, 0],
     [0, 1, 1, 0]],
    
    [[0, 1, 1, 0],
     [1, 1, 0, 1],
     [1, 0, 1, 1],
     [0, 1, 1, 0]],
];
const panel5x5 = [
    [[0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0]],
    
    [[1, 1, 0, 0, 1],
     [1, 1, 1, 0, 0],
     [0, 1, 1, 1, 0],
     [0, 0, 1, 1, 1],
     [1, 0, 0, 1, 1]],
    
    [[1, 1, 1, 1, 1],
     [0, 1, 1, 1, 0],
     [0, 1, 1, 1, 0],
     [0, 0, 0, 0, 0],
     [1, 1, 1, 1, 1]],
    
    [[0, 0, 0, 1, 0],
     [1, 1, 1, 0, 0],
     [1, 0, 0, 0, 1],
     [1, 1, 1, 0, 0],
     [0, 0, 0, 1, 0]],
    
    [[1, 0, 1, 0, 1],
     [0, 1, 1, 1, 0],
     [1, 1, 0, 1, 1],
     [0, 1, 1, 1, 0],
     [1, 0, 1, 0, 1]],
    
    [[0, 1, 0, 1, 0],
     [1, 0, 1, 0, 1],
     [0, 1, 0, 1, 0],
     [1, 0, 1, 0, 1],
     [0, 1, 0, 1, 0]],
    
    [[0, 1, 0, 1, 0],
     [0, 1, 0, 1, 0],
     [1, 1, 1, 1, 1],
     [1, 0, 1, 0, 1],
     [1, 0, 1, 0, 1]],
    
    [[1, 0, 0, 0, 1],
     [1, 1, 0, 1, 1],
     [1, 0, 1, 0, 1],
     [1, 0, 1, 0, 1],
     [1, 1, 1, 1, 1]],
    
    [[0, 1, 0, 1, 0],
     [0, 0, 0, 0, 0],
     [1, 1, 0, 1, 1],
     [0, 1, 1, 1, 0],
     [0, 1, 0, 1, 0]],
];

const activePanels = {
    inputs: [],
    outputs: [],
    attempts: 0
};


/**
 * Sets up the panel puzzle game
 * @param {Integer} panelSize The size of the panel. Should be between 3 and 5
 */
function createPanels(panelSize) {
    // First, delete any existing panels that have been created from previous puzzles
    activePanels.inputs = [];
    activePanels.outputs = [];
    let panels = document.getElementsByClassName('panel');
    while (panels.length > 0) {
        panels[0].remove();
    }

    // Choosing a random panel
    let chosenPanel = [];
    switch (panelSize) {
        case 3:
            chosenPanel = chooseFromArray(panel3x3, false);
            break;
        case 4:
            chosenPanel = chooseFromArray(panel4x4, false);
            break;
        case 5:
            chosenPanel = chooseFromArray(panel5x5, false);
            break;
        default:
            throw 'Error: Panel size must be between 3 and 5!';
    }

    //Setting up the grid for each board
    let gridStyle = '';
    for (let i = 0; i < panelSize; i++) {
        gridStyle += '1fr';
        if (i < panelSize - 1) {
            gridStyle += ' ';
        }
    }

    // Applying the new grid style to both boards
    let inputBoard = document.getElementById('board-input');
    let outputBoard = document.getElementById('board-output');
    inputBoard.style.gridTemplateColumns = gridStyle;
    inputBoard.style.gridTemplateRows = gridStyle;
    outputBoard.style.gridTemplateColumns = gridStyle;
    outputBoard.style.gridTemplateRows = gridStyle;
    
    // Creating the panels for each board
    for (let i = 0; i < panelSize; i++) {
        activePanels.inputs.push([]);
        activePanels.outputs.push([]);
        for (let j = 0; j < panelSize; j++) {
            let panelDecision = chosenPanel[i][j] === 1 ? 'panel-light' : 'panel-dark';

            let inputPanel = document.createElement('div');
            inputPanel.className = `panel panel-input ${panelDecision} clickable`;
            inputBoard.appendChild(inputPanel);
            activePanels.inputs[i].push(inputPanel);
            inputPanel.addEventListener('click', panelClick);

            let outputPanel = document.createElement('div');
            outputPanel.className = `panel panel-input ${panelDecision}`;
            outputBoard.appendChild(outputPanel);
            activePanels.outputs[i].push(outputPanel);
        }
    }

    // Arranging the input panels to be different from the output
    rearrangePanels(panelSize);
    updateMovesLeft();
}


/**
 * Rearranges the input panels to be different to the output panels
 * @param {Integer} panelSize The size of the panel. Is between 3 and 5 
 */
function rearrangePanels(panelSize) {
    // Calculating how many times the player has to flip to match the panels
    let attempts = 0;
    switch(panelSize) {
        case 3:
            attempts = 1;
            break;
        case 4:
            attempts = 1 + Math.floor(Math.random() * 2);
            break;
        case 5:
            attempts = 2;
            break;
        default:
            throw 'Error: Panel size must be between 3 and 5!';
    }
    activePanels.attempts = attempts;
    let previousMoves = [];

    while (attempts > 0) {
        let x = Math.floor(Math.random() * panelSize);
        let y = Math.floor(Math.random() * panelSize);

        let hasSameInput = false;
        for (let move of previousMoves) {
            if (x === move.x && y === move.y) {
                hasSameInput = true;
                break;
            }
        }
        if (!hasSameInput) {
            activatePanels(activePanels.inputs[x][y]);
            previousMoves.push({
                x: x,
                y: y
            });
            attempts--;
        }
    }
}


/**
 * Is called when a panel is clicked
 * @param {Object} event The information about the click event
 */
function panelClick(event) {
    if (activePanels.attempts > 0) {
        let clickedPanel = event.target;
        activatePanels(clickedPanel);
        activePanels.attempts--;
        updateMovesLeft();

        if (activePanels.attempts === 0) {
            // Check if the player has won or lost
            let hasWon = true;
            for (let i = 0; i < activePanels.inputs.length && hasWon; i++) {
                for (let j = 0; j < activePanels.inputs.length && hasWon; j++) {
                    let inputPanel = activePanels.inputs[i][j];
                    let outputPanel = activePanels.outputs[i][j];

                    let inIsLight = inputPanel.className.includes('panel-light');
                    let outIsLight = outputPanel.className.includes('panel-light');

                    if (inIsLight !== outIsLight) {
                        hasWon = false;
                    }
                }
            }
            if (hasWon) {
                let panels = document.getElementsByClassName('panel');
                for (let panel of panels) {
                    panel.className += ' won-game-cards';
                }
                setTimeout(startFade, 1000, true, progress, 'door-puzzle');
                setPanelFinal('success');
            }
            else {
                setTimeout(startFade, 1000, true, failRoom, 'door-puzzle');
                setPanelFinal('fail');
            }
        }
    }
}


/**
 * Flips a panel and all the panels that surround it
 * @param {Object} panelElement The panel to flip
 */
function activatePanels(panelElement) {
    // Finding the panel in the activePanels array
    let coords = getPanelPosition(panelElement);

    for (let i = 0; i < activePanels.inputs.length; i++) {
        for (let j = 0; j < activePanels.inputs.length; j++) {
            if (i >= coords.x - 1 && i <= coords.x + 1 && j >= coords.y - 1 && j <= coords.y + 1) {
                flipPanel(activePanels.inputs[i][j]);
            }
        }
    }
}


/**
 * Finds the coordinates of a specific input panel element
 * @param {Object} panelElement The element whose coordinates you wish to find
 * @returns {Object} { x, y }
 */
function getPanelPosition(panelElement) {
    let xPosition = 0;
    let yPosition = 0;
    
    while (xPosition < activePanels.inputs.length) {
        yPosition = 0;
        while (yPosition < activePanels.inputs.length) {
            if (panelElement === activePanels.inputs[xPosition][yPosition]) {
                break;
            }
            yPosition++;
        }
        if (panelElement === activePanels.inputs[xPosition][yPosition]) {
            break;
        }
        xPosition++;
    }
    return {
        x: xPosition,
        y: yPosition
    }
}


/**
 * Flips a panel between light and dark
 * @param {Object} panelElement The panel to flip
 */
function flipPanel(panelElement) {
    let classes = panelElement.className;

    if (classes.includes('panel-light')) {
        classes = classes.replace(' panel-light', '');
        classes += ' panel-dark';
    }
    else if (classes.includes('panel-dark')) {
        classes = classes.replace(' panel-dark', '');
        classes += ' panel-light';
    }
    panelElement.classList = classes;
}


/**
 * Updates the amount of moves remaining for the panels game
 */
function updateMovesLeft() {
    let movesText = document.getElementById('panel-attempts');
    movesText.innerText = `Moves remaining: ${activePanels.attempts}`;
}


/**
 * Updates all the panels images depending on if the player won or lost
 * @param {String} conclusion Must be either "fail" or "success" to work properly
 */
function setPanelFinal(conclusion) {
    let panels = document.getElementsByClassName('panel');
    for (let panel of panels) {
        panel.classList.add(`panel-${conclusion}`);
    }
}


// Matching pair game

// global variables
const cardArea = document.getElementById('game-container');
const cardInfo = [
    { name: 'runea', image: 'assets/images/game/runes/rune-a.png', alt: 'rune a one' },
    { name: 'runea', image: 'assets/images/game/runes/rune-a.png', alt: 'rune a two' },
    { name: 'runeb', image: 'assets/images/game/runes/rune-b.png', alt: 'rune b one' },
    { name: 'runeb', image: 'assets/images/game/runes/rune-b.png', alt: 'rune b two' },
    { name: 'runec', image: 'assets/images/game/runes/rune-c.png', alt: 'rune c one' },
    { name: 'runec', image: 'assets/images/game/runes/rune-c.png', alt: 'rune c two' },
    { name: 'runed', image: 'assets/images/game/runes/rune-d.png', alt: 'rune d one' },
    { name: 'runed', image: 'assets/images/game/runes/rune-d.png', alt: 'rune d two' },
    { name: 'runee', image: 'assets/images/game/runes/rune-e.png', alt: 'rune e one' },
    { name: 'runee', image: 'assets/images/game/runes/rune-e.png', alt: 'rune e two' },
    { name: 'runef', image: 'assets/images/game/runes/rune-f.png', alt: 'rune f one' },
    { name: 'runef', image: 'assets/images/game/runes/rune-f.png', alt: 'rune f two' },
    { name: 'runeg', image: 'assets/images/game/runes/rune-g.png', alt: 'rune g one' },
    { name: 'runeg', image: 'assets/images/game/runes/rune-g.png', alt: 'rune g two' },
    { name: 'runeh', image: 'assets/images/game/runes/rune-h.png', alt: 'rune h one' },
    { name: 'runeh', image: 'assets/images/game/runes/rune-h.png', alt: 'rune h two' },
];
const cardFronts = document.getElementsByClassName('cardFront');
const flippedCards = document.getElementsByClassName('flipCard');
const toggledCards = document.getElementsByClassName('toggleCard');
// an array for the cards to go in when generated
const gameCards = [];
// an array for the cards to go in when matched
const matchedCards = [];
const audioFlip = new Audio('assets/audio/card-flip-audio.mp3');
const audioMatch = new Audio('assets/audio/card-match-audio.mp3');
let audioState = 0;
const timeCount = document.getElementById('time');
let time = '60';
timeCount.textContent = time;


/**
 *  Generates cards into the game-container section
 */
function generateCards() {
    cardInfo.sort(() => Math.random() - 0.5);
    // create the HTML
    for (let i = 0; i < cardInfo.length; i++) {
        let cardsDiv = document.createElement('div');
        // add cards
        cardsDiv.classList.add('card');
        cardsDiv.setAttribute('name', cardInfo[i].name);
        cardArea.appendChild(cardsDiv);
        // add card front, showing the image, to each card
        let cardFront = document.createElement('img');
        cardFront.classList.add('cardFront');
        cardFront.setAttribute('src', cardInfo[i].image);
        cardFront.setAttribute('alt', cardInfo[i].alt);
        cardsDiv.appendChild(cardFront);
        // add card back to each card
        let cardBack = document.createElement('div');
        cardBack.textContent = '?';
        cardBack.classList.add('cardBack');
        cardsDiv.appendChild(cardBack);
        gameCards.push(cardsDiv);

        // adds event listeners to each card
        for (let card of gameCards) {
            card.addEventListener('click', turnCard);
            card.addEventListener('click', flipCard);
            card.addEventListener('click', timeGame);
            card.addEventListener('click', checkMatch);
            card.addEventListener('click', wonGame);
            card.addEventListener('click', disableGame);
        }
    }
}

/**
 * Adds or removes the class 'toggleCard' whenever a card is clicked
 */
function turnCard() {
    this.classList.toggle('toggleCard');
}

/**
 * Adds a class of 'flipCard' and sound effect to any card that is clicked
 */
function flipCard() {
    this.classList.add('flipCard');
    audioFlipPlay();
}

/**
* Compares the names of the two flipped cards and check if they match
*/
function checkMatch() {
    // function doesn't execute until it's checked that two cards have been flipped
    if (flippedCards.length === 2) {
        // checks if the name value of the two cards match
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            // 500ms delay so the cardMatch sound plays after the cardFlip sound
            if (audioState === 0) {
                setTimeout(function () {
                    audioMatch.currentTime = 0;
                    audioMatch.play();
                }, 500);
            }

            // stops the matched cards being able to be clicked again and pushed the cards into a matchedCards array
            for (let card of flippedCards) {
                card.style.pointerEvents = 'none';
                matchedCards.push(card);
            }
            // removes the flipCard class for those cards that have been matched. 
            // There is a setTimeout of 1.5 seconds as this is how long it takes the card to flip back. 
            // This prevents the user from being able to click it again
            flippedCards[0].classList.remove('flipCard');
            flippedCards[0].classList.remove('flipCard');
        } else {
            // code if the two flipped cards don't match
            for (let card of flippedCards) {
                // removes the toggleCard class so the card flip back over. One second timer set so the card still flips over before flipping back
                setTimeout(function () {
                    card.classList.remove('toggleCard');
                }, 1000);
            }
            flippedCards[0].classList.remove('flipCard');
            flippedCards[0].classList.remove('flipCard');
        }
    }
}

/**
 * Adds a class to cards if all are matched. This gives an animation and then a winning page 
 */
function wonGame() {
    // checks how many cards are in the matchedCards array. If this equals the number of cards in game the user has won
    if (matchedCards.length === gameCards.length) {
        abort = true;
        // delays animation by half a second to improve user experience
        setTimeout(function () {
            // adds the won-game-bears class which causes the cards to have a wiggle animation
            for (let card of cardFronts) {
                card.classList.add('won-game-cards');
            }
        }, 500);
        setTimeout(startFade, 2000, true, progress, 'door-medium');
        playerScoreSpan += 2;
    }
}

/**
 * Disables the event listeners while there are two unmatched cards flipped
 */
function disableGame() {
    // this needs to be a formula as the toggleClass class still shows when the cards are matched. This ensures it's only the number of  
    if (toggledCards.length - matchedCards.length >= 2) {
        for (let card of gameCards) {
            card.removeEventListener('click', turnCard);
            card.removeEventListener('click', flipCard);
            card.removeEventListener('click', wonGame);
            card.removeEventListener('click', checkMatch);
        }
        checkMatch();
    } else {
        for (let card of gameCards) {
            card.addEventListener('click', turnCard);
            card.addEventListener('click', flipCard);
            card.addEventListener('click', checkMatch);
            card.addEventListener('click', wonGame);
        }
    }
}

// this fixes a delay for the user being able to click the next card
setInterval(disableGame, 500);

/** 
 * Checks the status of the audio button and plays audio on flip
 */
function audioFlipPlay() {
    if (audioState === 1) {
        return;
    }
    audioFlip.currentTime = 0;
    audioFlip.play();
}

/**
 * Decreases the timer by one every second
 */
let abort = false;
function timeGame() {
    if (abort) {
        return;
    } else {
        let currentTime = timeCount.innerHTML;
        currentTime--;
        timeCount.innerHTML = currentTime;
        setTimeout(timeGame, 1000);
        // to stop the function being called with every click
        for (let card of gameCards) {
            card.removeEventListener('click', timeGame);
        }
    }
}

function lostGame() {
    // check to see if the timer reaches zero
    if (timeCount.textContent === '0') {
        // end page to appear
        ghostScoreSpan += 1;
        setTimeout(startFade, 1000, true, failRoom, 'door-medium');
    }
}

// to check each half a second if the timer has reached zero
setInterval(lostGame, 500);