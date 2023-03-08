const GRID_SIZE = {
  width: 960,
};
const RAINBOW_COLORS = ['rgb(148, 0, 211)', 'rgb(75, 0, 130)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(255, 255, 0)', 'rgb(255, 127, 0)', 'rgb(255, 0 , 0)'];
const INITIAL_NUMBER_OF_CELLS = 16;
const INITIAL_COLOR = '#1E5DC2';

function getCellDimensions(gridWidth, numberOfRowsAndColumns) {
  return gridWidth / numberOfRowsAndColumns;
}

let numberOfRowsAndColumns = INITIAL_NUMBER_OF_CELLS;
let currentColor = INITIAL_COLOR;
let useRainbowColors = false;

function calculateDarkerColor(color) {
  const parsedColor = Number.parseInt(color, 10);
  return Math.round(parsedColor * (1 / 2));
}

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
        if (useRainbowColors) {
          if (event.currentTarget.classList.contains('rainbow')) {
            // Next color gets darker
            const eventBackgroundColor = event.currentTarget.style.backgroundColor;

            const [red, green, blue] = eventBackgroundColor.substring(4, eventBackgroundColor.length - 1).split(', ');

            currentColor = `rgb(${calculateDarkerColor(red)}, ${calculateDarkerColor(green)}, ${calculateDarkerColor(blue)})`;
          } else {
            event.currentTarget.classList.add('rainbow');
            const indexOfCurrentColor = RAINBOW_COLORS.indexOf(currentColor);
            if (indexOfCurrentColor === -1 || indexOfCurrentColor === RAINBOW_COLORS.length - 1) {
              currentColor = RAINBOW_COLORS[0];
            } else {
              currentColor = RAINBOW_COLORS[indexOfCurrentColor + 1];
            }
          }
        } else {
          if (event.currentTarget.classList.contains('rainbow')) {
            event.currentTarget.classList.remove('rainbow');
          }
        }
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
    row.classList.remove('rainbow');
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

  if (Number.isNaN(numberOfCells) || numberOfCells > 64) {
    return;
  } else {
    numberOfRowsAndColumns = numberOfCells;
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

// Use rainbow brush
const rainbowInput = document.querySelector('#rainbow-brush');
rainbowInput.addEventListener('click', event => {
  useRainbowColors = event.currentTarget.checked;

  if (!useRainbowColors) {
    currentColor = colorElement.value;
  }
})
