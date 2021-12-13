import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parseFormulaInput } from '@core/parseFormulaInput';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(colState, index) {
  return (colState ? colState[index] : DEFAULT_WIDTH) + 'px';
}

function getHeight(roeState, index) {
  return (roeState ? roeState[index] : DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });
    return `
      <div class="cell" contenteditable 
      data-col="${col}" 
      data-type="cell" 
      data-id="${id}" 
      data-value="${data || ''}"
      style="${styles}; width: ${getWidth(state.colState, col)}">
      ${parseFormulaInput(data) || ''}
      </div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content, rowState = {}) {
  // eslint-disable-next-line max-len
  const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
  const height = getHeight(rowState, index);
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
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

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    };
  };
}

/**
 * Creates excel table
 * @param rowsCount amount of rows in the table
 * @returns
 */
export function createTable(rowsCount = 15, state = {}) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  // create table cols
  const columnNames = new Array(columnsCount)
    // fill array with empty string
    .fill('')
    // make each element of array an alphabet literal
    .map(toChar)
    .map(withWidthFrom(state))
    // make column out of each array element
    .map(toColumn)
    // convert array into string with empty space as divider
    .join('');

  // create rows with createdCols as basis
  rows.push(createRow(null, columnNames));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount).fill('').map(toCell(state, row)).join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
