// src/firebaseUtils.js

import { database } from '../firebase/FirebaseConfig';

export const addExpense = (expense) => {
  return database.ref('expenses').push(expense);
};

export const getExpenses = () => {
  return database.ref('expenses').once('value');
};
