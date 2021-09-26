const CODES = {
  A: 65,
  Z: 90
};

function toCell(_, index) {
  return `
    <div class="cell" contenteditable data-col="${index}"></div>
    `;
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content) {
  // eslint-disable-next-line max-len
  const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

/**
 * Creates excel table
 * @param rowsCount amount of rows in the table
 * @returns
 */
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  // create table cols
  const cols = new Array(colsCount)
  // fill array with empty string
  .fill('')
  // fill each element of array with alphabet literal
  .map(toChar)
  // make column out of each array element
  .map(toColumn)
  // convert array into string with empty space as divider
  .join('');

  // create rows with createdCols as basis
  rows.push(createRow(null, cols));

  /* const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')*/

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
