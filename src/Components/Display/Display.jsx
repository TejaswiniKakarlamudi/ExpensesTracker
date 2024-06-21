import React, { useState, useEffect } from 'react';
import styles from './Display.module.css';
import EditPopup from '../Popup/EditPopup';
import Piechart from '../Charts/Piechart';
import HorizontalBarChart from '../Charts/Barchart'; 
import { HiPencil, HiTrash } from 'react-icons/hi';
function Display() {
  const mainBalance = parseFloat(localStorage.getItem('mainbalance')) || 5000; 
  const [balance, setBalance] = useState(mainBalance);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedExpenses, setSelectedExpenses] = useState([
    { accountBalance: 4500 },
    {
      name: 'Move',
      price: 300,
      category: 'Entertainment',
      date: 'March 21,2024'
    },
    {
      name: 'Samosa',
      price: 150,
      category: 'Food',
      date: 'March 20,2024'
    },
    
    {
      name: 'Auto',
      price: 50,
      category: 'Travel',
      date: 'March 22,2024'
    }
  ]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    calculateInitialExpenses();
  }, []);

  const calculateInitialExpenses = () => {
    let totalExpenses = 0;
    selectedExpenses.forEach(expense => {
      if (!isNaN(parseFloat(expense.price))) {
        totalExpenses += parseFloat(expense.price);
      }
    });
    setExpensesTotal(totalExpenses);
    setBalance(mainBalance - totalExpenses);
  };

  const handleAddIncome = () => {
    setPopupTitle('Add Balance');
    setIsPopupOpen(true);
  };

  const handleAddExpense = () => {
    setPopupTitle('Add Expense');
    setIsPopupOpen(true);
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setPopupTitle('Edit Expense');
    setIsPopupOpen(true);
  };

  const handleDeleteExpense = (expenseToDelete) => {
    const updatedExpenses = selectedExpenses.filter(expense => expense !== expenseToDelete);
    setSelectedExpenses(updatedExpenses);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setExpenseToEdit(null);
  };

  const handleSubmit = (formData) => {
    if (popupTitle === 'Add Expense') {
      const newExpense = {
        ...formData,
        price: parseFloat(formData.price),
        date: new Date().toLocaleDateString()
      };

      const newBalance = balance - newExpense.price;
      if (newBalance < 0) {
        alert('You cannot spend more than your available balance.');
        return;
      }

      setSelectedExpenses([...selectedExpenses, newExpense]);
      setBalance(newBalance);
    } else if (popupTitle === 'Edit Expense') {
      const updatedExpenses = selectedExpenses.map(expense =>
        expense === expenseToEdit ? { ...formData } : expense
      );
      setSelectedExpenses(updatedExpenses);
    }

    setIsPopupOpen(false);
    setExpenseToEdit(null);
  };

  return (
    <div className={styles.display}>
      
      {isPopupOpen?(
        <EditPopup
          title={popupTitle}
          button={popupTitle === 'Edit Expense' ? 'Save Changes' : 'Submit'}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          expenseToEdit={expenseToEdit}
        />
      ):(
        <div>
          <div className={styles.title}>Expense Tracker</div>
          <div className={styles.topdisplay}>
              <div className={styles.balance}>
                Wallet Balance: ₹ {balance.toFixed(2)}
                <button onClick={handleAddIncome}>+ Add Income</button>
              </div>
              <div className={styles.expenses}>
                Expenses: ₹ {expensesTotal.toFixed(2)}
                <button onClick={handleAddExpense}>+ Add Expense</button>
              </div>
              <div>
                <Piechart expensesData={selectedExpenses} />
              </div>
          </div>
          <div className={styles.bottomdisplay}>
              <div className={styles.recenttransactions}>
              <div className={styles.title1}>Recent Transactions</div>
              <div className={styles.expenselist}>
                <ul>
                  {selectedExpenses.slice(1).map((expense, index) => (
                    expense.name && expense.price && (
                        <li key={index}>
                          {expense.name} - ₹ {expense.price}
                          <button onClick={() => handleEditExpense(expense)}><HiPencil className={styles.icon} /></button>
                          <button onClick={() => handleDeleteExpense(expense)}><HiTrash className={styles.icon} /></button>
                        </li>
                      )
                    ))}
                </ul>
              </div>
              </div>        
              <div className={styles.topexpenses}>
                  <div className={styles.title1}>Top Expenses</div>
                  <HorizontalBarChart expensesData={selectedExpenses} />
              </div>
          </div>
        </div>   
      )}
    </div>
  );
}

export default Display;
