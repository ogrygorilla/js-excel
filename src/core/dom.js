class Dom {
  /**
   * Set dom elelment to `$el` property
   * @param selector selector to find certain dom element
   */
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * Inners html to dom instance element or returns
   * html of element
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
   * Getter/Setter for text property of dom instance element.
   * @param {string| undefined} text
   * @returns context of the current dom instance or text content of an element.
   */
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
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
   * @returns found element that match the selector
   */
  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  /**
   * @param selector selector to find specific element within current dom instance element
   * @returns found elements that match the selector
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /**
   * Sets focus on current element
   * @returns current context of dom class
   */
  focus() {
    this.$el.focus();
    return this;
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

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$el.style[style];
      return res;
    }, {});
  }

  /**
   * Adds class to the dom instance element
   * @param className class name to be added
   */
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  /**
   * Removes class from the dom instance element
   * @param className class name to be removed
   */
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  /**
   * @returns id of the element or parsed id depending on @param parse flag
   */
  id(parse) {
    if (parse) {
      const parsedId = this.id().split(':');
      return {
        row: +parsedId[0],
        col: +parsedId[1]
      };
    }
    return this.data.id;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }

    return this.$el.getAttribute(name);
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
