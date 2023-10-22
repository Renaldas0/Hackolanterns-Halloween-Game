// Stores all the possible panel combinations
const panel3x3 = [
    [[0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]],

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
];
const panel5x5 = [
    [[0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0]],
];

const activePanels = {
    inputs: [],
    outputs: []
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
}


/**
 * Rearranges the 
 * @param {*} attempts 
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

    for (let i = 0; i < attempts; i++) {
        let x = Math.floor(Math.random() * panelSize);
        let y = Math.floor(Math.random() * panelSize);

        activatePanels(activePanels.inputs[x][y]);
    }
}


/**
 * Is called when a panel is clicked
 * @param {Object} event The information about the click event
 */
function panelClick(event) {
    let clickedPanel = event.target;
    activatePanels(clickedPanel);
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