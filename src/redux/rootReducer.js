import { CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE } from './types';

export function rootReducer(state, action) {
  let resizeFormat;
  let changeTextFormat;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      // prevRowState = state.rowState || {};
      // prevRowState[action.data.id] = action.data.value;
      resizeFormat = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [resizeFormat]: value(state, resizeFormat, action) };
    case CHANGE_TEXT:
      changeTextFormat = 'dataState';
      return { ...state, currentText: action.data.value, [changeTextFormat]: value(state, changeTextFormat, action) };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      val = state['stylesState'] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return { ...state, stylesState: val, currentStyles: { ...state.currentStyles, ...action.data.value } };
    case CHANGE_TITLE:
      return { ...state, title: action.data };
    case UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() };
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
