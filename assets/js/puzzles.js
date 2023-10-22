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


function createPanels(panelSize) {
    // First, delete any existing panels that have been created from previous puzzles
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
        for (let j = 0; j < panelSize; j++) {
            let panelDecision = chosenPanel[i][j] === 1 ? 'panel-light' : 'panel-dark';

            let inputPanel = document.createElement('div');
            inputPanel.className = `panel panel-input ${panelDecision} clickable`;
            inputBoard.appendChild(inputPanel);

            let outputPanel = document.createElement('div');
            outputPanel.className = `panel panel-input ${panelDecision}`;
            outputBoard.appendChild(outputPanel);
        }
    }
}