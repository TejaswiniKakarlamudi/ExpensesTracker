import React, { useState, useEffect } from 'react';
import styles from './Display.module.css';
import EditPopup from '../Popup/EditPopup';
import Piechart from '../Charts/Piechart';
import HorizontalBarChart from '../Charts/Barchart'; 
import { FaRegCircleXmark } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { IoPizzaOutline } from "react-icons/io5";//food
import { FaCaravan } from "react-icons/fa6";//travel
import { AiFillGift } from "react-icons/ai";//entertainment
import { MdOutlineHealthAndSafety } from "react-icons/md";//health
import { BsHouse } from "react-icons/bs";//house
function Display() {
  const mainBalance = parseFloat(localStorage.getItem('mainbalance')) || 5000; 
  const [balance, setBalance] = useState(mainBalance);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedExpenses, setSelectedExpenses] = useState([
    { accountBalance: 4500 },
    {
      name: 'Movie',
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
  const addButton = (popupTitle, isPopupOpen) => {
    if(popupTitle==='Add Expenses'){
      return 'Add Expense'
    }else if(popupTitle==='Add Balance'){
      return 'Add Balance'
    }else{
      return 'Add Expense'
    }
  }
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
  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Food':
        return <div className={styles.categoryIcon}><IoPizzaOutline  /></div>;
      case 'Travel':
        return <div className={styles.categoryIcon}><FaCaravan /></div>;
      case 'Entertainment':
        return <div className={styles.categoryIcon}><AiFillGift/></div>;
      case 'Health':
        return <div className={styles.categoryIcon}><MdOutlineHealthAndSafety  /></div>;
      case 'House':
        return <div className={styles.categoryIcon}><BsHouse /></div>;
      default:
        return <div className={styles.categoryIcon}><FaRegCircleXmark/></div>;
    }
  };

  return (
    <div className={styles.display}>
      
      {isPopupOpen?(
        <EditPopup
          title={popupTitle}
          button={addButton(popupTitle)}
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
                              <div className={styles.listitem}>
                                <div>
                                  {renderCategoryIcon(expense.category)}
                                  <div className={styles.listname}>{expense.name} - ₹ {expense.price}</div>
                                </div>
                                <div>
                                <div className={styles.icondelete}><button onClick={() => handleDeleteExpense(expense)}><FaRegCircleXmark/></button></div>
                                <div className={styles.iconedit}><button onClick={() => handleEditExpense(expense)}><GrEdit  /></button></div>  
                                </div>                          
                              </div>
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
