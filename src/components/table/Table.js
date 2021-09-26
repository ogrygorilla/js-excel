import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    });
  }
  toHTML() {
    return createTable(42);
  }

  onClick() {
    console.log();
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onMousemove() {
    // console.log(event.target)
  }

  onMouseup() {
    // console.log(event.target)
  }
}

// 561 ms  Scripting
// 1432 ms  Rendering

// 688 ms  Scripting
// 1344 ms  Rendering

// after remove logic in the onMouseUp section
// 381 msScripting
// 160 msRendering