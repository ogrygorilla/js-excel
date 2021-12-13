import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@/redux/actionCreators';
import { preventDefault } from '@core/utils';

export class Excel {
  /**
   * Creates dom elemet instance property and sets `$el` and options property with provided arguments.
   * @param selector
   * @param options
   */
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.storeSubscriber = new StoreSubscriber(this.store);
  }

  /**
   * Appends all components, contained in the `component` property
   * as dom element instance with innered html to the root element.
   * @returns root element
   */
  getRoot() {
    // create root dom instance element
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      // DEBUG
      /* if (component.name) {
                window['c' + component.name] = component
            }*/
      // get component html and inner it to dom instance element of this component
      $el.html(component.toHTML());
      // append dom instance element to the root
      $root.append($el);
      return component;
    });
    return $root;
  }

  /**
   * Appends root element to excel instance, initialize each
   * component, which is provided to excel class property.
   */
  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.storeSubscriber.subscribeComponents(this.components);
    // initialize event listeners for each component
    this.components.forEach((component) => component.init());
  }

  /**
   *
   */
  destroy() {
    this.storeSubscriber.unsubscribeFromStore();
    // Unsubscribe from all subscriptions in each component.
    this.components.forEach((component) => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}
