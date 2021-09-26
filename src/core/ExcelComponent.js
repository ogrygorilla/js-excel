import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }
  /**
   * returns template of component
   */
  toHTML() {
    return '';
  }

  /**
   * Initializes dom listeners for current component
   */
  init() {
    this.initDOMListeners();
  }

  /**
   * Removes dom listeners for current component
   */
  destroy() {
    this.removeDOMListeners();
  }
}
