class Dom {
  /**
   * Set dom elelment to `$el` property
   * @param selector selector to find certain dom element
   */
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * Inners html to dom instance element
   * @param html html to inner
   * @returns
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  /**
   * Clears the html of Dom instance
   */
  clear() {
    this.html('');
    return this;
  }

  /**
   * Adds eventlistener to element
   * @param eventType type of event to add
   * @param callback callback to execute
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  /**
   * Removes eventlistener of element
   * @param eventType type of event to remove
   * @param callback callback to execute
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  /**
   * Appends dom node to element of Dom instance
   * @param node dom node to append
   * @returns Dom instance
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  /**
   * Returns data attribute set of Dom element
   */
  get data() {
    return this.$el.dataset;
  }

  /**
   * @param selector
   * @returns closest element
   */
  closest(selector) {
    return $(this.$el.closest(selector));
  }

  /**
   * @returns current coordinates of dom instance element
   * The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels.
   */
  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  /**
   * @param selector selector to find specific element within current dom instance element
   * @returns found elements that match the selector
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /**
   * Adds styles to dom instance element
   * @param styles object that contains styles to add in key -> value format
   */
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
}
/**
 * Creates dom instance depending on provided selector
 * @param selector
 * @returns dom instance
 */
export function $(selector) {
  return new Dom(selector);
}

/**
 * Creates html element
 * @param tagName html-tag name
 * @param classes list of classes of the created element
 * @returns new Dom-element
 */
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
