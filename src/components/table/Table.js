import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { TableSelection } from '@/components/table/TableSelection';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize, isCell, selectionMatrix, nextSelector } from './table.functions';
import * as actionCreators from '@/redux/actionCreators';
import { defaultStyles } from '@/constants';
import { parseFormulaInput } from '../../core/parseFormulaInput';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
      ...options
    });
    this.emitter = options.emitter;
    this.store = options.store;
  }

  toHTML() {
    return createTable(42, this.store.getState());
  }

  prepareComponent() {
    this.tableSelection = new TableSelection();
  }

  init() {
    super.init();
    const $selectedCell = this.$root.find('[data-id="0:0"]');
    // set very firts cell as selected
    this.selectCell($selectedCell);

    this.$on('formula:input', (value) => {
      this.tableSelection.currentSelection.attr('data-value', value);
      this.tableSelection.currentSelection.text(parseFormulaInput(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:enter', () => {
      this.tableSelection.currentSelection.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.tableSelection.applyStyle(style);
      this.$dispatch(
        actionCreators.applyStyle({
          value: style,
          ids: this.tableSelection.selectedIds
        })
      );
    });
  }

  selectCell($cell) {
    this.tableSelection.select($cell);
    this.$emit('table:cellSelection', this.tableSelection.currentSelection);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actionCreators.changeStyles(styles));
  }

  onClick() {}

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actionCreators.tableResize(data));
    } catch (e) {
      console.warn('Resize error: ', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $cellToSelect = $(event.target);
      if (event.shiftKey) {
        const $cells = [];
        selectionMatrix($cellToSelect, this.tableSelection.currentSelection).forEach((id) => {
          $cells.push(this.$root.find(`[data-id="${id}"]`));
        });
        this.tableSelection.selectGroup($cells);
      } else {
        this.selectCell($cellToSelect);
      }
    }
  }

  onMousemove() {}

  onMouseup() {}

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

  updateTextInStore(value) {
    this.$dispatch(actionCreators.changeText({ id: this.tableSelection.currentSelection.id(), value }));
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target).text());
    this.updateTextInStore($(event.target).text());
  }
}

// 561 ms  Scripting
// 1432 ms  Rendering

// 688 ms  Scripting
// 1344 ms  Rendering

// after remove logic in the onMouseUp section
// 381 msScripting
// 160 msRendering
