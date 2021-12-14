import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
    this.emitter = options.emitter;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:cellSelection', ($cell) => {
      this.$formula.text($cell.text());
    });

    // this.$on('table:input', (text) => {
    //   this.$formula.text(text);
    // });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onClick() {}

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
