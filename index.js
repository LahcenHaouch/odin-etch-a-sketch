
(function createGrid() {
  const gridElement = document.querySelector('#grid');

  for (let i = 0; i < 16; i++) {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row');
    for (let i = 0; i < 16; i++) {
      const rowCellElement = document.createElement('div')
      rowCellElement.classList.add('row-cell');
      rowCellElement.addEventListener('mouseenter', event => {
        event.currentTarget.classList.add('active');
      });

      rowElement.appendChild(rowCellElement);
    }
    gridElement.appendChild(rowElement);
  }
})();