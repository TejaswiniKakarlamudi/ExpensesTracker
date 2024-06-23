import React, { useState, useEffect } from 'react';
import styles from './Display.module.css';
import EditPopup from '../Popup/EditPopup';
import Piechart from '../Charts/Piechart';
import HorizontalBarChart from '../Charts/Barchart';
import { HiOutlineXCircle } from "react-icons/hi2";
import { GrEdit } from "react-icons/gr";
import { IoPizzaOutline } from "react-icons/io5"; // food
import { FaCaravan } from "react-icons/fa6"; // travel
import { AiFillGift } from "react-icons/ai"; // entertainment
import { MdOutlineHealthAndSafety } from "react-icons/md"; // health
import { BsHouse } from "react-icons/bs"; // house
import {
  handleAddIncome,
  handleAddExpense,
  handleEditExpense,
  handleDeleteExpense,
  handleCancel,
  addButton,
  handleSubmit
} from './handlers';

function Display() {
  const [expensesChanged, setExpensesChanged] = useState(true);
  const initialBalance = parseFloat(localStorage.getItem('mainbalance')) || 5000;
  const [balance, setBalance] = useState(initialBalance);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const data = [
    {
      id: 1,
      name: 'Movie',
      price: 300,
      category: 'Entertainment',
      date: 'March 21,2024'
    },
    {
      id: 2,
      name: 'Samosa',
      price: 150,
      category: 'Food',
      date: 'March 20,2024'
    },
    {
      id: 3,
      name: 'Auto',
      price: 50,
      category: 'Travel',
      date: 'March 22,2024'
    }
  ];

  const [selectedExpenses, setSelectedExpenses] = useState(JSON.parse(localStorage.getItem('selectedExpenses')) || data);
  // localStorage.clear();

  useEffect(() => {
    if (expensesChanged) {
      calculateInitialExpenses();
      setExpensesChanged(false);
      // localStorage.setItem('mainbalance', balance.toString());//taking this off on purpose!!!
    }
  }, [expensesChanged, selectedExpenses]);

  useEffect(() => {
    // localStorage.setItem('mainbalance', balance.toString());
    localStorage.setItem('selectedExpenses', JSON.stringify(selectedExpenses));
    localStorage.setItem('totalexpenses', expensesTotal.toString());
  }, [balance, selectedExpenses, expensesTotal]);

  const calculateInitialExpenses = () => {
    let totalExpenses = 0;
    selectedExpenses.forEach(expense => {
      if (!isNaN(parseFloat(expense.price))) {
        totalExpenses += parseFloat(expense.price);
      }
    });

    setExpensesTotal(totalExpenses);
    setBalance(initialBalance - totalExpenses);
  };

  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Food':
        return <div className={styles.categoryIcon}><IoPizzaOutline /></div>;
      case 'Travel':
        return <div className={styles.categoryIcon}><FaCaravan /></div>;
      case 'Entertainment':
        return <div className={styles.categoryIcon}><AiFillGift /></div>;
      case 'Health':
        return <div className={styles.categoryIcon}><MdOutlineHealthAndSafety /></div>;
      case 'House':
        return <div className={styles.categoryIcon}><BsHouse /></div>;
      default:
        return <div className={styles.categoryIcon}><HiOutlineXCircle /></div>;
    }
  };

  return (
    <div className={styles.display}>
      {isPopupOpen ? (
        <EditPopup
          title={popupTitle}
          button={addButton(popupTitle)}
          onCancel={() => handleCancel(setIsPopupOpen, setExpenseToEdit)}
          onSubmit={(formData) => handleSubmit(
            formData,
            popupTitle,
            balance,
            setBalance,
            selectedExpenses,
            setSelectedExpenses,
            setExpensesTotal,
            setExpensesChanged,
            setIsPopupOpen,
            setExpenseToEdit,
            calculateInitialExpenses,
            expenseToEdit
          )}
          expenseToEdit={expenseToEdit}
        />
      ) : (
        <div>
          <div className={styles.title}>Expense Tracker</div>
          <div className={styles.topdisplay}>
            <div className={styles.balance}>
              Wallet Balance: ₹ {balance}
              <button onClick={() => handleAddIncome(setPopupTitle, setIsPopupOpen)}>+ Add Income</button>
            </div>
            <div className={styles.expenses}>
              Expenses: ₹ {expensesTotal}
              <button onClick={() => handleAddExpense(setPopupTitle, setIsPopupOpen)}>+ Add Expense</button>
            </div>
            <div>
              <Piechart expensesData={selectedExpenses} className={styles.piechart}/>
            </div>
          </div>
          <div className={styles.bottomdisplay}>
            <div className={styles.recenttransactions}>
              <div className={styles.title1}>Recent Transactions</div>
              <div className={styles.expenselist}>
                <ul>
                  {selectedExpenses.map((expense, index) => (
                    expense.name && expense.price && (
                      <li key={index}>
                        <div className={styles.listitem}>
                          <div>
                            {renderCategoryIcon(expense.category)}
                            <div className={styles.listname}>
                              <div>{expense.name}</div>
                              <div>{expense.date}</div>
                            </div>
                          </div>
                          <div>
                            <div>₹ {expense.price}</div>
                            <div className={styles.icondelete}><button onClick={() => handleDeleteExpense(expense, selectedExpenses, setSelectedExpenses, setExpensesChanged)}><HiOutlineXCircle /></button></div>
                            <div className={styles.iconedit}><button onClick={() => handleEditExpense(expense, setExpenseToEdit, setPopupTitle, setIsPopupOpen)}><GrEdit /></button></div>
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
