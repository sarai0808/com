let matriz = shuffleMetrix();
let board = document.querySelector('#board');

drawTokens();
addEventListeners();

function drawTokens() {
    board.innerHTML = ''; // Limpia el contenido previo
    matriz.forEach(row => {
        row.forEach(elemento => {
            if (elemento === '') {
                board.innerHTML += `<div class='empty'>${elemento}</div>`;
            } else {
                board.innerHTML += `<div class='token'>${elemento}</div>`;
            }
        });
    });
}

function addEventListeners() {
    let tokens = document.querySelectorAll('.token');
    tokens.forEach(token => token.addEventListener('click', () => {
        let actualPosicion = searchPosition(token.innerText);
        let empltyPosition = searchPosition('');
        let movement = nextMovement(actualPosicion, empltyPosition);
        if (movement !== false) {
            updateMatrix(token.innerText, actualPosicion, empltyPosition);
            let resultado = compararMatriz();
            if (resultado === true) {
                confetti();
            }
            drawTokens();
            addEventListeners();
        }
    }));
}

function searchPosition(elemento) {
    let rowIndex = 0;
    let columnIndex = 0;
    matriz.forEach((row, rompecabezas) => {
        let rowElement = row.findIndex(item => item == elemento);
        if (rowElement !== -1) {
            rowIndex = rompecabezas;
            columnIndex = rowElement;
        }
    });
    return [rowIndex, columnIndex];
}

function nextMovement(actualPosicion, empltyPosition) {
    if (actualPosicion[1] == empltyPosition[1]) {
        if (Math.abs(actualPosicion[0] - empltyPosition[0]) > 1) {
            return false;
        }
    } else if (actualPosicion[0] == empltyPosition[0]) {
        if (Math.abs(actualPosicion[1] - empltyPosition[1]) > 1) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

function updateMatrix(elemento, actualPosicion, empltyPosition) {
    matriz[actualPosicion[0]][actualPosicion[1]] = '';
    matriz[empltyPosition[0]][empltyPosition[1]] = elemento;
}

function shuffleMetrix() {
    let shuffleMetrix = [[], [], []];
    let array = ['1', '2', '3', '4', '5', '6', '7', '8', ''];
    let shuffledArray = array.sort(() => Math.random() - 0.5);
    let column = 0;
    let row = 0;
    shuffledArray.forEach(elemento => {
        shuffleMetrix[row].push(elemento);
        if (column < 2) {
            column++;
        } else {
            column = 0;
            row++;
        }
    });
    return shuffleMetrix;
}

function compararMatriz() {
    let counter = 0;
    let matrizFinal = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '']
    ];
    matriz.forEach((row, indexRow) => {
        row.forEach((elemento, indexColumn) => {
            if (elemento == matrizFinal[indexRow][indexColumn]) {
                counter++;
            }
        });
    });
    return counter === 9;
}
