export class Emitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * Runs the fucntion as soon, as provided event was fired.
   * @param {string} event attended event name.
   * @param  {array} args arguments of the corresponding function
   * to be called after event fired.
   * @returns `true` if on succes, `false` on failure.
   */
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  /**
   * Registers event and corresponding function 
   * that will be called wenn event will be fired.
   * @param {string} event event name 
   * @param {function)} fn callback
       
   }} fn 
   * @returns 
   */
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        listener !== fn;
      });
    };
  }
}
