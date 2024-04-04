// themeReducer.js

// Initial state
const themeInitialState = 'light';

// Reducer function
const themeReducer = (state = themeInitialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

export { themeInitialState, themeReducer };
