const GRID_SIZE = {
  width: 480,
  height: 480
};
const INITIAL_NUMBER_OF_CELLS = 16;
const INITIAL_COLOR = '#EE62A8';

function getNumberOfRowsAndColumns(numberOfCells) {
  return Math.sqrt(numberOfCells);
}
function getCellDimensions(gridWidth, numberOfRowsAndColumns) {
  return gridWidth / numberOfRowsAndColumns;
}

const INITIAL_NUMBER_OF_ROWS_AND_COLUMNS = getNumberOfRowsAndColumns(INITIAL_NUMBER_OF_CELLS);

let numberOfRowsAndColumns = INITIAL_NUMBER_OF_ROWS_AND_COLUMNS;
let currentColor = INITIAL_COLOR;

function createGrid(numberOfRowsAndColumns, dimensions) {
  const gridElement = document.querySelector('#grid');

  for (let i = 0; i < numberOfRowsAndColumns; i++) {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row');
    for (let i = 0; i < numberOfRowsAndColumns; i++) {
      const rowCellElement = document.createElement('div')
      rowCellElement.classList.add('row-cell');
      rowCellElement.style.width = `${dimensions}px`;
      rowCellElement.style.height = `${dimensions}px`;
      rowCellElement.addEventListener('mouseenter', event => {
        event.currentTarget.classList.add('active');
        event.currentTarget.style.backgroundColor = currentColor;
      })

      rowElement.appendChild(rowCellElement);
    }
    gridElement.appendChild(rowElement);
  }
}

function deleteGrid() {
  document.querySelectorAll('.row').forEach(element => element.remove());
}

const dimensions = getCellDimensions(GRID_SIZE.width, numberOfRowsAndColumns);
createGrid(numberOfRowsAndColumns, dimensions);

// Clear grid 
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.active').forEach(row => {
    row.classList.remove('active');
    row.style.backgroundColor = 'white';
  });
})

// Change number of cells
const changeGridBtn = document.querySelector('#change-grid')
changeGridBtn.addEventListener('click', () => {
  const promptedNumberOfCells = prompt('Enter new grid size');

  if (!promptedNumberOfCells) {
    return;
  }

  const numberOfCells = Number.parseInt(promptedNumberOfCells, 10);

  if (Number.isNaN(numberOfCells) || numberOfCells > 64 || numberOfCells % 2 !== 0) {
    return;
  } else {
    numberOfRowsAndColumns = getNumberOfRowsAndColumns(numberOfCells);
    deleteGrid();

    const dimensions = getCellDimensions(GRID_SIZE.width, numberOfRowsAndColumns);
    createGrid(numberOfRowsAndColumns, dimensions);
  }
})

// Change color of drawing pen
const colorElement = document.querySelector('input[type=color]');
colorElement.value = currentColor;

colorElement.addEventListener('change', event => {
  currentColor = event.target.value;
})
