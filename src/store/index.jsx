// index.js

import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
// import expensesReducer from '../reducers/expenseReducer';
import { themeReducer } from '../reducers/themeReducer'; // Import named export

const rootReducer = combineReducers({
  auth: authReducer,
  // expenses: expensesReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
