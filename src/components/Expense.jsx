import React, { useState, useEffect } from "react";
import styles from "./Expense.module.css";
import { useSelector, useDispatch } from "react-redux";


const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  const dispatch = useDispatch(); 
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    fetchExpenses();
  }, []);

  
  useEffect(() => {
    const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.moneySpent), 0);
    setTotalExpenses(total);
    if (total <= 10000 && theme === 'dark') {
      dispatch({ type: 'TOGGLE_THEME' }); 
    }
  }, [expenses, theme]);


  const fetchExpenses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(
        `https://expensesh-ef202-default-rtdb.firebaseio.com/users/${userId}/expenses.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();
      if (data && typeof data === 'object') {
        const expensesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(expensesArray);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const newExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      let response;
      if (editExpenseId) {
        response = await fetch(
          `https://expensesh-ef202-default-rtdb.firebaseio.com/users/${userId}/expenses/${editExpenseId}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newExpense),
          }
        );
      } else {
        response = await fetch(
          `https://expensesh-ef202-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newExpense),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to add/update expense");
      }

      fetchExpenses();

      setMoneySpent("");
      setDescription("");
      setCategory("");
      setEditExpenseId(null);
    } catch (error) {
      console.error("Error adding/updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await fetch(
      `https://expensesh-ef202-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }
    console.log("Expense successfully deleted");

    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

 
  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    if (expenseToEdit) {
      setMoneySpent(expenseToEdit.moneySpent);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
      setEditExpenseId(expenseId);
    }
  };

  const handleToggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  
  const handleDownloadCSV = () => {
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + expenses.map(expense => Object.values(expense).slice(1).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={`${styles.expenseContainer} ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <form onSubmit={handleFormSubmit} className={styles.expenseForm}>
        <h2>{editExpenseId ? "Edit Expense" : "Add Expense"}</h2>
        <div className={styles.formGroup}>
          <label htmlFor="moneySpent">Money Spent:</label>
          <input
            type="text"
            id="moneySpent"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button type="submit">{editExpenseId ? "Update" : "Add"}</button>
      </form>

      <div className={styles.expenseList}>
        <h2>Expenses</h2>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <strong>Money Spent:</strong> {expense.moneySpent},{" "}
                <strong>Description:</strong> {expense.description},{" "}
                <strong>Category:</strong> {expense.category}
                <button onClick={() => handleEditExpense(expense.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>

      {(totalExpenses > 10000) && (
        <button onClick={handleToggleTheme}>{theme === 'light' ? '🌚 Activate Dark Theme' : '🌞 Activate Light Theme'}</button>
      )}

      <button onClick={handleDownloadCSV}>Download File</button>
    </div>
  );
};

export default Expense;
