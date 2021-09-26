import { $ } from "@core/dom";

export class Excel {
  /**
   * Creates dom elemet instance property and sets `$el` and options property with provided arguments.
   * @param selector
   * @param options
   */
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  /**
   * Appends all components, contained in the `component` property
   * as dom element instance with innered html to the root element.
   * @returns root element
   */
  getRoot() {
    // create root dom instance element
    const $root = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);
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
  render() {
    // get root element and append it to `$el` property of excel instance
    this.$el.append(this.getRoot());

    // initialize event listeners for each component
    this.components.forEach((component) => component.init());
  }
}
