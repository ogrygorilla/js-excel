import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepareComponent();
  }
  /**
   * returns template of component
   */
  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsubscribtion = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsubscribtion);
  }

  prepareComponent() {}

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
    this.unsubscribers.forEach((unsubscribtion) => {
      unsubscribtion();
    });
  }
}
