import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  // create dom instance of event target
  const $resizer = $(event.target);
  // get resizer parent element
  const $parent = $resizer.closest('[data-type="resizable"]');
  // get coordinates of parent element
  const coords = $parent.getCoords();
  // get resizer type, `col` or `row`
  const type = $resizer.data.resize;
  // resizer line direction
  const resizerLineDirection = type === 'col' ? 'bottom' : 'right';
  let value;

  // make resizer visible
  $resizer.css({ opacity: 1, [resizerLineDirection]: '-5000px' });

  document.onmousemove = (e) => {
    if (type === 'col') {
      // calculate delta of resizer offset
      // e.pageX: current coords
      // coords.right: coords bevore moving
      const delta = e.pageX - coords.right;
      // calculate current width of resizer
      value = coords.width + delta;
      // adjust cells which are on the resizer line (vertical)
      $resizer.css({ right: -delta + 'px' });
    } else {
      // calculate delta of resizer offset
      const delta = e.pageY - coords.bottom;
      // calculate current height of resizer
      value = coords.height + delta;
      // adjust height of resizer parent element (row cell)
      $resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({ width: value + 'px' });
      // get all table cells where data atribbute match specified selector
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
      cells.forEach((el) => {
        el.style.width = value + 'px';
      });
    } else {
      $parent.css({ height: value + 'px' });
    }

    // reset resizer
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    });
  };
}
