import { storage } from '@core/utils';

export function toHTML() {
  return function (tableStateKey) {
    const tableState = storage(tableStateKey);
    const tableId = tableStateKey.split(':')[1];
    return `
        <li class="db__record">
            <a href="#excel/${tableId}">${tableState.title}</a>
            <strong>
                ${new Date(tableState.openedDate).toLocaleDateString()}
                ${new Date(tableState.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `;
  };
}

function getAllTableKeys() {
  const tableKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    tableKeys.push(key);
  }
  return tableKeys;
}

export function createTablesList() {
  const tableKeys = getAllTableKeys();
  if (!tableKeys.length) {
    return `
        <div class="db__list-header">
            No table was created yet
        </div>`;
  }

  return `
    <div class="db__list-header">
        <span>Name</span>
        <span>Opening date</span>
    </div>
    <ul class="db__list">
        ${tableKeys.map(toHTML()).join('')}
    </ul>
  `;
}
