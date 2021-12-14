export class TableSelection {
  static className = 'selected';
  constructor() {
    // group of selected elements
    this.selectionGroup = [];
    this.currentSelection = null;
  }

  get selectedIds() {
    return this.selectionGroup.map(($el) => $el.id());
  }
  /**
   * Set provided element as selected
   * @param el dom instance element
   */
  select($el) {
    this.unselectAll();
    // mark element as selected element and set the focus on it
    $el.focus().addClass(TableSelection.className);
    this.selectionGroup.push($el);
    this.currentSelection = $el;
  }

  /**
   * Selects group of table cells
   * @param $group group to be selected
   */
  selectGroup($group = []) {
    this.unselectAll();
    this.selectionGroup = $group;
    this.selectionGroup.forEach(($el) => {
      $el.addClass(TableSelection.className);
    });
  }

  unselect() {
    // const selected = this.selectionGroup.shift();
  }

  unselectAll() {
    this.selectionGroup.forEach(($el) => {
      $el.removeClass(TableSelection.className);
    });
    this.selectionGroup = [];
  }

  applyStyle(style) {
    this.selectionGroup.forEach(($el) => {
      $el.css(style);
    });
  }
}
