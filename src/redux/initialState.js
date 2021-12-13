import { defaultStyles, defaultTitle } from '@/constants';
import { clone } from '@core/utils';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  stylesState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
