import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { TableSelection } from './TableSelection';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, selectionMatrix, nextSelector } from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
      ...options
    });
    this.emitter = options.emitter;
  }
  toHTML() {
    return createTable(42);
  }

  prepareComponent() {
    this.tableSelection = new TableSelection();
  }

  init() {
    super.init();
    const $selectedCell = this.$root.find('[data-id="0:0"]');
    // set very firts cell as selected
    this.selectCell($selectedCell);

    this.$on('formula:input', (text) => {
      this.tableSelection.currentSelection.text(text);
    });

    this.$on('formula:enter', () => {
      this.tableSelection.currentSelection.focus();
    });
  }

  selectCell($cell) {
    this.tableSelection.select($cell);
      this.$emit('table:cellSelection', this.tableSelection.currentSelection);
  }

  onClick() {}

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $cellToSelect = $(event.target);
      if (event.shiftKey) {
        const $cells = [];
        selectionMatrix($cellToSelect, this.tableSelection.currentSelection).forEach((id) => {
          $cells.push(this.$root.find(`[data-id="${id}"]`));
        });
        this.tableSelection.selectGroup($cells);
      } else {
        this.tableSelection.select($cellToSelect);
        this.$emit('table:cellSelection', this.tableSelection.currentSelection);
      }
    }
  }

  onMousemove() {
    // console.log(event.target)
  }

  onMouseup() {
    // console.log(event.target)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.tableSelection.currentSelection.id(true);
      const $nextSelection = this.$root.find(nextSelector(key, id));
      this.selectCell($nextSelection);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}

// 561 ms  Scripting
// 1432 ms  Rendering

// 688 ms  Scripting
// 1344 ms  Rendering

// after remove logic in the onMouseUp section
// 381 msScripting
// 160 msRendering
