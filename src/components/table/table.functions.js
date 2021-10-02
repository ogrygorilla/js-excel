import { range } from '@core/utils';

/**
 * @param event
 * @returns `true` if resizer was clicked and is present in the event
 */
export function shouldResize(event) {
  return event.target.dataset.resize ? true : false;
}

/**
 * @param event
 * @returns `true` if type of clicked element is cell
 */
export function isCell(event) {
  return event.target.dataset.type === 'cell' ? true : false;
}

/**
 * Calculates range og selected colums and rows, makes selection matrix
 * out of this rangesand returns it
 * @param $cellToSelectId id of cell that is be selected
 * @param currentSelectionId id of current selected cell
 * @returns matrix of selected elements
 */
export function selectionMatrix($cellToSelect, currentSelection) {
  const $cellToSelectId = $cellToSelect.id(true);
  const currentSelectionId = currentSelection.id(true);

  const rangeCols = range(currentSelectionId.col, $cellToSelectId.col);
  const rangeRows = range(currentSelectionId.row, $cellToSelectId.row);

  return rangeCols.reduce((acc, col) => {
    rangeRows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);
}

/**
 * Calculates the index of cell that will be marked as selected 
 * depending on pressed keyboard key
 * @param {*} key keyboard key 
 * @param col @param row col and row index of cell to be celected
 * @returns 
 */
export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
      break;
    case 'Tab':
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    case 'ArrowDown':
      row++;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
